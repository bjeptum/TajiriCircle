import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Plus, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Search,
  Filter,
  MessageCircle,
  Settings,
  Award,
  Clock,
  CheckCircle,
  Sparkles,
  Send
} from 'lucide-react';

export function DigitalChama() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showContributeDialog, setShowContributeDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedChama, setSelectedChama] = useState<any>(null);
  const [contributeAmount, setContributeAmount] = useState('');
  const [newChamaName, setNewChamaName] = useState('');
  const [newChamaDescription, setNewChamaDescription] = useState('');
  const [newChamaContribution, setNewChamaContribution] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  // Mock data for active chamas
  const myChamas = [
    {
      id: 1,
      name: 'Umoja Savings Group',
      yourSavings: 8500,
      groupTotal: 102000,
      members: 12,
      monthlyContribution: 500,
      goalAmount: 150000,
      goalDeadline: 'Dec 2024',
      progress: 68,
      nextDue: 'Tomorrow',
      rank: 3,
      recentActivity: [
        { member: 'Mary K.', amount: 500, time: '2 days ago' },
        { member: 'John M.', amount: 500, time: '3 days ago' }
      ]
    },
    {
      id: 2,
      name: 'Biashara Group',
      yourSavings: 7100,
      groupTotal: 85000,
      members: 12,
      monthlyContribution: 1000,
      goalAmount: 120000,
      goalDeadline: 'Nov 2024',
      progress: 71,
      nextDue: 'In 5 days',
      rank: 5,
      recentActivity: [
        { member: 'Grace W.', amount: 1000, time: '1 day ago' },
        { member: 'Peter K.', amount: 1000, time: '4 days ago' }
      ]
    }
  ];

  // Mock data for discover chamas
  const discoverChamas = [
    {
      id: 3,
      name: 'Mama Fua Women\'s Group',
      members: 45,
      monthlyContribution: 500,
      rating: 4.8,
      location: 'Nairobi',
      category: 'Women\'s Group',
      description: 'Supporting women entrepreneurs in the laundry business',
      verified: true,
      trending: true
    },
    {
      id: 4,
      name: 'Tech Savers',
      members: 23,
      monthlyContribution: 1000,
      rating: 4.5,
      location: 'Nairobi',
      category: 'Professional',
      description: 'IT professionals saving for tech investments',
      verified: true,
      trending: false
    },
    {
      id: 5,
      name: 'Boda Boda Riders Union',
      members: 67,
      monthlyContribution: 300,
      rating: 4.9,
      location: 'Mombasa',
      category: 'Transport',
      description: 'Motorcycle riders collective savings group',
      verified: true,
      trending: true
    }
  ];

  // Recent activity feed
  const activityFeed = [
    { id: 1, type: 'contribution', member: 'Mary K.', action: 'contributed KSh 500 to Umoja', time: '2 mins ago', color: 'green' },
    { id: 2, type: 'member', member: 'John M.', action: 'joined Biashara Group', time: '1 hour ago', color: 'blue' },
    { id: 3, type: 'milestone', member: 'Umoja Savings', action: 'reached 80% of goal', time: '3 hours ago', color: 'gold' },
    { id: 4, type: 'reminder', member: 'System', action: 'Contribution due tomorrow', time: '5 hours ago', color: 'amber' }
  ];

  const totalSaved = myChamas.reduce((sum, chama) => sum + chama.yourSavings, 0);
  const totalMembers = myChamas.reduce((sum, chama) => sum + chama.members, 0);
  const nextDueChama = myChamas.find(c => c.nextDue === 'Tomorrow');

  // Handler functions
  const handleContribute = (chama: any) => {
    setSelectedChama(chama);
    setShowContributeDialog(true);
  };

  const handleViewDetails = (chama: any) => {
    setSelectedChama(chama);
    setShowDetailsDialog(true);
  };

  const handleChat = (chama: any) => {
    setSelectedChama(chama);
    setShowChatDialog(true);
  };

  const handleJoinChama = (chama: any) => {
    setSelectedChama(chama);
    setShowJoinDialog(true);
  };

  const handleCreateChama = () => {
    console.log('Creating chama:', { newChamaName, newChamaDescription, newChamaContribution });
    setShowCreateDialog(false);
    setNewChamaName('');
    setNewChamaDescription('');
    setNewChamaContribution('');
  };

  const handleSubmitContribution = () => {
    console.log('Contributing:', contributeAmount, 'to', selectedChama?.name);
    setShowContributeDialog(false);
    setContributeAmount('');
  };

  const handleSendMessage = () => {
    console.log('Sending message:', chatMessage);
    setChatMessage('');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      
      {/* HERO BANNER - GREEN */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center">
                <Users className="w-12 h-12 mr-4" />
                My Digital Chamas
              </h1>
              <p className="text-green-100 text-lg mb-4">
                Active: {myChamas.length} Groups • Total Saved: KSh {totalSaved.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowCreateDialog(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-6 rounded-xl shadow-lg text-base">
                <Plus className="w-5 h-5 mr-2" />
                Create New Chama
              </Button>
              <Button onClick={() => document.getElementById('discover-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white font-bold px-6 py-6 rounded-xl text-base">
                <Search className="w-5 h-5 mr-2" />
                Browse Chamas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Saved */}
        <Card className="bg-white shadow-xl border-2 border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              KSh {totalSaved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Total Saved Across {myChamas.length} Chamas
            </div>
          </CardContent>
        </Card>

        {/* Next Contribution */}
        <Card className="bg-white shadow-xl border-2 border-amber-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-300 text-sm px-3 py-1">
                Urgent
              </Badge>
            </div>
            <div className="text-4xl font-bold text-amber-600 mb-2">
              {nextDueChama?.nextDue || 'None'}
            </div>
            <div className="text-sm text-gray-600">
              KSh {nextDueChama?.monthlyContribution || 0} Due
            </div>
          </CardContent>
        </Card>

        {/* Total Members */}
        <Card className="bg-white shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {totalMembers}
            </div>
            <div className="text-sm text-gray-600">
              Total Members in Your Groups
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MY ACTIVE CHAMAS */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Star className="w-7 h-7 mr-3 text-green-600" />
          My Active Chamas
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myChamas.map((chama) => (
            <Card key={chama.id} className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl border-3 border-green-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="border-b border-green-200 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    {chama.name}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Your Savings</div>
                    <div className="text-2xl font-bold text-green-600 flex items-center">
                      KSh {chama.yourSavings.toLocaleString()}
                      <TrendingUp className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Group Total</div>
                    <div className="text-2xl font-bold text-gray-900">
                      KSh {(chama.groupTotal / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Members</div>
                    <div className="text-2xl font-bold text-blue-600 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {chama.members}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-amber-200">
                    <div className="text-sm text-gray-600 mb-1">Your Rank</div>
                    <div className="text-2xl font-bold text-amber-600 flex items-center">
                      #{chama.rank}
                      <Award className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="p-5 bg-white rounded-xl border-2 border-green-200">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Goal Progress</div>
                      <div className="text-xs text-gray-600">Target: KSh {chama.goalAmount.toLocaleString()} by {chama.goalDeadline}</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{chama.progress}%</div>
                  </div>
                  <Progress value={chama.progress} className="h-3 bg-gray-200" />
                  <div className="text-xs text-gray-600 mt-2">
                    Remaining: KSh {(chama.goalAmount - chama.groupTotal).toLocaleString()}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Activity
                  </div>
                  <div className="space-y-2">
                    {chama.recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-gray-900 font-medium">{activity.member}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-bold">+KSh {activity.amount}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <Button onClick={() => handleContribute(chama)} className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-6 rounded-xl shadow-lg">
                    <DollarSign className="w-5 h-5 mr-1" />
                    Contribute
                  </Button>
                  <Button onClick={() => handleViewDetails(chama)} variant="outline" className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-6 rounded-xl">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    Details
                  </Button>
                  <Button onClick={() => handleChat(chama)} variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold py-6 rounded-xl">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* RECENT ACTIVITY FEED */}
      <Card className="bg-white shadow-xl border-2 border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-gray-700" />
            Recent Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.color === 'green' ? 'bg-green-500' :
                    activity.color === 'blue' ? 'bg-blue-500' :
                    activity.color === 'gold' ? 'bg-yellow-500' :
                    'bg-amber-500'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{activity.member}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
            View All Activity
          </Button>
        </CardContent>
      </Card>

      {/* DISCOVER NEW CHAMAS */}
      <div id="discover-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Search className="w-7 h-7 mr-3 text-green-600" />
            Discover New Chamas
          </h2>
        </div>

        {/* Search & Filter Bar */}
        <Card className="bg-gradient-to-r from-gray-50 to-green-50 shadow-lg border-2 border-green-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search chamas by name, category, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-base border-2 border-green-300"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 h-12">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Discover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discoverChamas.map((chama) => (
            <Card key={chama.id} className="bg-white shadow-xl border-2 border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {chama.category}
                  </Badge>
                  {chama.trending && (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                      🔥 Trending
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  {chama.name}
                  {chama.verified && (
                    <CheckCircle className="w-5 h-5 ml-2 text-green-600" />
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {chama.members} members
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 mr-1 fill-amber-600" />
                    {chama.rating}/5
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {chama.location}
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-900 mb-1">Monthly Contribution</div>
                  <div className="text-2xl font-bold text-green-600">
                    KSh {chama.monthlyContribution.toLocaleString()}
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {chama.description}
                </p>

                <Button onClick={() => handleJoinChama(chama)} className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-6 rounded-xl shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Join Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CREATE CHAMA DIALOG */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <Plus className="w-6 h-6 mr-2 text-green-600" />
              Create New Chama
            </DialogTitle>
            <DialogDescription>
              Start a new savings group and invite members to join.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="chama-name">Chama Name *</Label>
              <Input
                id="chama-name"
                value={newChamaName}
                onChange={(e) => setNewChamaName(e.target.value)}
                placeholder="e.g., Women Entrepreneurs Group"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="chama-description">Description</Label>
              <Textarea
                id="chama-description"
                value={newChamaDescription}
                onChange={(e) => setNewChamaDescription(e.target.value)}
                placeholder="Brief description of your chama's purpose and goals"
                className="mt-2"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="chama-contribution">Monthly Contribution (KSh) *</Label>
              <Input
                id="chama-contribution"
                type="number"
                value={newChamaContribution}
                onChange={(e) => setNewChamaContribution(e.target.value)}
                placeholder="500"
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateChama} className="bg-green-600 hover:bg-green-700">
              Create Chama
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CONTRIBUTE DIALOG */}
      <Dialog open={showContributeDialog} onOpenChange={setShowContributeDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              Make Contribution
            </DialogTitle>
            <DialogDescription>
              Contribute to {selectedChama?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600 mb-1">Monthly Contribution</div>
              <div className="text-3xl font-bold text-green-600">
                KSh {selectedChama?.monthlyContribution.toLocaleString()}
              </div>
            </div>
            <div>
              <Label htmlFor="contribute-amount">Amount (KSh) *</Label>
              <Input
                id="contribute-amount"
                type="number"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                placeholder={selectedChama?.monthlyContribution.toString()}
                className="mt-2 text-lg"
              />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                💡 Your contribution will be recorded on the blockchain for transparency
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContributeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitContribution} className="bg-green-600 hover:bg-green-700">
              Contribute Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DETAILS DIALOG */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              {selectedChama?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information and statistics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Your Savings</div>
                <div className="text-2xl font-bold text-green-600">
                  KSh {selectedChama?.yourSavings.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Group Total</div>
                <div className="text-2xl font-bold text-blue-600">
                  KSh {selectedChama?.groupTotal.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="text-sm text-gray-600">Members</div>
                <div className="text-2xl font-bold text-amber-600">
                  {selectedChama?.members}
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Your Rank</div>
                <div className="text-2xl font-bold text-purple-600">
                  #{selectedChama?.rank}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">Goal Progress</div>
              <Progress value={selectedChama?.progress} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>KSh {selectedChama?.groupTotal.toLocaleString()}</span>
                <span>KSh {selectedChama?.goalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-900 mb-2">Next Contribution</div>
              <div className="text-lg font-bold text-green-600">
                {selectedChama?.nextDue} - KSh {selectedChama?.monthlyContribution.toLocaleString()}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)} className="bg-green-600 hover:bg-green-700">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CHAT DIALOG */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
              {selectedChama?.name} Chat
            </DialogTitle>
            <DialogDescription>
              Group chat with {selectedChama?.members} members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="h-64 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                  M
                </div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-gray-900">Mary K.</div>
                    <div className="text-sm text-gray-600">Just contributed! Let's reach our goal! 🎯</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  J
                </div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-gray-900">John M.</div>
                    <div className="text-sm text-gray-600">Great work everyone! We're almost there!</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChatDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* JOIN CHAMA DIALOG */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <Plus className="w-6 h-6 mr-2 text-green-600" />
              Join {selectedChama?.name}
            </DialogTitle>
            <DialogDescription>
              Review the details and join this chama
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-3">{selectedChama?.description}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Members</div>
                  <div className="text-lg font-bold text-gray-900">{selectedChama?.members}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="text-lg font-bold text-amber-600 flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-amber-600" />
                    {selectedChama?.rating}/5
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm font-medium text-gray-900">{selectedChama?.location}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Category</div>
                  <div className="text-sm font-medium text-gray-900">{selectedChama?.category}</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Monthly Contribution Required</div>
              <div className="text-3xl font-bold text-green-600">
                KSh {selectedChama?.monthlyContribution.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                ✅ Verified chama with blockchain transparency
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => { setShowJoinDialog(false); }} className="bg-green-600 hover:bg-green-700">
              Join Chama
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
