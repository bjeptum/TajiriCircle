import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  UserCheck,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Shield,
  Zap,
  Star
} from 'lucide-react';

export function BankDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<'customers' | 'volume' | 'trust'>('customers');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Customer growth data
  const customerGrowthData = [
    { month: 'Jan', customers: 1200, active: 980, inactive: 220 },
    { month: 'Feb', customers: 1450, active: 1180, inactive: 270 },
    { month: 'Mar', customers: 1680, active: 1420, inactive: 260 },
    { month: 'Apr', customers: 1920, active: 1650, inactive: 270 },
    { month: 'May', customers: 2280, active: 1980, inactive: 300 },
    { month: 'Jun', customers: 2650, active: 2320, inactive: 330 }
  ];

  // Transaction volume data
  const transactionData = [
    { day: 'Mon', volume: 45000, count: 234 },
    { day: 'Tue', volume: 52000, count: 289 },
    { day: 'Wed', volume: 48000, count: 256 },
    { day: 'Thu', volume: 61000, count: 312 },
    { day: 'Fri', volume: 73000, count: 398 },
    { day: 'Sat', volume: 68000, count: 356 },
    { day: 'Sun', volume: 42000, count: 198 }
  ];

  // Risk distribution
  const riskData = [
    { name: 'Low Risk', value: 68, color: '#10b981' },
    { name: 'Medium Risk', value: 24, color: '#f59e0b' },
    { name: 'High Risk', value: 8, color: '#ef4444' }
  ];

  // Customer performance tiers
  const performanceTiers = [
    { tier: 'Excellent', count: 892, percentage: 34, trustScore: '750+', color: 'from-green-500 to-green-700' },
    { tier: 'Good', count: 1124, percentage: 42, trustScore: '650-749', color: 'from-blue-500 to-blue-700' },
    { tier: 'Fair', count: 486, percentage: 18, trustScore: '550-649', color: 'from-yellow-500 to-yellow-700' },
    { tier: 'Poor', count: 148, percentage: 6, trustScore: '<550', color: 'from-red-500 to-red-700' }
  ];

  // Top customers
  const topCustomers = [
    { id: 1, name: 'Janet Wanjiru', phone: '+254700123456', trustScore: 842, transactions: 156, volume: 'KSh 245,000', status: 'active' },
    { id: 2, name: 'John Kamau', phone: '+254711234567', trustScore: 798, transactions: 134, volume: 'KSh 198,000', status: 'active' },
    { id: 3, name: 'Grace Muthoni', phone: '+254722345678', trustScore: 776, transactions: 128, volume: 'KSh 187,000', status: 'active' },
    { id: 4, name: 'Peter Ochieng', phone: '+254733456789', trustScore: 754, transactions: 112, volume: 'KSh 165,000', status: 'active' },
    { id: 5, name: 'Mary Akinyi', phone: '+254744567890', trustScore: 732, transactions: 98, volume: 'KSh 142,000', status: 'active' }
  ];

  // Customer satisfaction data
  const satisfactionData = [
    { category: 'Service', score: 85 },
    { category: 'Speed', score: 92 },
    { category: 'Security', score: 95 },
    { category: 'Support', score: 78 },
    { category: 'Features', score: 88 }
  ];

  // Loan performance data
  const loanData = [
    { month: 'Jan', approved: 45, rejected: 12, pending: 8 },
    { month: 'Feb', approved: 52, rejected: 15, pending: 10 },
    { month: 'Mar', approved: 61, rejected: 10, pending: 7 },
    { month: 'Apr', approved: 58, rejected: 14, pending: 9 },
    { month: 'May', approved: 67, rejected: 11, pending: 6 },
    { month: 'Jun', approved: 74, rejected: 9, pending: 5 }
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="bg-red-600 rounded-lg p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Building2 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Bank Analytics Dashboard</h1>
            </div>
            <p className="text-white/90 text-base font-medium">Real-time customer insights and performance metrics</p>
          </div>
          <Button
            className="bg-white text-red-600 hover:bg-gray-100 font-bold"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredCard('customers')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-600 text-white text-xs font-bold">+12.5%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-semibold">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">2,650</p>
              <p className="text-xs text-gray-600 font-medium">+298 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredCard('active')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-blue-600 text-white text-xs font-bold">87.5%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-semibold">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">2,320</p>
              <p className="text-xs text-gray-600 font-medium">Last 30 days</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredCard('volume')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-600 text-white text-xs font-bold">+18.3%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-semibold">Transaction Volume</p>
              <p className="text-3xl font-bold text-gray-900">KSh 389K</p>
              <p className="text-xs text-gray-600 font-medium">This week</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-red-600 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredCard('trust')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-orange-600 text-white text-xs font-bold">Live</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-semibold">Avg Trust Score</p>
              <p className="text-3xl font-bold text-gray-900">724</p>
              <p className="text-xs text-gray-600 font-medium">Excellent rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Customer Growth Chart */}
        <Card className="bg-white border-2 border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center text-gray-900 font-bold">
                <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                Customer Growth
              </span>
              <div className="flex space-x-1">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className={`text-xs h-7 px-3 ${timeRange === range ? 'bg-red-600 hover:bg-red-700' : 'border-gray-300 text-gray-700'}`}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerGrowthData}>
                  <defs>
                    <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
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
                  <Area 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCustomers)" 
                    name="Total Customers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Volume Chart */}
        <Card className="bg-white border-2 border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-3">
            <CardTitle className="flex items-center text-gray-900 font-bold">
              <Activity className="w-5 h-5 mr-2 text-red-600" />
              Weekly Transaction Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Volume']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #dc2626',
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Bar 
                    dataKey="volume" 
                    fill="#dc2626" 
                    radius={[8, 8, 0, 0]}
                    name="Transaction Volume"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Charts Row - Loan Performance & Customer Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Loan Performance Chart */}
        <Card className="bg-white border-2 border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-3">
            <CardTitle className="flex items-center text-gray-900 font-bold">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Loan Application Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanData}>
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
                  <Legend 
                    wrapperStyle={{ fontWeight: 'bold', fontSize: '13px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#10b981' }} 
                    activeDot={{ r: 7 }}
                    name="Approved"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rejected" 
                    stroke="#ef4444" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#ef4444' }} 
                    activeDot={{ r: 7 }}
                    name="Rejected"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#f59e0b' }} 
                    activeDot={{ r: 7 }}
                    name="Pending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Radar */}
        <Card className="bg-white border-2 border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-3">
            <CardTitle className="flex items-center text-gray-900 font-bold">
              <Star className="w-5 h-5 mr-2 text-red-600" />
              Customer Satisfaction Score
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={satisfactionData}>
                  <PolarGrid stroke="#e5e7eb" strokeWidth={2} />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }} 
                  />
                  <Radar 
                    name="Score" 
                    dataKey="score" 
                    stroke="#dc2626" 
                    fill="#dc2626" 
                    fillOpacity={0.6}
                    strokeWidth={3}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #dc2626',
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tiers and Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Tiers */}
        <Card className="lg:col-span-2 shadow-xl border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Customer Performance Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceTiers.map((tier, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tier.color}`} />
                      <span className="font-semibold text-gray-900">{tier.tier}</span>
                      <Badge variant="outline" className="text-xs">
                        Trust Score: {tier.trustScore}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{tier.count}</span>
                      <span className="text-sm text-gray-600 ml-2">({tier.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${tier.color} transition-all duration-500`}
                      style={{ width: `${tier.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="shadow-xl border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {riskData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
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
      </div>

      {/* Top Customers Table */}
      <Card className="shadow-xl border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Top Performing Customers
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trust Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transactions</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Volume</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{customer.phone}</td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        {customer.trustScore}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{customer.transactions}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{customer.volume}</td>
                    <td className="py-4 px-4">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
