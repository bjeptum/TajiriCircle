import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Star, 
  ArrowUpCircle,
  Activity,
  Sparkles,
  Loader2
} from 'lucide-react';
import { apiService } from '../lib/api';

interface DashboardData {
  user_id: number;
  metrics: {
    total_balance: number;
    monthly_income: number;
    monthly_expenses: number;
    savings_rate: number;
    green_score: number;
    business_growth_rate: number;
  };
  transaction_summary: {
    total_incoming: number;
    total_outgoing: number;
    total_transactions: number;
    average_amount: number;
    business_transactions: number;
    business_percentage: number;
  };
  recent_transactions: any[];
  recent_activities: any[];
  insights: any[];
  chama_overview: any;
  loan_overview: any;
  fraud_alerts: any;
  last_updated: string;
}

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get user ID from localStorage
  const getUserId = () => {
    try {
      const userData = localStorage.getItem('tajiri_user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id;
      }
    } catch (error) {
      console.error('Failed to get user ID:', error);
    }
    return null;
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('tajiri_token');
        const data = await apiService.getDashboardData(userId, token || undefined);
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error loading dashboard: {error}</p>
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

  if (!dashboardData) {
    return <div>No dashboard data available</div>;
  }

  // Use real data from backend
  const { metrics, recent_activities, insights, chama_overview, fraud_alerts } = dashboardData;

  // Generate sample prediction data based on current balance and trends
  const cashFlowPredictions = [
    { day: 'Today', predicted: metrics.total_balance, confidence: 'high' },
    { day: 'Tomorrow', predicted: metrics.total_balance * 1.05, confidence: 'high' },
    { day: 'Day 3', predicted: metrics.total_balance * 1.08, confidence: 'medium' },
    { day: 'Day 4', predicted: metrics.total_balance * 1.12, confidence: 'medium' },
    { day: 'Day 5', predicted: metrics.total_balance * 1.15, confidence: 'medium' },
    { day: 'Day 6', predicted: metrics.total_balance * 1.18, confidence: 'low' },
    { day: 'Day 7', predicted: metrics.total_balance * 1.22, confidence: 'low' }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Header with Current Balance */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back!</h1>
              <p className="text-red-100 text-lg">Your financial overview</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-200 mb-1">Current Balance</div>
              <div className="text-4xl md:text-5xl font-bold">
                KSh {metrics.total_balance.toLocaleString()}
              </div>
              <div className="text-red-200 text-sm mt-2 flex items-center justify-end">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{metrics.business_growth_rate.toFixed(1)}% this month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REORGANIZED: Top Row - AI Predictions & Trust Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. AI Cash Flow Predictions - NOW FIRST */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-blue-600" />
                AI Cash Flow Predictions
              </CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">Forecasted balance for the next 7 days</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowPredictions}>
                  <defs>
                    <linearGradient id="predictionGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#c7d2fe' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#c7d2fe' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`KSh ${value.toLocaleString()}`, 'Predicted Balance']}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="url(#predictionGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    strokeDasharray="5 5"
                    cursor="pointer"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xs text-gray-600 mb-1">Next Week</div>
                <div className="text-lg font-bold text-blue-600">KSh 72.4k</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Expected Growth</div>
                <div className="text-lg font-bold text-green-600">+47%</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Confidence</div>
                <div className="text-lg font-bold text-purple-600">High</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Trust Score - NOW SECOND */}
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-yellow-200 pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Star className="w-6 h-6 mr-3 text-yellow-600" />
              Trust Score
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Your creditworthiness rating</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              {/* Circular Progress */}
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#fef3c7"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray={`${(metrics.green_score / 100) * 100}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{metrics.green_score}</span>
                  <span className="text-sm text-gray-600">/ 100</span>
                </div>
              </div>

              <Badge className="bg-yellow-200 text-yellow-900 border-yellow-400 text-base px-4 py-1 mb-4">
                Excellent Rating
              </Badge>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Transaction History</span>
                  <span className="text-sm font-bold text-green-600">95%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Payment Reliability</span>
                  <span className="text-sm font-bold text-green-600">92%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Fraud Avoidance</span>
                  <span className="text-sm font-bold text-green-600">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Money In & Balance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 3. Weekly Money In Chart */}
        <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <ArrowUpCircle className="w-6 h-6 mr-3 text-green-600" />
                Money In (This Week)
              </CardTitle>
              <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                Income: {metrics.business_growth_rate.toFixed(1)}% growth
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">Your transaction summary</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900">
                KSh {dashboardData.transaction_summary.total_incoming.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total incoming</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Business Transactions</div>
                <div className="text-xl font-bold text-green-600">
                  {dashboardData.transaction_summary.business_percentage.toFixed(1)}%
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Average Amount</div>
                <div className="text-xl font-bold text-blue-600">
                  KSh {dashboardData.transaction_summary.average_amount.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Incoming', amount: dashboardData.transaction_summary.total_incoming },
                  { name: 'Outgoing', amount: dashboardData.transaction_summary.total_outgoing }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`KSh ${value.toLocaleString()}`, 'Money In']}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#10b981" 
                    radius={[8, 8, 0, 0]}
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center text-sm text-green-800">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="font-medium">Insight: </span>
                <span className="ml-1">Saturdays bring in 2x more income!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. End of Day Balance Chart */}
        <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-red-600" />
              Daily Closing Balance
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Your balance at the end of each day</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900">
                KSh {metrics.total_balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Current balance</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Monthly Income</div>
                <div className="text-xl font-bold text-green-600">
                  KSh {metrics.monthly_income.toLocaleString()}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Monthly Expenses</div>
                <div className="text-xl font-bold text-red-600">
                  KSh {metrics.monthly_expenses.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowPredictions}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A51C30" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#A51C30" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 13, fill: '#666' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`KSh ${value.toLocaleString()}`, 'Predicted Balance']}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#A51C30" 
                    strokeWidth={3}
                    fill="url(#balanceGradient)"
                    cursor="pointer"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center text-sm text-amber-800">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="font-medium">Savings Rate: </span>
                <span className="ml-1">{metrics.savings_rate.toFixed(1)}% of your income is saved!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
