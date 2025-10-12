import { useState, useEffect } from 'react';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { MainLandingPage } from './components/MainLandingPage';
import { TajiriWetuLogin } from './components/TajiriWetuLogin';
import { TajiriWetuSignup } from './components/TajiriWetuSignup';
import { BankLogin } from './components/BankLogin';
import { Dashboard } from './components/Dashboard';
import { BankDashboard } from './components/BankDashboard';
import { DigitalChama } from './components/DigitalChama';
import { FraudAlertCenter } from './components/FraudAlertCenter';
import { ProfilePage } from './components/ProfilePage';
import { FloatingTajiriBot } from './components/FloatingTajiriBot';
import { Button } from './components/ui/button';
import { Phone, Shield, Users, User, LogOut, Wallet, Building2 } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type AppState = 
  | 'welcome-animation'
  | 'main-landing'
  | 'tajiri-login'
  | 'tajiri-signup'
  | 'bank-login'
  | 'tajiri-dashboard'
  | 'bank-dashboard';

type ClientPage = 'dashboard' | 'chama' | 'fraud' | 'profile';

function AppContent() {
  const { isAuthenticated, isBankUser, user, bankUser, login, bankLogin, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>('welcome-animation');
  const [currentPage, setCurrentPage] = useState<ClientPage>('dashboard');
  const [showBot, setShowBot] = useState(false);

  // Show bot after welcome animation completes
  useEffect(() => {
    if (appState !== 'welcome-animation') {
      setShowBot(true);
    }
  }, [appState]);

  // Auto-navigate based on authentication state
  useEffect(() => {
    if (isAuthenticated && isBankUser) {
      setAppState('bank-dashboard');
    } else if (isAuthenticated && !isBankUser) {
      setAppState('tajiri-dashboard');
    }
  }, [isAuthenticated, isBankUser]);

  // Handle welcome animation completion
  const handleAnimationComplete = () => {
    setAppState('main-landing');
  };

  // Handle navigation from main landing
  const handleMainLandingNavigate = (destination: 'tajiri-signup' | 'tajiri-login' | 'bank-login') => {
    setAppState(destination);
  };

  // Handle Tajiri Wetu login - for now keep the existing interface
  const handleTajiriLogin = (userData: any) => {
    // TODO: Update login components to use proper authentication
    setAppState('tajiri-dashboard');
    setCurrentPage('dashboard');
  };

  // Handle Tajiri Wetu signup - for now keep the existing interface
  const handleTajiriSignup = (userData: any) => {
    // TODO: Update signup components to use proper authentication
    setAppState('tajiri-dashboard');
    setCurrentPage('dashboard');
  };

  // Handle Bank login - for now keep the existing interface
  const handleBankLogin = (userData: any) => {
    // TODO: Update bank login components to use proper authentication
    setAppState('bank-dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setAppState('main-landing');
    setCurrentPage('dashboard');
  };

  // Handle back to main landing
  const handleBackToLanding = () => {
    setAppState('main-landing');
  };

  // Render welcome animation
  if (appState === 'welcome-animation') {
    return <WelcomeAnimation onComplete={handleAnimationComplete} />;
  }

  // Render main landing page
  if (appState === 'main-landing') {
    return (
      <>
        <MainLandingPage onNavigate={handleMainLandingNavigate} />
        {showBot && <FloatingTajiriBot context="login" />}
      </>
    );
  }

  // Render Tajiri Wetu Login
  if (appState === 'tajiri-login') {
    return (
      <>
        <TajiriWetuLogin
          onLogin={handleTajiriLogin}
          onBack={handleBackToLanding}
          onNavigateToSignup={() => setAppState('tajiri-signup')}
        />
        {showBot && <FloatingTajiriBot context="login" />}
      </>
    );
  }

  // Render Tajiri Wetu Signup
  if (appState === 'tajiri-signup') {
    return (
      <>
        <TajiriWetuSignup
          onSignup={handleTajiriSignup}
          onBack={handleBackToLanding}
          onNavigateToLogin={() => setAppState('tajiri-login')}
        />
        {showBot && <FloatingTajiriBot context="login" />}
      </>
    );
  }

  // Render Bank Login
  if (appState === 'bank-login') {
    return (
      <>
        <BankLogin
          onLogin={handleBankLogin}
          onBack={handleBackToLanding}
        />
        {showBot && <FloatingTajiriBot context="login" />}
      </>
    );
  }

  // Render Bank Dashboard
  if (appState === 'bank-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Bank Portal</h1>
                  <p className="text-xs text-gray-600">Analytics Dashboard</p>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <BankDashboard />
        </main>

        {/* Floating TajiriBot */}
        {showBot && <FloatingTajiriBot context="bank" />}
      </div>
    );
  }

  // Render Tajiri Wetu Dashboard (Client Portal)
  if (appState === 'tajiri-dashboard') {
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />;
        case 'chama':
          return <DigitalChama />;
        case 'fraud':
          return <FraudAlertCenter />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tajiri Wetu</h1>
                  <p className="text-xs text-gray-600">Personal Finance</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-xs"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Dashboard
                </Button>
                <Button
                  variant={currentPage === 'chama' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('chama')}
                  className="text-xs"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Digital Chama
                </Button>
                <Button
                  variant={currentPage === 'fraud' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('fraud')}
                  className="text-xs"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Fraud Alerts
                </Button>
                <Button
                  variant={currentPage === 'profile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('profile')}
                  className="text-xs"
                >
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </nav>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          {renderPage()}
        </main>

        {/* Mobile bottom navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 md:hidden z-50">
          <div className="flex items-center justify-around py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('dashboard')}
              className={`flex flex-col items-center space-y-1 p-2 ${currentPage === 'dashboard' ? 'text-red-600' : 'text-gray-600'}`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('chama')}
              className={`flex flex-col items-center space-y-1 p-2 ${currentPage === 'chama' ? 'text-red-600' : 'text-gray-600'}`}
            >
              <Users className="w-4 h-4" />
              <span className="text-xs">Chama</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('fraud')}
              className={`flex flex-col items-center space-y-1 p-2 ${currentPage === 'fraud' ? 'text-red-600' : 'text-gray-600'}`}
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs">Security</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('profile')}
              className={`flex flex-col items-center space-y-1 p-2 ${currentPage === 'profile' ? 'text-red-600' : 'text-gray-600'}`}
            >
              <User className="w-4 h-4" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </nav>

        {/* Floating TajiriBot */}
        {showBot && <FloatingTajiriBot context="client" />}
      </div>
    );
  }

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
