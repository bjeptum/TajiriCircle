import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Building2, Mail, Lock, ArrowLeft, Shield } from 'lucide-react';

interface BankLoginProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

export function BankLogin({ onLogin, onBack }: BankLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      onLogin({
        name: 'Bank Administrator',
        email: email,
        portal: 'bank'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/50">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Bank Portal</h2>
            <p className="text-gray-400">Secure Financial Institution Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-gray-300 font-medium mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="bank.admin@institution.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-6 rounded-xl bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300 font-medium mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 py-6 rounded-xl bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
              <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-200 font-medium">Secure Connection</p>
                <p className="text-xs text-gray-400 mt-1">
                  All communications are encrypted with bank-grade security
                </p>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <Building2 className="w-5 h-5 mr-2" />
                  Log In to Bank Portal
                </>
              )}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Authorized personnel only. All access is monitored and logged.
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>256-bit SSL</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
