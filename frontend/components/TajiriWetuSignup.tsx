import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, CreditCard, Phone, Mail, ArrowLeft, CheckCircle2, Shield, X } from 'lucide-react';

interface TajiriWetuSignupProps {
  onSignup: (userData: any) => void;
  onBack: () => void;
  onNavigateToLogin: () => void;
}

export function TajiriWetuSignup({ onSignup, onBack, onNavigateToLogin }: TajiriWetuSignupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    notRobot: false,
    agreedToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate signup
    setTimeout(() => {
      onSignup({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        portal: 'client'
      });
      setLoading(false);
    }, 1500);
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.idNumber &&
      formData.phoneNumber &&
      formData.email &&
      formData.notRobot &&
      formData.agreedToTerms
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Tajiri Wetu</h2>
            <p className="text-gray-600">Create your account and start your financial journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-gray-700 font-medium mb-2 block">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* ID Number / Passport Number */}
            <div>
              <Label htmlFor="idNumber" className="text-gray-700 font-medium mb-2 block">
                ID Number / Passport Number
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="12345678 or A1234567"
                  value={formData.idNumber}
                  onChange={(e) => handleChange('idNumber', e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-gray-700 font-medium mb-2 block">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+254700000000"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10 py-6 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* I am not a robot */}
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.notRobot}
                    onChange={(e) => handleChange('notRobot', e.target.checked)}
                    className="w-6 h-6 rounded border-2 border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    required
                  />
                  {formData.notRobot && (
                    <CheckCircle2 className="absolute top-0 left-0 w-6 h-6 text-green-600 pointer-events-none" />
                  )}
                </div>
                <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                  I am not a robot
                </span>
              </label>
            </div>

            {/* Consent & Data Use Section */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Consent & Data Use</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    By creating an account, you agree to the collection and use of your personal data in line with Tajiri Circle's Privacy Policy. We are committed to protecting your information and using it solely to provide you with our financial services.
                  </p>
                </div>
              </div>
              
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                    className="w-6 h-6 rounded border-2 border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    required
                  />
                  {formData.agreedToTerms && (
                    <CheckCircle2 className="absolute top-0 left-0 w-6 h-6 text-green-600 pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyModal(true);
                    }}
                    className="text-red-600 hover:text-red-700 underline font-semibold"
                  >
                    Privacy Policy
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                    className="text-red-600 hover:text-red-700 underline font-semibold"
                  >
                    Terms of Service
                  </button>
                  .
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </Button>


            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 Your data is encrypted and secure
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Privacy Policy</h2>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h3>
                <p className="text-gray-700 mb-4">
                  We collect personal information including your name, ID/passport number, phone number, and email address when you create an account. We also collect transaction data, SMS messages (with your permission), and usage information to provide our services.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Your Information</h3>
                <p className="text-gray-700 mb-4">
                  Your data is used to provide financial tracking services, fraud detection, credit scoring, and personalized financial insights. We use AI to analyze your transaction patterns and provide recommendations.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Data Security</h3>
                <p className="text-gray-700 mb-4">
                  We employ bank-grade 256-bit encryption to protect your data. All sensitive information is encrypted both in transit and at rest. We regularly conduct security audits and comply with international data protection standards.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Data Sharing</h3>
                <p className="text-gray-700 mb-4">
                  We do not sell your personal data. We may share anonymized data with financial institutions for credit assessment purposes only with your explicit consent. We may also share data with regulatory authorities when legally required.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Your Rights</h3>
                <p className="text-gray-700 mb-4">
                  You have the right to access, correct, or delete your personal data at any time. You can export your data or request account deletion through your profile settings. You can also opt-out of SMS parsing and certain data collection features.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Contact Us</h3>
                <p className="text-gray-700">
                  For privacy concerns or questions, contact us at privacy@tajiricircle.com or call +254 700 000 000.
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200">
              <Button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Terms of Service</h2>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                <p className="text-gray-700 mb-4">
                  By creating an account and using Tajiri Circle services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Service Description</h3>
                <p className="text-gray-700 mb-4">
                  Tajiri Circle provides AI-powered financial tracking, fraud detection, credit scoring, and group savings (chama) services. We parse SMS messages to track income and expenses, provide financial insights, and help you build creditworthiness.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">3. User Responsibilities</h3>
                <p className="text-gray-700 mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration. You agree not to use the service for any illegal activities or to violate any applicable laws.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">4. SMS Permissions</h3>
                <p className="text-gray-700 mb-4">
                  By using our SMS parsing feature, you grant us permission to read and analyze your financial SMS messages (M-Pesa, bank notifications, etc.). This data is used solely to provide you with transaction tracking and financial insights.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Fees and Payments</h3>
                <p className="text-gray-700 mb-4">
                  Basic services are free. Premium features may require subscription fees. All fees will be clearly communicated before you subscribe. We reserve the right to modify pricing with 30 days notice.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Limitation of Liability</h3>
                <p className="text-gray-700 mb-4">
                  Tajiri Circle provides financial tracking and insights but does not provide financial advice. We are not liable for any financial decisions you make based on our services. Our fraud detection is not 100% accurate and should not be your only security measure.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">7. Termination</h3>
                <p className="text-gray-700 mb-4">
                  You may terminate your account at any time. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">8. Changes to Terms</h3>
                <p className="text-gray-700 mb-4">
                  We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">9. Contact Information</h3>
                <p className="text-gray-700">
                  For questions about these terms, contact us at legal@tajiricircle.com or call +254 700 000 000.
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200">
              <Button
                onClick={() => setShowTermsModal(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
