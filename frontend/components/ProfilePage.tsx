import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  User, 
  Star, 
  Download, 
  FileText, 
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Award,
  DollarSign,
  CheckCircle,
  Settings,
  Bell,
  Lock,
  Eye,
  CreditCard,
  Users,
  Wallet,
  Edit,
  Loader2
} from 'lucide-react';
import { apiService } from '../lib/api';

interface UserProfile {
  id: number;
  phone: string;
  name?: string;
  email?: string;
  business_name?: string;
  business_type?: string;
  location?: string;
  green_score: number;
  created_at?: string;
  is_verified: boolean;
}

export function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // For demo, using the test user ID
  const userId = 4;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getUserProfile(userId);
        setUserProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = async (updatedData: Partial<UserProfile>) => {
    try {
      const updated = await apiService.updateUserProfile(userId, updatedData);
      setUserProfile(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error loading profile: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <div>No profile data available</div>;
  }

    // Loan eligibility calculation based on green score and verification
  const trustScore = userProfile.green_score * 8.5; // Convert 0-100 to 0-850 scale
  const estimatedMonthlyIncome = 50000; // Default estimate, could be fetched from transactions
  const loanEligibility = {
    maxAmount: Math.min(estimatedMonthlyIncome * 3, trustScore > 650 ? 500000 : 200000),
    interestRate: trustScore > 700 ? 12 : trustScore > 600 ? 15 : 18,
    term: '3-12 months',
    rating: trustScore > 700 ? 'Excellent' : trustScore > 600 ? 'Good' : 'Fair'
  };

  const taxRecords = [
    {
      id: '1',
      period: 'Q1 2024',
      type: 'VAT Return',
      amount: 24560,
      status: 'Filed',
      date: '2024-04-15'
    },
    {
      id: '2',
      period: 'Q4 2023',
      type: 'Income Tax',
      amount: 45000,
      status: 'Filed',
      date: '2024-01-31'
    },
    {
      id: '3',
      period: 'Q3 2023',
      type: 'VAT Return',
      amount: 18790,
      status: 'Filed',
      date: '2023-10-15'
    }
  ];

  const achievements = [
    { id: 1, title: 'Early Adopter', description: 'One of the first 100 users', icon: '🚀', earned: true },
    { id: 2, title: 'Fraud Fighter', description: 'Reported 5+ suspicious activities', icon: '🛡️', earned: true },
    { id: 3, title: 'Savings Champion', description: 'Reached 3 consecutive savings goals', icon: '🎯', earned: true },
    { id: 4, title: 'Community Builder', description: 'Created a successful chama group', icon: '👥', earned: false },
    { id: 5, title: 'Tax Pro', description: 'Filed taxes on time for 1 year', icon: '📊', earned: true }
  ];

  const stats = {
    currentBalance: 49100,
    totalTransactions: 1247,
    thisMonthTransactions: 89,
    activeChamas: 2,
    chamaTotal: 15600
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      
      {/* PROFILE HEADER */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32 border-4 border-white/30 shadow-xl">
              <AvatarFallback className="text-4xl font-bold bg-white/20 text-white">
                {userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold">{userProfile.name || 'User'}</h1>
                {userProfile.is_verified && (
                  <Badge className="bg-green-500 text-white border-green-400 px-3 py-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 text-red-100">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{userProfile.phone}</span>
                </div>
                {userProfile.email && (
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{userProfile.email}</span>
                  </div>
                )}
                {userProfile.location && (
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'Recently'}</span>
                  {userProfile.business_type && (
                    <>
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4" />
                      <span>{userProfile.business_type}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Balance */}
        <Card className="bg-white shadow-xl border-2 border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              KSh {stats.currentBalance.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Current Balance
            </div>
            <div className="text-xs text-green-600 mt-2">
              +24% this month
            </div>
          </CardContent>
        </Card>

        {/* Total Transactions */}
        <Card className="bg-white shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalTransactions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Total Transactions
            </div>
            <div className="text-xs text-blue-600 mt-2">
              This month: {stats.thisMonthTransactions}
            </div>
          </CardContent>
        </Card>

        {/* Active Chamas */}
        <Card className="bg-white shadow-xl border-2 border-purple-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.activeChamas}
            </div>
            <div className="text-sm text-gray-600">
              Active Chamas
            </div>
            <div className="text-xs text-purple-600 mt-2">
              Total: KSh {stats.chamaTotal.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LOAN ELIGIBILITY - MAIN FEATURE */}
      <Card className="bg-gradient-to-br from-red-50 to-pink-50 shadow-2xl border-3 border-red-200 hover:shadow-3xl transition-all duration-300">
        <CardHeader className="border-b border-red-200 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <CreditCard className="w-7 h-7 mr-3 text-red-600" />
              Loan Eligibility
            </CardTitle>
            <Badge className="bg-yellow-100 text-yellow-900 border-yellow-400 text-base px-4 py-2">
              <Star className="w-4 h-4 mr-1" />
              {loanEligibility.rating} Rating
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-2">Based on your trust score and income</p>
        </CardHeader>
        
        <CardContent className="pt-8">
          <div className="text-center mb-8">
            <div className="text-sm text-gray-600 mb-3">You're eligible for up to</div>
            <div className="text-6xl font-bold text-red-600 mb-4">
              KSh {(loanEligibility.maxAmount / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-600">
              Based on:
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-3">
              <div className="flex items-center text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                Trust Score: {trustScore.toFixed(0)}/850
              </div>
              <div className="flex items-center text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                Monthly Income: KSh {estimatedMonthlyIncome.toFixed(0)}
              </div>
              <div className="flex items-center text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                Payment History: Excellent
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 bg-white rounded-xl border-2 border-red-200 text-center">
              <div className="text-sm font-medium text-gray-700 mb-2">Interest Rate</div>
              <div className="text-2xl font-bold text-red-600">{loanEligibility.interestRate}% p.a.</div>
            </div>
            <div className="p-5 bg-white rounded-xl border-2 border-red-200 text-center">
              <div className="text-sm font-medium text-gray-700 mb-2">Repayment Period</div>
              <div className="text-2xl font-bold text-gray-900">{loanEligibility.term}</div>
            </div>
            <div className="p-5 bg-white rounded-xl border-2 border-red-200 text-center">
              <div className="text-sm font-medium text-gray-700 mb-2">Processing Time</div>
              <div className="text-2xl font-bold text-green-600">24 hours</div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-7 rounded-xl shadow-lg text-lg">
            <DollarSign className="w-6 h-6 mr-2" />
            Apply for Loan
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            ℹ️ No collateral required • Fast approval • Flexible terms
          </p>
        </CardContent>
      </Card>

      {/* TAX RECORDS */}
      <Card className="bg-white shadow-xl border-2 border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Tax Records
            </CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              + File New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Period</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taxRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{record.period}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{record.type}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-semibold">
                      KSh {record.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {record.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" className="border-2 border-gray-300">
              View All Records
            </Button>
            <Button variant="outline" className="border-2 border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Download Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ACHIEVEMENTS & BADGES */}
      <Card className="bg-gradient-to-br from-gray-50 to-amber-50 shadow-xl border-2 border-amber-200">
        <CardHeader className="border-b border-amber-200">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Award className="w-6 h-6 mr-3 text-amber-600" />
            Achievements & Badges
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Progress: {achievements.filter(a => a.earned).length}/{achievements.length} badges earned
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-amber-300' 
                    : 'bg-gray-100 border-2 border-gray-300 opacity-60'
                } hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-5 text-center">
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  {achievement.earned ? (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Earned
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-200 text-gray-600 border-gray-400">
                      🔒 Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ACCOUNT SETTINGS */}
      <Card className="bg-white shadow-xl border-2 border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-gray-700" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          
          {/* Security Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600">Add an extra layer of security</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Biometric Login</div>
                  <div className="text-sm text-gray-600">Use fingerprint or face ID</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="w-full border-2 border-gray-300">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-amber-600" />
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Push Notifications</div>
                  <div className="text-sm text-gray-600">Receive app notifications</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Email Notifications</div>
                  <div className="text-sm text-gray-600">Receive email updates</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">SMS Alerts</div>
                  <div className="text-sm text-gray-600">Receive text messages</div>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-600" />
              Privacy
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Profile Visibility</div>
                  <div className="text-sm text-gray-600">Who can see your profile</div>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Public</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Chama Activity</div>
                  <div className="text-sm text-gray-600">Who can see your chama activity</div>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Members Only</option>
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline" className="border-2 border-gray-300">
              Reset to Default
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
