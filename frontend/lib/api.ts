// API service for TajiriCircle
const API_BASE_URL = '/api'; // This will proxy through Vite to backend:8000

export interface User {
  id: number;
  phone: string;
  name?: string;
  email?: string;
  business_name?: string;
  business_type?: string;
  location?: string;
  green_score?: number;
  is_verified?: boolean;
}

export interface RegisterRequest {
  phone: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

// Helper function to get auth headers
const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Try to get token from localStorage
    const storedToken = localStorage.getItem('tajiri_token');
    if (storedToken) {
      headers['Authorization'] = `Bearer ${storedToken}`;
    }
  }
  
  return headers;
};

// Helper function to get bank auth headers
const getBankAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Try to get bank token from localStorage
    const storedBankToken = localStorage.getItem('bankToken');
    if (storedBankToken) {
      headers['Authorization'] = `Bearer ${storedBankToken}`;
    }
  }
  
  return headers;
};

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

  // Send OTP
  async sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send OTP: ${response.statusText}`);
    }

    return response.json();
  },

  // Verify OTP
  async verifyOTP(phone: string, otp: string): Promise<{ success: boolean; user?: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify OTP: ${response.statusText}`);
    }

    return response.json();
  },

  // Login user
  async login(data: LoginRequest): Promise<{ user: User; access_token: string; token_type: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Get dashboard data
  async getDashboardData(userId: number, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    return response.json();
  },

  // Get chamas data
  async getChamas(userId: number, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/chamas/${userId}`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch chamas: ${response.statusText}`);
    }

    return response.json();
  },

  // Get fraud alerts
  async getFraudAlerts(userId: number, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/fraud-alerts/${userId}`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch fraud alerts: ${response.statusText}`);
    }

    return response.json();
  },

  // Get user profile
  async getUserProfile(userId: number, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/profile`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    return response.json();
  },

  // Update user profile
  async updateUserProfile(userId: number, profileData: any, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update user profile: ${response.statusText}`);
    }

    return response.json();
  },    // Parse SMS for transactions
  async parseSMS(userId: number, smsText: string, sender?: string, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/transactions/parse-sms`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ user_id: userId, sms_text: smsText, sender }),
    });

    if (!response.ok) {
      throw new Error(`Failed to parse SMS: ${response.statusText}`);
    }

    return response.json();
  },

  // Get user transactions
  async getTransactions(userId: number, filters?: any, token?: string): Promise<any> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          queryParams.append(key, filters[key].toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/transactions/${userId}?${queryParams}`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    return response.json();
  },

  // Create manual transaction
  async createTransaction(userId: number, transactionData: any, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ user_id: userId, ...transactionData }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create transaction: ${response.statusText}`);
    }

    return response.json();
  },

  // Submit loan application
  async submitLoanApplication(userId: number, applicationData: any, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/sme/applications`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ user_id: userId, application: applicationData }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit loan application: ${response.statusText}`);
    }

    return response.json();
  },



  // Bank login
  async bankLogin(email: string, password: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Bank login failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Get bank applications
  async getBankApplications(token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/applications`, {
      headers: getBankAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bank applications: ${response.statusText}`);
    }

    return response.json();
  },

  // Get bank applications queue
  async getBankApplicationsQueue(token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/applications/queue`, {
      headers: getBankAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bank applications queue: ${response.statusText}`);
    }

    return response.json();
  },

  // Get specific bank application
  async getBankApplication(appId: number, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/applications/${appId}`, {
      headers: getBankAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bank application: ${response.statusText}`);
    }

    return response.json();
  },

  // Update application status
  async updateApplicationStatus(appId: number, status: string, notes?: string, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/applications/${appId}/status`, {
      method: 'PUT',
      headers: getBankAuthHeaders(token),
      body: JSON.stringify({ status, notes }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update application status: ${response.statusText}`);
    }

    return response.json();
  },

  // Review loan application
  async reviewLoanApplication(appId: number, reviewerId: number, reviewData: any, token?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/bank/applications/${appId}/review?reviewer_id=${reviewerId}`, {
      method: 'POST',
      headers: getBankAuthHeaders(token),
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to review loan application: ${response.statusText}`);
    }

    return response.json();
  }
};