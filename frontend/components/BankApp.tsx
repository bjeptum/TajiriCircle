import { useState, useEffect } from 'react';
import { BankLogin } from './bank/BankLogin.tsx';
import { BankDashboard } from './bank/BankDashboard.tsx';
import { ApplicationQueue } from './bank/ApplicationQueue.tsx';
import { CaseReview } from './bank/CaseReview.tsx';
import { PortfolioDashboard } from './bank/PortfolioDashboard.tsx';

interface BankAppProps {
  onBack: () => void;
}

export interface LoanApplication {
  id: string;
  applicantName: string;
  businessName: string;
  businessType: 'farmer' | 'salon' | 'welding' | 'other';
  location: string;
  amount: number;
  purpose: string;
  greenScore: number;
  interestRate: number;
  term: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  appliedDate: string;
  ecoActions: Array<{
    id: string;
    type: string;
    description: string;
    verified: boolean;
    evidence: string;
    ocrResult?: string;
    riskFlags?: string[];
  }>;
  riskAssessment: {
    creditScore: number;
    fraudRisk: 'low' | 'medium' | 'high';
    anomalies: string[];
    satelliteData?: {
      ndvi: number;
      landUse: string;
      verification: 'verified' | 'flagged';
    };
  };
}

export interface BankUser {
  name: string;
  role: 'underwriter' | 'manager' | 'admin';
  permissions: string[];
}

export function BankApp({ onBack }: BankAppProps) {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'queue' | 'review' | 'portfolio'>('login');
  const [user, setUser] = useState<BankUser | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch applications from API
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('bankToken');
      if (!token) {
        console.error('No bank token found');
        return;
      }

      // Import apiService dynamically
      const { apiService } = await import('../lib/api');
      const data = await apiService.getBankApplications(token);
      
      // Transform API data to match our interface
      const transformedApps: LoanApplication[] = data.map((app: any) => ({
        id: app.id.toString(),
        applicantName: app.applicant_name || app.user?.name || app.user?.phone || 'Unknown',
        businessName: app.business_name || 'Unknown Business',
        businessType: app.business_type || 'other',
        location: app.location || 'Unknown',
        amount: app.amount_requested || 0,
        purpose: app.loan_purpose || 'Loan application',
        greenScore: app.green_score || 0,
        interestRate: app.interest_rate || 14,
        term: app.loan_term || 12,
        status: app.status || 'pending',
        appliedDate: app.applied_date || app.created_at,
        ecoActions: app.eco_actions || [],
        riskAssessment: {
          creditScore: app.credit_score || 700,
          fraudRisk: app.fraud_risk_level || 'low' as const,
          anomalies: app.risk_factors || []
        }
      }));
      setApplications(transformedApps);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // Handle error appropriately - maybe show a toast notification
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications when user logs in and views queue
  useEffect(() => {
    if (user && currentView === 'queue') {
      fetchApplications();
    }
  }, [user, currentView]);

  const handleLogin = (userData: BankUser) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleViewQueue = () => {
    setCurrentView('queue');
  };

  const handleViewPortfolio = () => {
    setCurrentView('portfolio');
  };

  const handleReviewApplication = (application: LoanApplication) => {
    setSelectedApplication(application);
    setCurrentView('review');
  };

  const handleDecision = (decision: any) => {
    console.log('Loan decision:', decision);
    setCurrentView('queue');
    // Refresh applications after review
    fetchApplications();
  };

  const handleBackFromReview = () => {
    setSelectedApplication(null);
    setCurrentView('queue');
  };

  if (currentView === 'login') {
    return <BankLogin onLogin={handleLogin} onBack={onBack} />;
  }

  if (!user) {
    return <BankLogin onLogin={handleLogin} onBack={onBack} />;
  }

  if (currentView === 'dashboard') {
    return (
      <BankDashboard
        user={user}
        onViewQueue={handleViewQueue}
        onViewPortfolio={handleViewPortfolio}
        onLogout={() => {
          setUser(null);
          setCurrentView('login');
          localStorage.removeItem('bankToken');
          localStorage.removeItem('bankUser');
        }}
        onBack={onBack}
      />
    );
  }

  if (currentView === 'queue') {
    return (
      <ApplicationQueue
        applications={applications}
        onReviewApplication={handleReviewApplication}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'review' && selectedApplication) {
    return (
      <CaseReview
        application={selectedApplication}
        onDecision={handleDecision}
        onBack={handleBackFromReview}
      />
    );
  }

  if (currentView === 'portfolio') {
    return (
      <PortfolioDashboard
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return <BankLogin onLogin={handleLogin} onBack={onBack} />;
}