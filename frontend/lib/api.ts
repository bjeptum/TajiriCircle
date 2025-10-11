// API service for TajiriCircle
const API_BASE_URL = '/api'; // This will proxy through Vite to backend:8000

export interface User {
  id: number;
  phone: string;
}

export interface RegisterRequest {
  phone: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

// API Functions
export const apiService = {
  // Register a new user
  async register(data: RegisterRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Send OTP (placeholder - you'll need to implement this endpoint)
  async sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    // For now, simulate success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'OTP sent successfully' });
      }, 1000);
    });
  },

  // Verify OTP (placeholder - you'll need to implement this endpoint)
  async verifyOTP(phone: string, otp: string): Promise<{ success: boolean; user?: User }> {
    // For demo purposes, accept any 6-digit code
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp.length === 6) {
          resolve({ 
            success: true, 
            user: { id: 1, phone } 
          });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  },

  // Get dashboard data
  async getDashboardData(userId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    return response.json();
  },

  // Get chamas data
  async getChamas(userId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/chamas/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch chamas: ${response.statusText}`);
    }

    return response.json();
  },

  // Get fraud alerts
  async getFraudAlerts(userId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/fraud-alerts/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch fraud alerts: ${response.statusText}`);
    }

    return response.json();
  }
};