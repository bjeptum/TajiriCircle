import { useState } from 'react';
import { Button } from './ui/button';
import { Globe, Mail, Phone, Building2, Users, ArrowRight } from 'lucide-react';

interface MainLandingPageProps {
  onNavigate: (destination: 'tajiri-signup' | 'tajiri-login' | 'bank-login') => void;
}

export function MainLandingPage({ onNavigate }: MainLandingPageProps) {
  const [selectedCountry, setSelectedCountry] = useState('KE');

  const countries = [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Top Red Banner */}
      <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-red-600">TC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Tajiri Circle</h1>
                <p className="text-xs text-red-100">Empowering Africa's Future</p>
              </div>
            </div>

            {/* Top Right Navigation */}
            <div className="flex items-center space-x-6">
              {/* About Us */}
              <button className="hidden md:flex items-center space-x-2 text-white hover:text-red-100 transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">About Us</span>
              </button>

              {/* Contact Us */}
              <button className="hidden md:flex items-center space-x-2 text-white hover:text-red-100 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Contact Us</span>
              </button>

              {/* Country Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg transition-all">
                  <Globe className="w-4 h-4 text-white" />
                  <span className="text-lg">{countries.find(c => c.code === selectedCountry)?.flag}</span>
                  <span className="text-sm font-medium text-white hidden sm:inline">
                    {countries.find(c => c.code === selectedCountry)?.name}
                  </span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountry(country.code)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Split Page Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-200px)]">
          {/* Left Side - Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-amber-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop"
                alt="Financial Empowerment"
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23A51C30" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3ETajiri Circle%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Build Your Financial Future</h2>
                <p className="text-lg text-white/90">
                  Join thousands of Africans transforming their financial lives with AI-powered tools
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Action Cards */}
          <div className="space-y-6">
            {/* Tajiri Wetu Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Tajiri Wetu</h3>
                  <p className="text-sm text-gray-600">Personal Financial Platform</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Track your income, save smartly, join digital chamas, and build your credit score with AI-powered insights.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => onNavigate('tajiri-signup')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => onNavigate('tajiri-login')}
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-6 rounded-xl transition-all duration-300"
                >
                  Log In
                </Button>
              </div>
            </div>

            {/* Bank Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border-2 border-gray-700 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Bank Portal</h3>
                  <p className="text-sm text-gray-400">Financial Institution Access</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                Access comprehensive analytics, manage loan applications, and monitor portfolio performance.
              </p>

              <Button
                onClick={() => onNavigate('bank-login')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Building2 className="w-5 h-5 mr-2" />
                <span>Bank Log In</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">50K+</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">95%</div>
                <div className="text-xs text-gray-600">Fraud Detection</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">4.8★</div>
                <div className="text-xs text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold mb-2">Contact</h4>
              <p className="text-sm text-gray-400">help@tajiricircle.com</p>
              <p className="text-sm text-gray-400">+254 700 000 000</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Quick Links</h4>
              <p className="text-sm text-gray-400">Privacy Policy</p>
              <p className="text-sm text-gray-400">Terms of Service</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Follow Us</h4>
              <p className="text-sm text-gray-400">Twitter | Facebook | LinkedIn</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">© 2024 Tajiri Circle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
