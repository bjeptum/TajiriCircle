import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, Smartphone, ArrowLeft, Send } from 'lucide-react';

interface TajiriWetuLoginProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
  onNavigateToSignup: () => void;
}

export function TajiriWetuLogin({ onLogin, onBack, onNavigateToSignup }: TajiriWetuLoginProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [tokenMethod, setTokenMethod] = useState<'sms' | 'email'>('sms');
  const [tokenSent, setTokenSent] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendToken = () => {
    setLoading(true);
    // Simulate sending token
    setTimeout(() => {
      setTokenSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      onLogin({
        name: 'John Doe',
        phone: emailOrPhone,
        portal: 'client'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">TW</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Log in to Tajiri Wetu</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email or Phone */}
            <div>
              <Label htmlFor="emailOrPhone" className="text-gray-700 font-medium mb-2 block">
                Email or Phone Number
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="email@example.com or +254700000000"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Token Verification Section */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <Label className="text-gray-700 font-medium block">
                Two-Factor Authentication
              </Label>
              
              {/* Token Method Selection */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Token via:</p>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={() => setTokenMethod('sms')}
                    variant={tokenMethod === 'sms' ? 'default' : 'outline'}
                    className={`flex-1 py-6 rounded-xl font-medium transition-all ${
                      tokenMethod === 'sms'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'border-2 border-gray-300 hover:border-red-600 text-gray-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    SMS
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setTokenMethod('email')}
                    variant={tokenMethod === 'email' ? 'default' : 'outline'}
                    className={`flex-1 py-6 rounded-xl font-medium transition-all ${
                      tokenMethod === 'email'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'border-2 border-gray-300 hover:border-red-600 text-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Send Token Button */}
              {!tokenSent ? (
                <Button
                  type="button"
                  onClick={handleSendToken}
                  disabled={loading || !emailOrPhone || !password}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6 rounded-xl transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Token
                    </>
                  )}
                </Button>
              ) : (
                <div>
                  <Label htmlFor="token" className="text-gray-700 font-medium mb-2 block">
                    Enter Token
                  </Label>
                  <Input
                    id="token"
                    type="text"
                    placeholder="Enter 6-digit token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-green-600 mt-2 text-center">
                    ✓ Token sent via {tokenMethod === 'sms' ? 'SMS' : 'Email'}
                  </p>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading || !tokenSent || !token}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToSignup}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 Secured with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}
