import { useState, useEffect } from 'react';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { MainLandingPage } from './components/MainLandingPage';
import { TajiriWetuLogin } from './components/TajiriWetuLogin';
import { TajiriWetuSignup } from './components/TajiriWetuSignup';
import { BankApp } from './components/BankApp';
import { Dashboard } from './components/Dashboard';
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
  | 'bank-app'
  | 'tajiri-dashboard';

type ClientPage = 'dashboard' | 'chama' | 'fraud' | 'profile';

function AppContent() {
  const { user, bankUser, isAuthenticated, isBankUser, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>('welcome-animation');
  const [currentPage, setCurrentPage] = useState<ClientPage>('dashboard');
  const [showBot, setShowBot] = useState(false);

  // Show bot after welcome animation completes
  useEffect(() => {
    if (appState !== 'welcome-animation') {
      setShowBot(true);
    }
  }, [appState]);

  // Update app state based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      if (isBankUser) {
        setAppState('bank-app');
      } else {
        setAppState('tajiri-dashboard');
      }
    }
  }, [isAuthenticated, isBankUser]);

  // Handle welcome animation completion
  const handleAnimationComplete = () => {
    setAppState('main-landing');
  };

  // Handle navigation from main landing
  const handleMainLandingNavigate = (destination: 'tajiri-signup' | 'tajiri-login' | 'bank-app') => {
    setAppState(destination);
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
          onBack={handleBackToLanding}
          onNavigateToLogin={() => setAppState('tajiri-login')}
        />
        {showBot && <FloatingTajiriBot context="login" />}
      </>
    );
  }

  // Render Bank App
  if (appState === 'bank-app') {
    return (
      <>
        <BankApp onBack={handleBackToLanding} />
        {showBot && <FloatingTajiriBot context="bank" />}
      </>
    );
  }

  // Render Tajiri Wetu Dashboard (main user dashboard)
  if (appState === 'tajiri-dashboard' && isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TajiriWetu</h1>
                  <p className="text-xs text-gray-500">Financial Ecosystem</p>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name || user.phone}
                    </p>
                    <p className="text-xs text-gray-500">Personal Account</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Wallet },
                { id: 'chama', label: 'Chama', icon: Users },
                { id: 'fraud', label: 'Security', icon: Shield },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentPage(tab.id as ClientPage)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                    currentPage === tab.id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'chama' && <DigitalChama />}
          {currentPage === 'fraud' && <FraudAlertCenter />}
          {currentPage === 'profile' && <ProfilePage />}
        </main>

        {showBot && <FloatingTajiriBot context="dashboard" />}
      </div>
    );
  }

  // Default to main landing
  return (
    <>
      <MainLandingPage onNavigate={handleMainLandingNavigate} />
      {showBot && <FloatingTajiriBot context="login" />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}