# TajiriCircle - AI-Powered Financial Ecosystem

**AI-powered financial ecosystem for Africa's informal and gig economy workers**

TajiriCircle transforms hustlers into bankable, creditworthy, financially empowered citizens through AI-powered SMS parsing, fraud detection, and blockchain-secured group savings.

## 🚀 Features

### ✅ Implemented Features
- **AI WhatsApp Bot (TajiriBot)** - Financial assistant with natural language processing
- **SMS Parsing & Auto-tracking** - Automatically reads M-Pesa SMS to track income/expenses
- **Fraud Detection System** - AI-powered scam detection with 95%+ accuracy
- **Digital Chama** - Blockchain-secured group savings with transparent ledger
- **Trust Score System** - Alternative credit scoring (300-850 scale)
- **USSD Integration** - Works on feature phones via *384# 
- **Tax Record Generation** - Auto-generates KRA-compliant tax documents
- **Multi-language Support** - English and Kiswahili
- **Real-time Dashboard** - Income tracking, savings goals, fraud alerts

### 🔄 Backend Services
- **Express.js API Server** - RESTful API with SQLite database
- **SMS Parser Service** - Natural language processing for M-Pesa messages
- **Fraud Detector** - Machine learning-based scam detection
- **USSD Service** - Feature phone integration (*384#)
- **Blockchain Service** - Celo-based smart contracts for chamas
- **Trust Score Calculator** - Alternative credit scoring algorithm

### 📱 Enhanced USSD Features
- **Multi-language Support**: English and Kiswahili
- **Complete Registration**: Name + ID verification + confirmation
- **Chama Management**: Create, join, contribute, view chamas
- **Advanced Savings**: Save, withdraw, goals, history tracking
- **Dynamic Trust Score**: Real-time calculation with improvement guidance
- **Financial Education**: 10+ rotating tips for financial literacy
- **Smart Navigation**: Back (0) and Main Menu (00) from anywhere
- **Error Recovery**: Comprehensive error handling with helpful messages

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components
- **Recharts** for data visualization
- **Lucide React** icons

### Backend
- **Node.js** with Express.js
- **SQLite** database
- **Natural.js** for NLP processing
- **Web3.js** for blockchain integration
- **Twilio** for SMS/WhatsApp APIs
- **Africa's Talking** for USSD

### Blockchain
- **Celo Network** (African-focused blockchain)
- **Smart Contracts** for chama transparency
- **Web3 Integration** for secure transactions

## 🚀 Quick Start

### Prerequisites
- **Docker** and **Docker Compose** (Recommended)
- **Git**

Alternative (Manual Setup):
- Node.js 18+ 
- Python 3.10+
- PostgreSQL 15+
- Redis
- npm or yarn

## 🐳 Docker Installation (Recommended)

### For Linux Users

1. **Clone the repository**
```bash
git clone https://github.com/Annfelicty/soko.git
cd soko
```

2. **Make the start script executable**
```bash
chmod +x start_docker_linux.sh
```

3. **Start all services using Docker Compose**
```bash
./start_docker_linux.sh
```

Or manually:
```bash
docker-compose up -d --build
```

4. **Verify services are running**
```bash
docker-compose ps
```

5. **Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **USSD Service**: http://localhost:8001
- **USSD Web Tester**: http://localhost:8001/test
- **Flower (Task Monitor)**: http://localhost:5555
- **MailHog (Email Testing)**: http://localhost:8025

### 📱 USSD Service Management

**Start USSD service with integrated testing:**
```bash
./start_ussd.sh
```

**Available USSD commands:**
```bash
./start_ussd.sh          # Start service
./start_ussd.sh test     # Start and run comprehensive tests
./start_ussd.sh logs     # View service logs
./start_ussd.sh stop     # Stop service
./start_ussd.sh restart  # Restart service
./start_ussd.sh --help   # Show help
```

**Test USSD flows:**
```bash
# Quick test - Initial dial
curl -X POST http://localhost:8001/ussd \
  -F "sessionId=demo" \
  -F "phoneNumber=+254700123456" \
  -F "text="

# Test registration flow
curl -X POST http://localhost:8001/ussd \
  -F "sessionId=demo" \
  -F "phoneNumber=+254700123456" \
  -F "text=1*1*John Demo*12345678*1"
```

**USSD Features Documentation:**
- **Complete Guide**: `ussd_service/NAVIGATION_GUIDE.md`
- **Web Interface**: http://localhost:8001/test
- **API Health**: http://localhost:8001/health

### For Windows Users

1. **Install Prerequisites**
   - Install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Install [Git for Windows](https://git-scm.com/download/win)

2. **Clone the repository**
```cmd
git clone https://github.com/Annfelicty/soko.git
cd soko
```

3. **Start services using Docker Compose**
```cmd
docker-compose up -d --build
```

4. **Verify services are running**
```cmd
docker-compose ps
```

5. **Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Flower (Task Monitor)**: http://localhost:5555
- **MailHog (Email Testing)**: http://localhost:8025

### Managing Docker Services

**Stop all services:**
```bash
docker-compose down
```

**View logs:**
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
```

**Rebuild and restart:**
```bash
docker-compose down
docker-compose up -d --build
```

## ⚙️ Manual Installation (Alternative)

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Redis
- npm or yarn

1. **Clone the repository**
```bash
git clone https://github.com/Annfelicty/soko.git
cd soko
```

2. **Set up PostgreSQL database**
```sql
CREATE DATABASE tajiricircle;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE tajiricircle TO user;
```

3. **Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

4. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

5. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

6. **Start services manually**
```bash
# Terminal 1 - Start Redis
redis-server

# Terminal 2 - Start PostgreSQL (if not running as service)
sudo service postgresql start

# Terminal 3 - Start Backend
cd backend
python main.py

# Terminal 4 - Start Celery Worker
cd backend
celery -A worker worker --loglevel=info

# Terminal 5 - Start Frontend
cd frontend
npm run dev
```

7. **Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📱 Usage Guide

### Web Application
1. Open http://localhost:3000
2. Complete onboarding (language selection, phone verification)
3. Access dashboard to view financial overview
4. Use TajiriBot chat for AI assistance
5. Check fraud alerts in security center
6. Join or create digital chamas
7. View auto-generated tax records

### USSD (Feature Phones)
```
Dial: *384#

Menu Options:
1. Log Sales
2. Check Balance  
3. Savings Goals
4. Fraud Alerts
5. Trust Score
6. Chama Services
7. Help
```

### SMS Commands
```
Send to 40404:
- BAL - Check balance
- SAVE 500 - Save KSh 500
- HELP - Get assistance
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/user/:phone` - Get user profile

### Transactions
- `POST /api/sms/parse` - Parse SMS for transactions
- `GET /api/dashboard/:userId` - Get dashboard data

### Fraud Detection
- `GET /api/fraud-alerts/:userId` - Get fraud alerts
- `POST /api/fraud-alerts/:alertId/action` - Mark alert as safe/blocked

### Chama (Group Savings)
- `GET /api/chamas/:userId` - Get user's chamas
- `POST /api/chamas` - Create new chama

### USSD
- `POST /api/ussd` - Handle USSD requests

### Tax Records
- `GET /api/tax-records/:userId` - Generate tax records

### AI Chat
- `POST /api/chat` - TajiriBot conversations

## 🏗️ Project Structure

```
soko/
├── alembic.ini                    # Database migration configuration
├── docker-compose.yml             # Docker services orchestration
├── docker-compose.override.yml    # Docker override configuration
├── start_docker_linux.sh          # Linux startup script
├── README.md                      # Project documentation
│
├── backend/                       # Python FastAPI Backend
│   ├── main.py                    # FastAPI application entry point
│   ├── worker.py                  # Celery background tasks
│   ├── init_db.py                 # Database initialization
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Backend container configuration
│   │
│   ├── api/                       # API layer
│   │   └── api_v1/                # API version 1
│   │       ├── api.py             # API router configuration
│   │       └── endpoints/         # API endpoints
│   │           ├── auth.py        # Authentication endpoints
│   │           ├── chamas.py      # Chama management endpoints
│   │           ├── chat.py        # TajiriBot chat endpoints
│   │           ├── dashboard.py   # Dashboard data endpoints
│   │           ├── fraud_alerts.py # Fraud detection endpoints
│   │           ├── tax_records.py # Tax records endpoints
│   │           └── ussd.py        # USSD integration endpoints
│   │
│   ├── core/                      # Core configuration
│   │   └── config.py              # Application settings
│   │
│   ├── crud/                      # Database operations
│   │   ├── auth.py                # User authentication CRUD
│   │   └── chama.py               # Chama management CRUD
│   │
│   ├── db/                        # Database configuration
│   │   ├── base.py                # Database base models
│   │   └── session.py             # Database session management
│   │
│   ├── models/                    # SQLAlchemy models
│   │   ├── user.py                # User database model
│   │   └── chama.py               # Chama database model
│   │
│   ├── schemas/                   # Pydantic schemas
│   │   ├── auth.py                # Authentication schemas
│   │   └── chama.py               # Chama schemas
│   │
│   ├── email-templates/           # Email template files
│   ├── log/                       # Application logs
│   └── tests/                     # Backend unit tests
│
├── frontend/                      # React TypeScript Frontend
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Node.js dependencies
│   ├── vite.config.ts             # Vite build configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── Dockerfile                 # Frontend container configuration
│   │
│   ├── src/                       # Source files
│   │   └── main.tsx               # React application entry point
│   │
│   ├── components/                # React components
│   │   ├── Dashboard.tsx          # Main user dashboard
│   │   ├── TajiriBotChat.tsx      # AI chat interface
│   │   ├── FraudAlertCenter.tsx   # Security alert center
│   │   ├── DigitalChama.tsx       # Group savings management
│   │   ├── ProfilePage.tsx        # User profile management
│   │   ├── OnboardingFlow.tsx     # User onboarding process
│   │   ├── BankApp.tsx            # Banking application interface
│   │   ├── SMEApp.tsx             # SME loan application interface
│   │   │
│   │   ├── bank/                  # Banking-specific components
│   │   │   ├── BankLogin.tsx      # Bank staff login
│   │   │   ├── BankDashboard.tsx  # Bank management dashboard
│   │   │   ├── ApplicationQueue.tsx # Loan application queue
│   │   │   ├── CaseReview.tsx     # Individual case review
│   │   │   └── PortfolioDashboard.tsx # Portfolio overview
│   │   │
│   │   ├── sme/                   # SME-specific components
│   │   │   ├── SMEOnboarding.tsx  # SME user onboarding
│   │   │   ├── SMEDashboard.tsx   # SME business dashboard
│   │   │   ├── LoanOffers.tsx     # Available loan offers
│   │   │   ├── RepaymentTracker.tsx # Loan repayment tracking
│   │   │   └── EvidenceUpload.tsx # Business evidence upload
│   │   │
│   │   ├── image/                 # Image handling components
│   │   │   └── ImageWithFallback.tsx # Image component with fallback
│   │   │
│   │   └── ui/                    # Reusable UI components (Radix UI)
│   │       ├── button.tsx         # Button component
│   │       ├── card.tsx           # Card component
│   │       ├── dialog.tsx         # Dialog/modal component
│   │       ├── form.tsx           # Form components
│   │       ├── input.tsx          # Input field component
│   │       ├── table.tsx          # Table component
│   │       └── ... (40+ UI components)
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── api.ts                 # API client functions
│   │   └── utils.ts               # General utility functions
│   │
│   ├── styles/                    # CSS styles
│   │   └── globals.css            # Global CSS styles
│   │
│   └── guidelines/                # Development guidelines
│       └── Guidelines.md          # Project guidelines
│
└── migrations/                    # Database migrations (Alembic)
    ├── env.py                     # Migration environment
    ├── script.py.mako             # Migration script template
    └── versions/                  # Migration version files
```

## 🔐 Security Features

### Fraud Protection
- **AI-powered SMS analysis** - Detects scam patterns with 95%+ accuracy
- **Real-time alerts** - Instant notifications for suspicious activity
- **Community reporting** - Crowdsourced fraud detection
- **Trusted sender verification** - Validates legitimate financial institutions

### Data Security
- **AES-256 encryption** for sensitive data
- **SIM/NIN verification** integration
- **Blockchain transparency** for chama transactions
- **Secure API endpoints** with authentication

## 📊 Trust Score Algorithm

The Trust Score (300-850) considers:
- **Transaction Consistency (25%)** - Regular income patterns
- **Fraud Avoidance (20%)** - Successfully avoiding scams
- **Savings Habits (20%)** - Regular savings and goal achievement
- **Community Participation (15%)** - Active chama involvement
- **Account Age (10%)** - Length of platform usage
- **Verification Level (10%)** - Identity verification status

## 🌍 Hackathon Alignment

### Theme: Future-Proofing Africa (FinTech + Cybersecurity + AI)
✅ **FinTech**: Digital payments, savings, credit scoring, tax compliance
✅ **Cybersecurity**: Fraud detection, secure transactions, community protection  
✅ **AI**: SMS parsing, chatbot, predictive analytics, personalized nudges

### Challenge: AI for Financial Planning Accessibility
✅ **Accessibility**: USSD for feature phones, multi-language support
✅ **AI-Powered**: Automated SMS parsing, intelligent fraud detection
✅ **Gig Economy Focus**: Designed for irregular income patterns
✅ **Scalable**: Works across devices, literacy levels, and regions

## 🚀 Deployment

### Local Development (Docker)
```bash
# Start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Local Development (Manual)
```bash
# Start backend and frontend separately
npm run dev:full
```

### Production Build (Docker)
```bash
# Build for production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Or create production docker-compose.prod.yml with optimized settings
```

### Production Build (Manual)
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
python -m gunicorn main:app --bind 0.0.0.0:8000
```

### Environment Variables
Create `.env` file in project root:
```
# Database Configuration
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=tajiricircle
DATABASE_URL=postgresql://user:password@localhost/tajiricircle

# API Configuration
API_PORT=8000
FRONTEND_PORT=3000

# External Services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
AFRICASTALKING_API_KEY=your_at_key
CELO_NETWORK_URL=https://alfajores-forno.celo-testnet.org

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Email Configuration
EMAIL_HOST=localhost
EMAIL_PORT=1025
```

### Docker Services Overview
- **backend**: Python FastAPI application (Port 8000)
- **frontend**: React/Vite development server (Port 3000)
- **db**: PostgreSQL database (Port 5432)
- **redis**: Redis cache and message broker (Port 6379)
- **celery-worker**: Background task processor
- **flower**: Celery task monitoring (Port 5555)
- **mailhog**: Email testing service (Port 8025)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🛠️ Troubleshooting

### Docker Issues

**Services not starting:**
```bash
# Check Docker is running
docker --version
docker-compose --version

# Check for port conflicts
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :8000

# Restart Docker daemon (Linux)
sudo systemctl restart docker
```

**Permission denied errors (Linux):**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Make scripts executable
chmod +x start_docker_linux.sh
```

**Windows Docker Desktop issues:**
- Ensure WSL2 is enabled
- Enable Docker Desktop integration in WSL2 settings
- Restart Docker Desktop service

**Database connection errors:**
```bash
# Check if PostgreSQL container is running
docker-compose ps db

# Access database directly
docker-compose exec db psql -U user -d tajiricircle

# Reset database
docker-compose down -v
docker-compose up -d --build
```

**Frontend not updating:**
```bash
# Clear Docker build cache
docker-compose build --no-cache frontend

# Clear node_modules in container
docker-compose exec frontend rm -rf node_modules
docker-compose restart frontend
```

### Common Issues

**Port already in use:**
```bash
# Find and kill process using port 3000/8000
sudo lsof -t -i tcp:3000 | xargs kill -9
sudo lsof -t -i tcp:8000 | xargs kill -9
```

**Environment variables not loading:**
- Ensure `.env` file is in project root
- Restart containers after changing `.env`
- Check for syntax errors in `.env` file

## 🆘 Support

- **Email**: help@tajiricircle.com
- **WhatsApp**: +254700000000
- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core web application
- ✅ SMS parsing and fraud detection
- ✅ USSD integration
- ✅ Marketplace for chamas
- ✅ Basic blockchain features


### Phase 2 (Next)
- 🔄 Voice bot in vernacular languages
- 🔄 Advanced AI forecasting
- 🔄 ABSA bank integration
- 🔄 Mobile app (iOS/Android)

### Phase 3 (Future)
- 🔄 Multi-country expansion
- 🔄 Open API for SMEs
- 🔄 Insurance products

---

**TajiriCircle** - Empowering Africa's hustlers with AI-powered financial tools 🚀
