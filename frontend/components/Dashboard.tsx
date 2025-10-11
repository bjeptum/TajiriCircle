import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export function Dashboard() {
  const [trustScore] = useState(720); // Out of 850 (credit score scale)

  // Weekly Money In Data - Shows which days receive most cash
  const weeklyMoneyInData = [
    { day: 'Mon', amount: 4500, label: 'Monday' },
    { day: 'Tue', amount: 6200, label: 'Tuesday' },
    { day: 'Wed', amount: 3800, label: 'Wednesday' },
    { day: 'Thu', amount: 5100, label: 'Thursday' },
    { day: 'Fri', amount: 8400, label: 'Friday' },
    { day: 'Sat', amount: 12500, label: 'Saturday' },
    { day: 'Sun', amount: 7200, label: 'Sunday' }
  ];

  // End of Day Balance - After money in and money out
  const endOfDayBalanceData = [
    { day: 'Mon', balance: 18500, moneyIn: 4500, moneyOut: 2100 },
    { day: 'Tue', balance: 22600, moneyIn: 6200, moneyOut: 2100 },
    { day: 'Wed', balance: 24300, moneyIn: 3800, moneyOut: 2100 },
    { day: 'Thu', balance: 27300, moneyIn: 5100, moneyOut: 2100 },
    { day: 'Fri', balance: 33600, moneyIn: 8400, moneyOut: 2100 },
    { day: 'Sat', balance: 44000, moneyIn: 12500, moneyOut: 2100 },
    { day: 'Sun', balance: 49100, moneyIn: 7200, moneyOut: 2100 }
  ];

  // Cash Flow Predictions (Next 7 days)
  const cashFlowPredictions = [
    { day: 'Today', predicted: 49100, confidence: 'high' },
    { day: 'Tomorrow', predicted: 52300, confidence: 'high' },
    { day: 'Day 3', predicted: 55800, confidence: 'medium' },
    { day: 'Day 4', predicted: 58200, confidence: 'medium' },
    { day: 'Day 5', predicted: 62500, confidence: 'medium' },
    { day: 'Day 6', predicted: 68900, confidence: 'low' },
    { day: 'Day 7', predicted: 72400, confidence: 'low' }
  ];

  // Removed chamaData - now on Digital Chama page
  // Removed loanEligibility - now on Profile page

  // Find best earning day
  const bestDay = weeklyMoneyInData.reduce((max, day) => 
    day.amount > max.amount ? day : max
  );

  // Removed scamAlerts - fraud alerts now only on Fraud Alert page

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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Janet!</h1>
              <p className="text-red-100 text-lg">Your financial overview</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-200 mb-1">Current Balance</div>
              <div className="text-4xl md:text-5xl font-bold">KSh 49,100</div>
              <div className="text-red-200 text-sm mt-2 flex items-center justify-end">
                <TrendingUp className="w-4 h-4 mr-1" />
                +24% this week
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
                    strokeDasharray={`${(trustScore / 850) * 100}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{trustScore}</span>
                  <span className="text-sm text-gray-600">/ 850</span>
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
                Best: {bestDay.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">Track which days you earn the most</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900">
                KSh {weeklyMoneyInData.reduce((sum, day) => sum + day.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total this week</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyMoneyInData}>
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
                KSh {endOfDayBalanceData[endOfDayBalanceData.length - 1].balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Today's closing balance</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={endOfDayBalanceData}>
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
                    formatter={(value: any, name: string) => {
                      const labels: any = {
                        balance: 'Closing Balance',
                        moneyIn: 'Money In',
                        moneyOut: 'Money Out'
                      };
                      return [`KSh ${value.toLocaleString()}`, labels[name]];
                    }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
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
                <span className="font-medium">Growth: </span>
                <span className="ml-1">Your balance grew by KSh 30,600 this week!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
