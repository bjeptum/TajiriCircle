#!/usr/bin/env python3
"""Quick demo setup - populate database with test data via API calls."""

import requests
import json
import time

API_BASE = "http://localhost:8000/api"

def create_demo_data():
    print("🚀 Setting up demo data for TajiriCircle...")
    
    # Demo users for TajiriWetu
    demo_users = [
        {"phone": "+254712345678", "password": "demo123", "name": "Alice Farmer", "business": "Organic Farm"},
        {"phone": "+254798765432", "password": "demo123", "name": "Bob Mechanic", "business": "Auto Repair Shop"},
        {"phone": "+254756789123", "password": "demo123", "name": "Grace Salon", "business": "Beauty Salon"},
        {"phone": "+254734567890", "password": "demo123", "name": "John Welder", "business": "Metal Works"}
    ]
    
    # Demo bank users
    demo_bank_users = [
        {"email": "demo.admin@bank.com", "password": "demo123", "name": "Demo Admin", "role": "admin"},
        {"email": "demo.officer@bank.com", "password": "demo123", "name": "Demo Officer", "role": "underwriter"}
    ]
    
    created_users = []
    created_bank_users = []
    
    print("\n📱 Creating TajiriWetu users...")
    for user in demo_users:
        try:
            response = requests.post(f"{API_BASE}/auth/register", json={
                "phone": user["phone"],
                "password": user["password"]
            })
            if response.status_code == 200:
                user_data = response.json()
                created_users.append(user_data)
                print(f"✅ Created user: {user['name']} ({user['phone']})")
                
                # Login to get token and update profile
                login_response = requests.post(f"{API_BASE}/auth/login", json={
                    "phone": user["phone"],
                    "password": user["password"]
                })
                if login_response.status_code == 200:
                    token = login_response.json()["access_token"]
                    # Update user profile if endpoint exists
                    # This would normally update name and business info
                    
            else:
                print(f"❌ Failed to create user {user['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error creating user {user['name']}: {e}")
    
    print("\n🏦 Creating Bank users...")
    for bank_user in demo_bank_users:
        try:
            response = requests.post(f"{API_BASE}/bank/auth/register", json={
                "email": bank_user["email"],
                "password": bank_user["password"],
                "name": bank_user["name"],
                "role": bank_user["role"],
                "permissions": ["read", "write"] if bank_user["role"] == "admin" else ["read"]
            })
            if response.status_code == 200:
                bank_data = response.json()
                created_bank_users.append(bank_data)
                print(f"✅ Created bank user: {bank_user['name']} ({bank_user['email']})")
            else:
                print(f"❌ Failed to create bank user {bank_user['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error creating bank user {bank_user['name']}: {e}")
    
    print("\n💰 Creating sample loan applications...")
    for i, user_data in enumerate(created_users[:2]):  # Create loans for first 2 users
        try:
            # Login to get user token
            login_response = requests.post(f"{API_BASE}/auth/login", json={
                "phone": demo_users[i]["phone"],
                "password": demo_users[i]["password"]
            })
            if login_response.status_code == 200:
                token = login_response.json()["access_token"]
                
                # Create loan application
                loan_data = {
                    "user_id": user_data["id"],
                    "application": {
                        "business_name": demo_users[i]["business"],
                        "business_type": "agriculture" if "Farm" in demo_users[i]["business"] else "services",
                        "location": "Nairobi, Kenya",
                        "amount_requested": 100000 + (i * 50000),
                        "loan_purpose": "Business expansion and equipment purchase",
                        "loan_term": 12 + (i * 6)
                    }
                }
                
                response = requests.post(f"{API_BASE}/sme/applications", 
                                       json=loan_data,
                                       headers={"Authorization": f"Bearer {token}"})
                if response.status_code == 200:
                    print(f"✅ Created loan application for {demo_users[i]['name']}")
                else:
                    print(f"❌ Failed to create loan for {demo_users[i]['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error creating loan for {demo_users[i]['name']}: {e}")
    
    print("\n🎯 Demo Setup Complete!")
    print("\n" + "="*60)
    print("🔑 DEMO LOGIN CREDENTIALS")
    print("="*60)
    print("\n📱 TajiriWetu Users:")
    for user in demo_users:
        print(f"   Phone: {user['phone']}")
        print(f"   Password: {user['password']}")
        print(f"   Name: {user['name']}")
        print()
    
    print("🏦 Bank Users:")
    for bank_user in demo_bank_users:
        print(f"   Email: {bank_user['email']}")
        print(f"   Password: {bank_user['password']}")
        print(f"   Role: {bank_user['role']}")
        print()
    
    print("🌐 Access URLs:")
    print("   Frontend: http://localhost:3000")
    print("   Backend API: http://localhost:8000")
    print("   API Docs: http://localhost:8000/docs")
    print()
    
    # Test the connections
    print("🔍 Testing connections...")
    try:
        # Test frontend
        frontend_response = requests.get("http://localhost:3000", timeout=5)
        print("✅ Frontend is running" if frontend_response.status_code == 200 else "❌ Frontend issue")
        
        # Test backend
        backend_response = requests.get("http://localhost:8000", timeout=5)
        print("✅ Backend is running" if backend_response.status_code == 200 else "❌ Backend issue")
        
        # Test user login
        test_login = requests.post(f"{API_BASE}/auth/login", json={
            "phone": demo_users[0]["phone"],
            "password": demo_users[0]["password"]
        }, timeout=5)
        print("✅ User authentication working" if test_login.status_code == 200 else "❌ User auth issue")
        
        # Test bank login
        test_bank_login = requests.post(f"{API_BASE}/bank/auth/login", json={
            "email": demo_bank_users[0]["email"],
            "password": demo_bank_users[0]["password"]
        }, timeout=5)
        print("✅ Bank authentication working" if test_bank_login.status_code == 200 else "❌ Bank auth issue")
        
        # Test dashboard
        if test_login.status_code == 200:
            user_id = test_login.json()["user"]["id"]
            token = test_login.json()["access_token"]
            dashboard_response = requests.get(f"{API_BASE}/dashboard/{user_id}", 
                                            headers={"Authorization": f"Bearer {token}"}, timeout=5)
            print("✅ Dashboard API working" if dashboard_response.status_code == 200 else "❌ Dashboard issue")
        
    except Exception as e:
        print(f"❌ Connection test failed: {e}")
    
    print("\n🎉 Ready for demo! Open http://localhost:3000 and use the credentials above.")

if __name__ == "__main__":
    create_demo_data()