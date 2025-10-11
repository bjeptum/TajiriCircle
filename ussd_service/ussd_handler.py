"""
USSD Request Handler for TajiriCircle
"""
from redis_client import redis_client
from ussd_menu import USSDMenuSystem
import logging
import requests
import os
from typing import Optional

logger = logging.getLogger(__name__)

class USSDHandler:
    def __init__(self):
        self.menu_system = USSDMenuSystem()
        self.main_backend_url = os.getenv('MAIN_BACKEND_URL', 'http://localhost:8000')
        
    async def handle_request(self, session_id: str, phone_number: str, text: str) -> str:
        """Handle USSD request and return response"""
        try:
            # Clean phone number
            clean_phone = phone_number.replace("+", "").replace(" ", "")
            
            # Check if user exists in main database
            user_exists = await self._check_user_exists(clean_phone)
            
            # Get or create session data
            session_data = redis_client.get_session(session_id)
            if session_data is None:
                session_data = {
                    "phone": clean_phone,
                    "state": "registration" if not user_exists else "main_menu",
                    "language": "en",
                    "step": 0,
                    "user_data": {}
                }
            
            # Process menu navigation
            response_text, continue_session = self.menu_system.process_input(
                session_data, text, user_exists
            )
            
            # Update session if continuing
            if continue_session:
                session_data["step"] += 1
                redis_client.set_session(session_id, session_data, ttl=300)
                
                # Handle user registration
                if (not user_exists and 
                    session_data.get("user_data", {}).get("name") and 
                    session_data.get("state") == "main_menu"):
                    await self._register_user(session_data)
            else:
                # Session ended, cleanup
                redis_client.delete_session(session_id)
            
            # Return Africa's Talking format
            prefix = "CON " if continue_session else "END "
            return f"{prefix}{response_text}"
            
        except Exception as e:
            logger.error(f"USSD Handler Error: {e}")
            redis_client.delete_session(session_id)
            return "END Service temporarily unavailable. Please try again later."
    
    async def _check_user_exists(self, phone: str) -> bool:
        """Check if user exists in main database"""
        try:
            response = requests.get(
                f"{self.main_backend_url}/api/user/{phone}",
                timeout=3
            )
            return response.status_code == 200
        except Exception as e:
            logger.warning(f"Could not check user existence: {e}")
            return False  # Assume new user if backend unavailable
    
    async def _register_user(self, session_data: dict):
        """Register new user in main database"""
        try:
            user_data = {
                "phone": session_data["phone"],
                "name": session_data["user_data"]["name"],
                "password": "ussd_user_default"
            }
            
            response = requests.post(
                f"{self.main_backend_url}/api/auth/register",
                json=user_data,
                timeout=5
            )
            
            if response.status_code == 200:
                logger.info(f"Successfully registered USSD user: {session_data['phone']}")
            else:
                logger.warning(f"User registration failed: {response.status_code}")
                
        except Exception as e:
            logger.error(f"User registration error: {e}")