import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Star, 
  Sparkles, 
  Building2, 
  Users, 
  Wallet,
  ArrowRight,
  Shield,
  TrendingUp,
  Globe
} from 'lucide-react';

interface UnifiedLoginProps {
  onLogin: (portal: 'client' | 'bank' | 'chama', userData: any) => void;
}

type PortalType = 'client' | 'bank' | 'chama' | null;

export function UnifiedLogin({ onLogin }: UnifiedLoginProps) {
  const [selectedPortal, setSelectedPortal] = useState<PortalType>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const portals = [
    {
      id: 'client' as const,
      name: 'Tajiri Wetu',
      subtitle: 'Personal Finance Portal',
      description: 'Track your money, save smart, and grow your wealth',
      icon: Wallet,
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      features: ['SMS Tracking', 'Fraud Protection', 'Savings Goals']
    },
    {
      id: 'bank' as const,
      name: 'Bank Portal',
      subtitle: 'Financial Institution Dashboard',
      description: 'Monitor customers, analyze growth, and manage services',
      icon: Building2,
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      features: ['Customer Analytics', 'Growth Metrics', 'Risk Assessment']
    },
    {
      id: 'chama' as const,
      name: 'Digi Chama',
      subtitle: 'Group Savings Portal',
      description: 'Manage and monitor your community savings groups',
      icon: Users,
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      features: ['Group Management', 'Blockchain Ledger', 'Member Tracking']
    }
  ];

  const handlePortalSelect = (portal: PortalType) => {
    setSelectedPortal(portal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        phone,
        name: isSignup ? name : 'User',
        portal: selectedPortal
      };
      onLogin(selectedPortal!, userData);
      setLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    setSelectedPortal(null);
    setPhone('');
    setPassword('');
    setName('');
  };

  // Portal Selection View
  if (!selectedPortal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="relative z-10 w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Welcome to <span className="text-red-600">TajiriCircle</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Choose your portal to get started
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card
                  key={portal.id}
                  className="group relative overflow-hidden bg-white border-2 border-gray-300 hover:border-red-600 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handlePortalSelect(portal.id)}
                >
                  <CardHeader className="space-y-4 pb-4">
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                        {portal.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium">
                        {portal.subtitle}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-800 leading-relaxed font-medium">
                      {portal.description}
                    </p>

                    <div className="space-y-2">
                      {portal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200"
                      onClick={() => handlePortalSelect(portal.id)}
                    >
                      Access Portal
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-700 font-medium">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span>AI-Powered Insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-red-600" />
                <span>Multi-language Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Form View
  const currentPortal = portals.find(p => p.id === selectedPortal)!;
  const Icon = currentPortal.icon;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white shadow-xl border-2 border-gray-300">
          <CardHeader className="space-y-4 text-center">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 font-semibold"
            >
              ← Back
            </Button>

            <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center shadow-md mx-auto">
              <Icon className="w-7 h-7 text-white" />
            </div>

            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {currentPortal.name}
              </CardTitle>
              <p className="text-sm text-gray-700 mt-2 font-medium">
                {currentPortal.subtitle}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" onValueChange={(v) => setIsSignup(v === 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-semibold">Login</TabsTrigger>
                <TabsTrigger value="signup" className="font-semibold">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900 font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12 border-gray-300 text-gray-900 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-900 font-semibold">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-gray-300 text-gray-900 font-medium"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-lg shadow-md"
                  >
                    {loading ? 'Logging in...' : 'Login to Portal'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Janet Wanjiru"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 border-gray-300 text-gray-900 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-signup" className="text-gray-900 font-semibold">Phone Number</Label>
                    <Input
                      id="phone-signup"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12 border-gray-300 text-gray-900 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-signup" className="text-gray-900 font-semibold">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-gray-300 text-gray-900 font-medium"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-lg shadow-md"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
