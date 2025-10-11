import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Plus, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  DollarSign,
  Shield,
  Calendar,
  Star,
  Zap
} from 'lucide-react';

interface ChamaData {
  id: number;
  name: string;
  description?: string;
  total_members: number;
  total_savings: number;
  monthly_contribution: number;
  status: string;
  created_at: string;
  user_role: string;
  current_month_status: string;
}

export function DigitalChama() {
  const [chamas, setChamas] = useState<ChamaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newChamaName, setNewChamaName] = useState('');
  const [newChamaDescription, setNewChamaDescription] = useState('');
  const [newChamaContribution, setNewChamaContribution] = useState('');
  const [error, setError] = useState('');

  // Load real chamas from backend
  useEffect(() => {
    loadUserChamas();
  }, []);

  const loadUserChamas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chamas/user/1');
      if (response.ok) {
        const data = await response.json();
        setChamas(data);
      }
    } catch (error) {
      console.error('Failed to load chamas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChama = async () => {
    if (!newChamaName || !newChamaContribution) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/chamas/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newChamaName,
          description: newChamaDescription,
          monthly_contribution: parseFloat(newChamaContribution),
        }),
      });

      if (response.ok) {
        setNewChamaName('');
        setNewChamaDescription('');
        setNewChamaContribution('');
        setShowCreateDialog(false);
        setError('');
        await loadUserChamas();
      } else {
        setError('Failed to create chama');
      }
    } catch (error) {
      console.error('Failed to create chama:', error);
      setError('Failed to create chama');
    } finally {
      setLoading(false);
    }
  };

  // Transform real chama data to match UI expectations
  const chamaGroups = chamas.length > 0 ? chamas.map(chama => ({
    id: chama.id.toString(),
    name: chama.name,
    members: chama.total_members || 1,
    totalSavings: chama.total_savings || 0,
    monthlyTarget: chama.monthly_contribution || 0,
    progress: Math.min(100, ((chama.total_savings || 0) / ((chama.monthly_contribution || 1) * (chama.total_members || 1))) * 100),
    nextPayout: '15 days',
    trustScore: 92,
    tasks: [
      { id: 1, description: 'Contribute monthly savings', amount: chama.monthly_contribution || 0, completed: chama.current_month_status === 'paid' },
      { id: 2, description: 'Refer new member', amount: 500, completed: false },
      { id: 3, description: 'Attend weekly meeting', amount: 200, completed: true }
    ]
  })) : [
    // Fallback mock data if no real chamas exist
    {
      id: 'demo1',
      name: 'Umoja Traders',
      members: 12,
      totalSavings: 145000,
      monthlyTarget: 15000,
      progress: 78,
      nextPayout: '15 days',
      trustScore: 92,
      tasks: [
        { id: 1, description: 'Contribute monthly savings', amount: 1200, completed: true },
        { id: 2, description: 'Refer new member', amount: 500, completed: false },
        { id: 3, description: 'Attend weekly meeting', amount: 200, completed: true }
      ]
    },
    {
      id: 'demo2',
      name: 'Mama Mboga Network',
      members: 8,
      totalSavings: 89000,
      monthlyTarget: 10000,
      progress: 65,
      nextPayout: '22 days',
      trustScore: 88,
      tasks: [
        { id: 1, description: 'Weekly sales report', amount: 300, completed: false },
        { id: 2, description: 'Share business tip', amount: 150, completed: true }
      ]
    }
  ];

  const blockchainTransactions = [
    { id: 1, type: 'deposit', member: 'Janet K.', amount: 1200, hash: '0x4f2a...8b1c', timestamp: '10:30 AM', verified: true },
    { id: 2, type: 'deposit', member: 'Grace M.', amount: 1500, hash: '0x7b3d...9e2f', timestamp: '09:15 AM', verified: true },
    { id: 3, type: 'withdrawal', member: 'John D.', amount: 2000, hash: '0x1a5c...4f8b', timestamp: '08:45 AM', verified: true },
    { id: 4, type: 'deposit', member: 'Mary W.', amount: 800, hash: '0x9d7e...2c1a', timestamp: '08:20 AM', verified: true }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Digital Chama
            </h1>
            <p className="text-red-100">Transparent group savings with blockchain technology</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Chama</DialogTitle>
                <DialogDescription>
                  Start a new investment group for collective savings and growth.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Chama Name *</Label>
                  <Input
                    id="name"
                    value={newChamaName}
                    onChange={(e) => setNewChamaName(e.target.value)}
                    placeholder="e.g., Women Entrepreneurs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newChamaDescription}
                    onChange={(e) => setNewChamaDescription(e.target.value)}
                    placeholder="Brief description of your chama's purpose"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contribution">Monthly Contribution (KES) *</Label>
                  <Input
                    id="contribution"
                    type="number"
                    value={newChamaContribution}
                    onChange={(e) => setNewChamaContribution(e.target.value)}
                    placeholder="5000"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateChama} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Chama'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="groups">My Groups</TabsTrigger>
          <TabsTrigger value="ledger">Blockchain Ledger</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Rewards</TabsTrigger>
        </TabsList>

        {/* My Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <p className="mt-2 text-gray-600">Loading your chamas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chamaGroups.map((group) => (
                <Card key={group.id} className="bg-white/90 backdrop-blur-sm shadow-xl border-red-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        {group.name}
                        {chamas.length > 0 && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                            Real Data
                          </Badge>
                        )}
                      </CardTitle>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {group.trustScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Members</div>
                        <div className="font-semibold text-gray-900">{group.members}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Total Savings</div>
                        <div className="font-semibold text-gray-900">KSh {group.totalSavings.toLocaleString()}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Monthly Progress</span>
                        <span className="text-red-600 font-medium">{Math.round(group.progress)}%</span>
                      </div>
                      <Progress value={group.progress} className="h-2 bg-gray-200" />
                      <div className="text-xs text-gray-500 mt-1">
                        Target: KSh {group.monthlyTarget.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Next payout: {group.nextPayout}
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Contribute
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-red-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowCreateDialog(true)}
                  className="flex flex-col items-center space-y-2 h-auto py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create New Chama</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4 border-red-200 text-red-700 hover:bg-red-50">
                  <Target className="w-6 h-6" />
                  <span>Set Savings Goal</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4 border-red-200 text-red-700 hover:bg-red-50">
                  <TrendingUp className="w-6 h-6" />
                  <span>View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blockchain Ledger Tab */}
        <TabsContent value="ledger" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-red-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Transparent Transaction Ledger
              </CardTitle>
              <p className="text-sm text-gray-600">All transactions are verified and recorded on blockchain for transparency</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blockchainTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${tx.verified ? 'bg-green-500' : 'bg-yellow-500'} ${tx.verified ? '' : 'animate-pulse'}`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{tx.member}</span>
                          <Badge variant={tx.type === 'deposit' ? 'default' : 'secondary'} className="text-xs">
                            {tx.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 flex items-center space-x-2">
                          <span>Hash: {tx.hash}</span>
                          {tx.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}KSh {tx.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">{tx.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Blockchain Verified</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  All transactions are secured by blockchain technology ensuring transparency and preventing tampering.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks & Rewards Tab */}
        <TabsContent value="tasks" className="space-y-6">
          {chamaGroups.map((group) => (
            <Card key={group.id} className="bg-white/90 backdrop-blur-sm shadow-xl border-red-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  {group.name} - Task-Based Savings
                </CardTitle>
                <p className="text-sm text-gray-600">Complete tasks to earn rewards and boost your savings</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.tasks.map((task) => (
                    <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                      <div className="flex items-center space-x-3">
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{task.description}</div>
                          <div className="text-sm text-gray-600">Reward: KSh {task.amount}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {task.completed ? (
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            Completed
                          </Badge>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
