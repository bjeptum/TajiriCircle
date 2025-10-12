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
      if (!token) return;

      const response = await fetch('/api/bank/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Transform API data to match our interface
        const transformedApps: LoanApplication[] = data.map((app: any) => ({
          id: app.id.toString(),
          applicantName: app.applicant_name,
          businessName: app.business_name,
          businessType: app.business_type || 'other',
          location: app.location || 'Unknown',
          amount: app.amount_requested,
          purpose: 'Loan application',
          greenScore: app.green_score,
          interestRate: 14,
          term: 12,
          status: app.status,
          appliedDate: app.applied_date,
          ecoActions: [],
          riskAssessment: {
            creditScore: 700,
            fraudRisk: 'low' as const,
            anomalies: []
          }
        }));
        setApplications(transformedApps);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
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