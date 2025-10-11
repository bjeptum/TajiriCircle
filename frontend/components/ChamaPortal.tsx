import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Users, 
  Plus,
  Eye,
  Settings,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  Activity,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Target
} from 'lucide-react';
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';

export function ChamaPortal() {
  const [activeView, setActiveView] = useState<'manage' | 'monitor'>('manage');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mock chama data
  const myChamas = [
    {
      id: 1,
      name: 'Umoja Traders',
      role: 'Admin',
      members: 12,
      totalSavings: 145000,
      myContribution: 12000,
      nextMeeting: '3 days',
      status: 'active',
      monthlyTarget: 15000,
      progress: 78
    },
    {
      id: 2,
      name: 'Mama Mboga Network',
      role: 'Member',
      members: 8,
      totalSavings: 89000,
      myContribution: 11000,
      nextMeeting: '1 week',
      status: 'active',
      monthlyTarget: 10000,
      progress: 89
    },
    {
      id: 3,
      name: 'Youth Entrepreneurs',
      role: 'Treasurer',
      members: 15,
      totalSavings: 234000,
      myContribution: 15600,
      nextMeeting: '5 days',
      status: 'active',
      monthlyTarget: 22500,
      progress: 104
    }
  ];

  // Contribution history for line chart
  const contributionHistory = [
    { month: 'Jan', myContribution: 12000, groupTotal: 144000, target: 150000 },
    { month: 'Feb', myContribution: 12000, groupTotal: 156000, target: 150000 },
    { month: 'Mar', myContribution: 12000, groupTotal: 168000, target: 150000 },
    { month: 'Apr', myContribution: 15000, groupTotal: 180000, target: 180000 },
    { month: 'May', myContribution: 12000, groupTotal: 192000, target: 180000 },
    { month: 'Jun', myContribution: 12000, groupTotal: 204000, target: 180000 }
  ];

  // Savings allocation - Donut chart
  const savingsAllocation = [
    { name: 'Emergency Fund', value: 35, amount: 50750, color: '#dc2626' },
    { name: 'Business Growth', value: 40, amount: 58000, color: '#ef4444' },
    { name: 'Education', value: 15, amount: 21750, color: '#b91c1c' },
    { name: 'Investment', value: 10, amount: 14500, color: '#991b1b' }
  ];

  // Member contribution distribution - Pie chart
  const memberContributions = [
    { name: 'On Time', value: 75, color: '#dc2626' },
    { name: 'Late', value: 20, color: '#f59e0b' },
    { name: 'Pending', value: 5, color: '#9ca3af' }
  ];

  // Monthly growth trend - Area chart
  const growthTrend = [
    { month: 'Jan', savings: 120000, members: 10 },
    { month: 'Feb', savings: 135000, members: 11 },
    { month: 'Mar', savings: 148000, members: 12 },
    { month: 'Apr', savings: 165000, members: 12 },
    { month: 'May', savings: 182000, members: 13 },
    { month: 'Jun', savings: 204000, members: 15 }
  ];

  // Chama performance comparison - Bar chart
  const chamaComparison = [
    { chama: 'Umoja', savings: 145, members: 12, avgContribution: 12 },
    { chama: 'Mama Mboga', savings: 89, members: 8, avgContribution: 11 },
    { chama: 'Youth Ent.', savings: 234, members: 15, avgContribution: 15.6 }
  ];

  return (
    <div className="space-y-3 pb-4">
      {/* Header */}
      <div className="bg-red-600 rounded-lg p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Digi Chama Portal</h1>
            </div>
            <p className="text-white/90 text-base font-medium">Manage and monitor your community savings groups</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold h-11 px-5">
            <Plus className="w-4 h-4 mr-2" />
            Create New Chama
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex bg-white rounded-lg p-1 shadow-md border-2 border-gray-300">
          <Button
            variant={activeView === 'manage' ? 'default' : 'ghost'}
            onClick={() => setActiveView('manage')}
            className={`px-6 py-2 rounded-md transition-all duration-200 font-bold ${
              activeView === 'manage' 
                ? 'bg-red-600 text-white shadow-md hover:bg-red-700' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Chamas
          </Button>
          <Button
            variant={activeView === 'monitor' ? 'default' : 'ghost'}
            onClick={() => setActiveView('monitor')}
            className={`px-6 py-2 rounded-md transition-all duration-200 font-bold ${
              activeView === 'monitor' 
                ? 'bg-red-600 text-white shadow-md hover:bg-red-700' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Eye className="w-4 h-4 mr-2" />
            Monitor Performance
          </Button>
        </div>
      </div>

      {/* Manage View */}
      {activeView === 'manage' && (
        <div className="space-y-3">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card 
              className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredCard('chamas')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-semibold">My Chamas</p>
                  <p className="text-3xl font-bold text-gray-900">{myChamas.length}</p>
                  <p className="text-xs text-gray-600 font-medium">Active groups</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-semibold">Total Savings</p>
                  <p className="text-3xl font-bold text-gray-900">KSh 38.6K</p>
                  <p className="text-xs text-gray-600 font-medium">Across all chamas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-semibold">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">KSh 12K</p>
                  <p className="text-xs text-gray-600 font-medium">Contributed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-semibold">Next Meeting</p>
                  <p className="text-3xl font-bold text-gray-900">3 Days</p>
                  <p className="text-xs text-gray-600 font-medium">Umoja Traders</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Contribution Trends - Line Chart */}
            <Card className="bg-white border-2 border-gray-300 shadow-lg">
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-gray-900 font-bold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                  Contribution Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={contributionHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <Tooltip 
                        formatter={(value) => [`KSh ${value.toLocaleString()}`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #dc2626',
                          borderRadius: '8px',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
                      <Line 
                        type="monotone" 
                        dataKey="myContribution" 
                        stroke="#dc2626" 
                        strokeWidth={3} 
                        dot={{ r: 5, fill: '#dc2626' }} 
                        activeDot={{ r: 7 }}
                        name="My Contribution"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="groupTotal" 
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        dot={{ r: 5, fill: '#ef4444' }} 
                        activeDot={{ r: 7 }}
                        name="Group Total"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#9ca3af" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Savings Allocation - Donut Chart */}
            <Card className="bg-white border-2 border-gray-300 shadow-lg">
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-gray-900 font-bold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-600" />
                  Savings Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={savingsAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {savingsAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`${value}% (KSh ${props.payload.amount.toLocaleString()})`, props.payload.name]}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #dc2626',
                          borderRadius: '8px',
                          fontWeight: 'bold'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {savingsAllocation.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-800 font-semibold">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row of Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Growth Trend - Area Chart */}
            <Card className="bg-white border-2 border-gray-300 shadow-lg">
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-gray-900 font-bold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-red-600" />
                  Monthly Growth Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthTrend}>
                      <defs>
                        <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #dc2626',
                          borderRadius: '8px',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
                      <Area 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#dc2626" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorSavings)"
                        name="Total Savings (KSh)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Chama Comparison - Bar Chart */}
            <Card className="bg-white border-2 border-gray-300 shadow-lg">
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-gray-900 font-bold flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                  Chama Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chamaComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="chama" 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                        stroke="#9ca3af"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #dc2626',
                          borderRadius: '8px',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
                      <Bar dataKey="savings" fill="#dc2626" radius={[8, 8, 0, 0]} name="Savings (K)" />
                      <Bar dataKey="members" fill="#ef4444" radius={[8, 8, 0, 0]} name="Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chama Cards - Reduced size */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {myChamas.map((chama) => (
              <Card key={chama.id} className="shadow-md border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{chama.name}</CardTitle>
                        <Badge className="mt-1 bg-pink-100 text-pink-800 border-pink-300 text-xs">
                          {chama.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-600">Members</p>
                      <p className="text-lg font-bold text-gray-900">{chama.members}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Savings</p>
                      <p className="text-lg font-bold text-gray-900">KSh {(chama.totalSavings / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{chama.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          chama.progress >= 100 
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                            : 'bg-gradient-to-r from-pink-400 to-rose-400'
                        }`}
                        style={{ width: `${Math.min(chama.progress, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-xs h-8">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-pink-300 text-pink-700 hover:bg-pink-50 text-xs h-8">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Contribute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Monitor View */}
      {activeView === 'monitor' && (
        <div className="space-y-3">
          {/* Member Contribution Status - Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <PieChartIcon className="w-4 h-4 mr-2 text-pink-600" />
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberContributions}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {memberContributions.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-2">
                  {memberContributions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Transactions */}
            <Card className="lg:col-span-2 shadow-lg border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-pink-600" />
                  Recent Blockchain Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  {[
                    { member: 'Janet W.', amount: 12000, hash: '0x4f2a...8b1c', time: '2 hours ago', verified: true },
                    { member: 'Grace M.', amount: 15000, hash: '0x7b3d...9e2f', time: '5 hours ago', verified: true },
                    { member: 'John K.', amount: 12000, hash: '0x1a5c...4f8b', time: '1 day ago', verified: true },
                    { member: 'Mary A.', amount: 12000, hash: '0x9d7e...2c1a', time: '2 days ago', verified: true }
                  ].map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${tx.verified ? 'bg-pink-500' : 'bg-yellow-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{tx.member}</p>
                          <p className="text-xs text-gray-600 flex items-center space-x-1">
                            <span>Hash: {tx.hash}</span>
                            {tx.verified && <CheckCircle className="w-3 h-3 text-pink-500" />}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-pink-600">+KSh {tx.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
