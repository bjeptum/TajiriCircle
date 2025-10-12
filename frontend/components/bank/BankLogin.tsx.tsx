import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BankUser } from '../BankApp';
import { ArrowLeft, Building2, Shield, Lock } from 'lucide-react';

interface BankLoginProps {
  onLogin: (user: BankUser) => void;
  onBack: () => void;
}

export function BankLogin({ onLogin, onBack }: BankLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    
    try {
      // Use real API for bank login
      const response = await fetch('/api/bank/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, access_token } = await response.json();
      
      // Store token for subsequent requests
      localStorage.setItem('bankToken', access_token);
      localStorage.setItem('bankUser', JSON.stringify(user));
      
      const userData = {
        name: user.name,
        role: user.role,
        permissions: user.permissions || []
      };
      
      onLogin(userData);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-slate-600" />
            <span className="text-lg font-medium text-slate-800">Bank Portal</span>
          </div>
          <div className="w-10" />
        </div>

        <Card className="border-slate-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-slate-600" />
            </div>
            <CardTitle className="text-slate-800">Secure Login</CardTitle>
            <CardDescription>
              Access the GreenCredit underwriting platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah.mwangi@bank.co.ke"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Demo Credentials</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Email:</strong> banker@bank.com</p>
                  <p><strong>Password:</strong> bankpass123</p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-800 hover:bg-slate-900 h-12"
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Secure Login</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Multi-factor authentication enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Badge variant="outline" className="text-xs text-gray-500">
            Demo Version - Real implementation would require proper authentication
          </Badge>
        </div>
      </div>
    </div>
  );
}