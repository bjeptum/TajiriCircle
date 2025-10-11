"""
USSD Menu System for TajiriCircle
Complete menu navigation with English and Swahili support
"""
from typing import Dict, Any, Tuple
from enum import Enum
import json

class MenuState(Enum):
    """USSD Menu States"""
    REGISTRATION = "registration"
    COLLECT_NAME = "collect_name"
    COLLECT_ID = "collect_id"
    CONFIRM_REGISTRATION = "confirm_registration"
    MAIN_MENU = "main_menu"
    CHAMA_SERVICES = "chama_services"
    JOIN_CHAMA = "join_chama"
    CREATE_CHAMA = "create_chama"
    CREATE_CHAMA_MEMBERS = "create_chama_members"
    CREATE_CHAMA_AMOUNT = "create_chama_amount"
    VIEW_CHAMA = "view_chama"
    CHAMA_DETAILS = "chama_details"
    MAKE_CONTRIBUTION = "make_contribution"
    CONTRIBUTION_AMOUNT = "contribution_amount"
    TRUST_SCORE = "trust_score"
    TRUST_SCORE_DETAILS = "trust_score_details"
    SAVINGS = "savings"
    CHECK_BALANCE = "check_balance"
    ADD_SAVINGS = "add_savings"
    SAVINGS_CONFIRM = "savings_confirm"
    SAVINGS_GOALS = "savings_goals"
    WITHDRAW_SAVINGS = "withdraw_savings"
    WITHDRAW_AMOUNT = "withdraw_amount"
    SAVINGS_HISTORY = "savings_history"
    FINANCIAL_TIPS = "financial_tips"
    HELP = "help"
    LANGUAGE_SELECT = "language_select"

class USSDMessages:
    """Multilingual USSD Messages"""
    
    MESSAGES = {
        "en": {
            # Registration
            "welcome": "🩶 Welcome to TajiriCircle!\n\"Banking the Hustle\"\n\nChoose language:\n1. English\n2. Kiswahili\n0. Exit",
            "welcome_user": "🩶 Welcome to TajiriCircle!\n\"Banking the Hustle\"\n\nDo you want to join?\n1. Yes\n2. No\n0. Exit",
            "collect_name": "📝 Enter your full name:\n(e.g., John Doe)\n\n0. Back",
            "collect_id": "📝 Enter your National ID or phone:\n(e.g., 12345678 or 0701234567)\n\n0. Back",
            "confirm_registration": "✅ Confirm registration?\n\nName: {name}\nID: {id_number}\n\n1. Yes - Register\n2. No - Edit details\n0. Back",
            "registration_success": "🎉 Registration successful!\nWelcome to TajiriCircle, {name}!\n\n✅ Profile created\n✅ Wallet activated\n\nPress any key to continue...",
            
            # Main Menu
            "main_menu": "🏠 TajiriCircle Main Menu\n\"Banking the Hustle\"\n\n1️⃣ Join TajiriCircle\n2️⃣ My Chamas\n3️⃣ My Savings\n4️⃣ My Trust Score\n5️⃣ Financial Tips\n6️⃣ Help\n0️⃣ Exit",
            "main_menu_registered": "🏠 Welcome back, {name}!\n\"Banking the Hustle\"\n\n1️⃣ My Chamas\n2️⃣ My Savings\n3️⃣ My Trust Score\n4️⃣ Financial Tips\n5️⃣ Help\n0️⃣ Exit",
            
            # Chama Services
            "chama_menu": "🤝 My Chamas\n\n1️⃣ Create a Chama\n2️⃣ View My Chamas\n3️⃣ Contribute to Chama\n4️⃣ Join a Chama\n0️⃣ Back to Main Menu",
            "join_chama": "📝 Join a Chama\n\nEnter Chama invitation code:\n(Format: TC1234)\n\nExample: TC5678\n\n0. Back",
            "create_chama": "🆕 Create New Chama\n\nEnter Chama name:\n(e.g., Hustlers United)\n\n0. Back",
            "create_chama_members": "👥 How many members?\n\nEnter number of members:\n(Minimum: 3, Maximum: 50)\n\nExample: 10\n\n0. Back",
            "create_chama_amount": "💰 Set contribution amount (KES):\n\nEnter monthly contribution:\n(Minimum: KES 100)\n\nExample: 1000\n\n0. Back",
            "chama_created": "🎉 Chama Created Successfully!\n\nName: {name}\nMembers: {members}\nContribution: KES {amount}\nInvite Code: {code}\n\n📱 Share code with members!\n\n0. Back",
            "view_chamas": "👥 My Chamas:\n\n1. Hustlers United\n   Members: 12/15 | Savings: KES 145,000\n   Your contribution: KES 1,200 due\n\n2. Mama Mboga Network\n   Members: 8/10 | Savings: KES 67,500\n   Your contribution: Current\n\n0. Back",
            "no_chamas": "🤝 No Chamas Yet\n\nStart building your financial network:\n\n1. Create a Chama\n2. Join existing Chama\n\n0. Back",
            "make_contribution": "💰 Contribute to Chama\n\nSelect Chama:\n1. Hustlers United - KES 1,200 due\n2. Mama Mboga - Current (KES 800)\n\n0. Back",
            "contribution_amount": "💵 Contribute to {chama}\n\nMonthly amount: KES {amount}\nYour status: {status}\n\nEnter amount to contribute:\n(Min: KES 50)\n\n0. Back",
            "contribution_success": "✅ Contribution Successful!\n\nAmount: KES {amount}\nChama: {chama}\nNew balance: KES {balance}\n\n📈 Trust score increased!\n\n0. Back",
            
            # Trust Score
            "trust_score": "⭐ Your Trust Score: {score}/100\n{rating}\n\n💡 {message}\n\nTop factors:\n✅ {factor1}\n✅ {factor2}\n📈 {improvement}\n\n1. Learn more\n0. Back",
            "trust_score_details": "📊 Trust Score Breakdown\n\nCurrent Score: {score}/100\n\n📈 Score Components:\n• Savings Consistency: {savings}%\n• Chama Participation: {chama}%\n• Payment History: {payment}%\n• Financial Literacy: {literacy}%\n\n🎯 Next Steps:\n{next_steps}\n\n0. Back",
            "trust_score_excellent": "Excellent! 🌟",
            "trust_score_good": "Good Progress 👍",
            "trust_score_fair": "Building Trust 📈",
            "trust_score_poor": "Getting Started 🚀",
            
            # Savings
            "savings_menu": "💳 My Savings\n\n1️⃣ Save Money\n2️⃣ View Balance\n3️⃣ Withdraw\n4️⃣ My Saving History\n5️⃣ Savings Goals\n0️⃣ Back to Main Menu",
            "check_balance": "💰 Account Summary\n\nPersonal Savings: KES {personal_savings:,}\nChama Contributions: KES {chama_savings:,}\nTotal Balance: KES {total_balance:,}\n\nLast transaction:\n{last_transaction}\n\n0. Back",
            "add_savings": "💵 Save Money\n\nEnter amount to save (KES):\n(Minimum: KES 50)\n\nCurrent balance: KES {balance:,}\nExample: 500\n\n0. Back",
            "savings_confirm": "💰 Confirm Savings\n\nAmount: KES {amount:,}\nNew balance: KES {new_balance:,}\n\n1. Confirm via M-Pesa\n2. Confirm via Bank\n3. Edit amount\n0. Back",
            "savings_success": "✅ Savings Added!\n\nAmount saved: KES {amount:,}\nNew balance: KES {balance:,}\n\n📈 Trust score +{points} points!\n🏆 Keep saving consistently!\n\n0. Back",
            "withdraw_savings": "� Withdraw Savings\n\nAvailable: KES {available:,}\n\nEnter amount to withdraw:\n(Min: KES 100, Max: KES {max_withdraw:,})\n\n0. Back",
            "withdraw_confirm": "💸 Confirm Withdrawal\n\nAmount: KES {amount:,}\nFee: KES {fee}\nYou receive: KES {net_amount:,}\n\n1. Confirm\n2. Change amount\n0. Back",
            "savings_goals": "🎯 Savings Goals\n\n📈 Emergency Fund (Priority)\nProgress: KES {emergency_current:,} / {emergency_target:,}\nProgress: {emergency_percent}%\n\n🏠 House Deposit\nProgress: KES {house_current:,} / {house_target:,}\nProgress: {house_percent}%\n\n1. Set new goal\n0. Back",
            "savings_history": "📜 Savings History\n\n{history_entries}\n\n1. View more\n0. Back",
            
            # Financial Tips
            "financial_tips": "💡 Smart Hustler Tips\n\n{tip_content}\n\n1️⃣ Next tip\n2️⃣ Previous tip\n3️⃣ Tip categories\n0️⃣ Back",
            "tip_categories": "📚 Tip Categories\n\n1. Savings Strategies\n2. Chama Management\n3. Business Growth\n4. Credit Building\n5. Investment Basics\n\n0. Back",
            
            # Help
            "help": "ℹ️ TajiriCircle Help\n\"Banking the Hustle\"\n\n📞 Customer Support:\n• Call: 0700-TAJIRI (825474)\n• SMS: Send HELP to 40404\n• WhatsApp: +254700825474\n• Web: www.tajiricircle.com\n\n🕐 Available 24/7\n\n1. FAQs\n0. Back",
            "faqs": "❓ Frequently Asked Questions\n\n1. How to join a Chama?\n2. How Trust Score works?\n3. Withdrawal limits?\n4. Security & Privacy?\n5. Contact support?\n\n0. Back",
            
            # Common
            "exit": "🩶 Thank you for Banking the Hustle!\n\n\"From Invisible to Investable\"\nTajiriCircle - Transforming Africa's Financial Future\n\n🚀 Your hustle is now bankable\n💰 Your savings build trust\n🤝 Your chama creates credit history\n📈 Your data unlocks opportunities\n⭐ Your trust score opens doors\n\n🌍 Join 50M+ hustlers building financial freedom\n📱 Ready when you are: *384#\n\n🩶 Keep Banking the Hustle!",
            "invalid": "❌ Invalid option. Please try again.\n\nEnter a valid choice or:\n0. Back to previous menu\n00. Main menu",
            "invalid_with_back": "❌ Invalid input: '{input}'\n\nPlease enter a valid option or:\n0. Back\n00. Main Menu",
            "error": "⚠️ Service temporarily unavailable.\nPlease try again in a few minutes.\n\n0. Back",
            "processing": "⏳ Processing your request...",
            "back_to_main": "🏠 Returning to Main Menu...",
        },
        
        "sw": {
            # Registration (Swahili)
            "welcome": "🩶 Karibu TajiriCircle!\n\"Banking the Hustle\"\n\nChagua lugha:\n1. English\n2. Kiswahili\n0. Toka",
            "welcome_user": "🩶 Karibu TajiriCircle!\n\"Banking the Hustle\"\n\nUnataka kujiunga?\n1. Ndiyo\n2. Hapana\n0. Toka",
            "collect_name": "📝 Ingiza jina lako kamili:\n(k.m., John Doe)\n\n0. Rudi",
            "collect_id": "📝 Ingiza Kitambulisho cha Taifa au simu:\n(k.m., 12345678 au 0701234567)\n\n0. Rudi",
            "confirm_registration": "✅ Thibitisha usajili?\n\nJina: {name}\nKitambulisho: {id_number}\n\n1. Ndiyo - Jisajili\n2. Hapana - Hariri maelezo\n0. Rudi",
            "registration_success": "🎉 Usajili umefanikiwa!\nKaribu TajiriCircle, {name}!\n\n✅ Wasifu umeundwa\n✅ Pochi imeamilishwa\n\nBonyeza kitufe chochote kuendelea...",
            
            # Main Menu (Swahili)
            "main_menu": "🏠 Menyu Kuu ya TajiriCircle\n\"Banking the Hustle\"\n\n1️⃣ Jiunge na TajiriCircle\n2️⃣ Chama Zangu\n3️⃣ Akiba Zangu\n4️⃣ Alama ya Uaminifu\n5️⃣ Mipango ya Kifedha\n6️⃣ Msaada\n0️⃣ Toka",
            "main_menu_registered": "🏠 Karibu tena, {name}!\n\"Banking the Hustle\"\n\n1️⃣ Chama Zangu\n2️⃣ Akiba Zangu\n3️⃣ Alama ya Uaminifu\n4️⃣ Mipango ya Kifedha\n5️⃣ Msaada\n0️⃣ Toka",
            
            # Chama Services (Swahili)
            "chama_menu": "🤝 Chama Zangu\n\n1️⃣ Unda Chama\n2️⃣ Angalia Chama Zangu\n3️⃣ Changia Chama\n4️⃣ Jiunge na Chama\n0️⃣ Rudi Menyu Kuu",
            "join_chama": "📝 Jiunge na Chama\n\nIngiza msimbo wa mwaliko:\n(Muundo: TC1234)\n\nMfano: TC5678\n\n0. Rudi",
            "create_chama": "🆕 Unda Chama Mpya\n\nIngiza jina la chama:\n(k.m., Hustlers United)\n\n0. Rudi",
            "create_chama_members": "👥 Wanachama wangapi?\n\nIngiza idadi ya wanachama:\n(Kiwango cha chini: 3, Juu: 50)\n\nMfano: 10\n\n0. Rudi",
            "create_chama_amount": "💰 Weka kiasi cha mchango (KES):\n\nIngiza mchango wa kila mwezi:\n(Kiwango cha chini: KES 100)\n\nMfano: 1000\n\n0. Rudi",
            "chama_created": "🎉 Chama Limeundwa!\n\nJina: {name}\nWanachama: {members}\nMchango: KES {amount}\nMsimbo: {code}\n\n📱 Shiriki msimbo na wanachama!\n\n0. Rudi",
            "view_chamas": "👥 Chama Zangu:\n\n1. Hustlers United\n   Wanachama: 12/15 | Akiba: KES 145,000\n   Mchango wako: KES 1,200 unahitajika\n\n2. Mtandao wa Mama Mboga\n   Wanachama: 8/10 | Akiba: KES 67,500\n   Mchango wako: Sasa hivi\n\n0. Rudi",
            "no_chamas": "🤝 Hakuna Chama Bado\n\nAnza kujenga mtandao wako wa kifedha:\n\n1. Unda Chama\n2. Jiunge na Chama\n\n0. Rudi",
            "make_contribution": "💰 Changia Chama\n\nChagua Chama:\n1. Hustlers United - KES 1,200 inahitajika\n2. Mama Mboga - Sasa hivi (KES 800)\n\n0. Rudi",
            "contribution_amount": "💵 Changia {chama}\n\nKiasi cha mwezi: KES {amount}\nHali yako: {status}\n\nIngiza kiasi cha kuchangia:\n(Kiwango cha chini: KES 50)\n\n0. Rudi",
            "contribution_success": "✅ Mchango Umefanikiwa!\n\nKiasi: KES {amount}\nChama: {chama}\nSalio jipya: KES {balance}\n\n📈 Alama ya uaminifu imeongezeka!\n\n0. Rudi",
            
            # Trust Score (Swahili)
            "trust_score": "⭐ Alama Yako ya Uaminifu: {score}/100\n{rating}\n\n💡 {message}\n\nSababu kuu:\n✅ {factor1}\n✅ {factor2}\n📈 {improvement}\n\n1. Jifunze zaidi\n0. Rudi",
            "trust_score_details": "📊 Maelezo ya Alama ya Uaminifu\n\nAlama ya Sasa: {score}/100\n\n📈 Vipengele vya Alama:\n• Uthabiti wa Akiba: {savings}%\n• Ushiriki wa Chama: {chama}%\n• Historia ya Malipo: {payment}%\n• Elimu ya Kifedha: {literacy}%\n\n🎯 Hatua za Baadaye:\n{next_steps}\n\n0. Rudi",
            "trust_score_excellent": "Bora Sana! 🌟",
            "trust_score_good": "Maendeleo Mazuri 👍",
            "trust_score_fair": "Kujenga Uaminifu 📈",
            "trust_score_poor": "Kuanza Safari 🚀",
            
            # Savings (Swahili)
            "savings_menu": "💳 Akiba Zangu\n\n1️⃣ Hifadhi Fedha\n2️⃣ Angalia Salio\n3️⃣ Toa Fedha\n4️⃣ Historia ya Akiba\n5️⃣ Malengo ya Akiba\n0️⃣ Rudi Menyu Kuu",
            "check_balance": "💰 Muhtasari wa Akaunti\n\nAkiba za Kibinafsi: KES {personal_savings:,}\nMichango ya Chama: KES {chama_savings:,}\nJumla ya Salio: KES {total_balance:,}\n\nMuamala wa mwisho:\n{last_transaction}\n\n0. Rudi",
            "add_savings": "💵 Hifadhi Fedha\n\nIngiza kiasi cha kuhifadhi (KES):\n(Kiwango cha chini: KES 50)\n\nSalio la sasa: KES {balance:,}\nMfano: 500\n\n0. Rudi",
            "savings_confirm": "💰 Thibitisha Akiba\n\nKiasi: KES {amount:,}\nSalio jipya: KES {new_balance:,}\n\n1. Thibitisha kwa M-Pesa\n2. Thibitisha kwa Benki\n3. Hariri kiasi\n0. Rudi",
            "savings_success": "✅ Akiba Zimeongezwa!\n\nKiasi kilichohifadhiwa: KES {amount:,}\nSalio jipya: KES {balance:,}\n\n📈 Alama ya uaminifu +{points} pointi!\n🏆 Endelea kuhifadhi kwa uthabiti!\n\n0. Rudi",
            "withdraw_savings": "� Toa Akiba\n\nInapatikana: KES {available:,}\n\nIngiza kiasi cha kutoa:\n(Kiwango cha chini: KES 100, Juu: KES {max_withdraw:,})\n\n0. Rudi",
            "withdraw_confirm": "💸 Thibitisha Kutoa\n\nKiasi: KES {amount:,}\nAda: KES {fee}\nUtapokea: KES {net_amount:,}\n\n1. Thibitisha\n2. Badilisha kiasi\n0. Rudi",
            "savings_goals": "🎯 Malengo ya Akiba\n\n📈 Fedha za Dharura (Kipaumbele)\nMaendeleo: KES {emergency_current:,} / {emergency_target:,}\nMaendeleo: {emergency_percent}%\n\n🏠 Amana ya Nyumba\nMaendeleo: KES {house_current:,} / {house_target:,}\nMaendeleo: {house_percent}%\n\n1. Weka lengo jipya\n0. Rudi",
            "savings_history": "📜 Historia ya Akiba\n\n{history_entries}\n\n1. Angalia zaidi\n0. Rudi",
            
            # Financial Tips (Swahili)
            "financial_tips": "💡 Mipango ya Kifedha\n\n{tip_content}\n\n1️⃣ Shauri lijalo\n2️⃣ Shauri la awali\n3️⃣ Aina za mashauri\n0️⃣ Rudi",
            "tip_categories": "📚 Aina za Mashauri\n\n1. Mikakati ya Akiba\n2. Usimamizi wa Chama\n3. Ukuaji wa Biashara\n4. Kujenga Mkopo\n5. Misingi ya Uwekezaji\n\n0. Rudi",
            
            # Help (Swahili)
            "help": "ℹ️ Msaada wa TajiriCircle\n\"Banking the Hustle\"\n\n📞 Huduma kwa Wateja:\n• Piga: 0700-TAJIRI (825474)\n• SMS: Tuma MSAADA kwa 40404\n• WhatsApp: +254700825474\n• Wavuti: www.tajiricircle.com\n\n🕐 Inapatikana 24/7\n\n1. Maswali ya Mara kwa Mara\n0. Rudi",
            "faqs": "❓ Maswali ya Mara kwa Mara\n\n1. Jinsi ya kujiunga na Chama?\n2. Jinsi alama ya uaminifu inavyofanya kazi?\n3. Kikomo cha kutoa fedha?\n4. Usalama na Faragha?\n5. Wasiliana na msaada?\n\n0. Rudi",
            
            # Common (Swahili)
            "exit": "🩶 Asante kwa Banking the Hustle!\n\n\"Kutoka Invisible hadi Investable\"\nTajiriCircle - Kubadilisha Mustakbal wa Kifedha wa Afrika\n\n🚀 Bidii yako sasa ni ya kibenki\n💰 Akiba yako hujenga uaminifu\n🤝 Chama yako huunda historia ya mkopo\n📈 Data yako hufungua fursa\n⭐ Alama yako ya uaminifu hufungua milango\n\n🌍 Jiunge na wafanyakazi 50M+ wanaojenga uhuru wa kifedha\n📱 Uko tayari: *384#\n\n🩶 Endelea Banking the Hustle!",
            "invalid": "❌ Chaguo si sahihi. Jaribu tena.\n\nIngiza chaguo sahihi au:\n0. Rudi menyu iliyotangulia\n00. Menyu kuu",
            "invalid_with_back": "❌ Ingizo si sahihi: '{input}'\n\nTafadhali ingiza chaguo sahihi au:\n0. Rudi\n00. Menyu Kuu",
            "error": "⚠️ Huduma haipatikani kwa muda.\nTafadhali jaribu tena baada ya dakika chache.\n\n0. Rudi",
            "processing": "⏳ Tunachakata ombi lako...",
            "back_to_main": "🏠 Kurudi Menyu Kuu...",
        }
    }
    
    @classmethod
    def get_message(cls, key: str, lang: str = "en", **kwargs) -> str:
        """Get localized message with format parameters"""
        messages = cls.MESSAGES.get(lang, cls.MESSAGES["en"])
        message = messages.get(key, "Service unavailable")
        
        if kwargs:
            try:
                return message.format(**kwargs)
            except (KeyError, ValueError):
                return message
        return message

class USSDMenuSystem:
    """USSD Menu Navigation System"""
    
    def __init__(self):
        self.messages = USSDMessages()
        # Enhanced demo data for comprehensive testing
        self.demo_data = {
            "user": {
                "name": "John Doe",
                "phone": "254700123456",
                "id_number": "12345678"
            },
            "chamas": [
                {"name": "Hustlers United", "members": 12, "max_members": 15, "savings": 145000, "due": 1200, "status": "due", "code": "TC1234"},
                {"name": "Mama Mboga Network", "members": 8, "max_members": 10, "savings": 67500, "due": 800, "status": "current", "code": "TC5678"}
            ],
            "savings": {
                "personal_savings": 25400,
                "chama_savings": 32200,
                "total_balance": 57600,
                "last_transaction": "24/10/2024: +KES 1,200 (Savings)"
            },
            "trust_score": {
                "score": 76,
                "savings_consistency": 88,
                "chama_participation": 92,
                "payment_history": 85,
                "financial_literacy": 40
            },
            "financial_tips": [
                "💰 Save at least 10% of every income - consistency builds trust with financial institutions.",
                "🤝 Join active chamas to build your financial network and improve your credit profile.",
                "📊 Track your expenses daily - small leaks sink great ships in business.",
                "🏦 File KRA returns even for small amounts - it creates a formal financial history.",
                "📱 Use digital payments - they create transaction records that boost your trust score.",
                "🎯 Set specific savings goals - emergency fund first, then business growth.",
                "📈 Diversify income sources - reduce risk by having multiple revenue streams.",
                "💡 Keep business and personal finances separate - it shows financial discipline.",
                "🔒 Never borrow more than you can comfortably repay within 6 months.",
                "📚 Invest in financial literacy - knowledge is the foundation of wealth creation."
            ],
            "financial_tips_sw": [
                "💰 Hifadhi angalau 10% ya mapato yako yote - uthabiti hujenga uaminifu na taasisi za kifedha.",
                "🤝 Jiunge na chama zinazoshughulika - hujenga mtandao wako wa kifedha na kuboresha wasifu wako wa mkopo.",
                "📊 Fuatilia gharama zako kila siku - matatizo madogo huharibu biashara kubwa.",
                "🏦 Wasilisha ripoti za KRA hata kwa kiasi kidogo - huunda historia rasmi ya kifedha.",
                "📱 Tumia malipo ya kidijitali - huunda rekodi za muamala zinazoongeza alama yako ya uaminifu.",
                "🎯 Weka malengo maalum ya akiba - fedha za dharura kwanza, kisha ukuaji wa biashara.",
                "📈 Gawanya vyanzo vya mapato - punguza hatari kwa kuwa na mtiririko mwingi wa mapato.",
                "💡 Tenga fedha za biashara na za kibinafsi - huonyesha nidhamu ya kifedha.",
                "🔒 Usiazimi zaidi ya unavyoweza kulipa kwa urahisi ndani ya miezi 6.",
                "📚 Wekeza katika elimu ya kifedha - ujuzi ni msingi wa kuunda utajiri."
            ]
        }
    
    def process_input(self, session_data: Dict[str, Any], user_input: str, user_exists: bool) -> Tuple[str, bool]:
        """
        Process user input and return response
        Returns: (response_text, continue_session)
        """
        current_state = session_data.get("state", MenuState.REGISTRATION.value)
        lang = session_data.get("language", "en")
        
        # Process input based on current state
        processed_input = user_input
        if current_state == MenuState.COLLECT_NAME.value:
            # Keep full input for name collection
            processed_input = user_input
        elif "*" in user_input and current_state != MenuState.COLLECT_NAME.value:
            # Extract the last choice for menu navigation (e.g., "1*2*3" -> "3")
            processed_input = user_input.split("*")[-1]
        
        # Handle registration flow for new users
        if not user_exists:
            return self._handle_registration(session_data, processed_input, lang)
        
        # Handle menu navigation for existing users
        return self._handle_navigation(session_data, processed_input, lang)
    
    def _handle_registration(self, session_data: Dict[str, Any], user_input: str, lang: str) -> Tuple[str, bool]:
        """Handle new user registration flow"""
        state = session_data.get("state")
        
        if state == MenuState.REGISTRATION.value:
            if user_input == "":
                # First dial - show language selection
                return self.messages.get_message("welcome", lang), True
            elif user_input == "1":
                # English selected
                session_data["language"] = "en"
                session_data["state"] = MenuState.LANGUAGE_SELECT.value
                return self.messages.get_message("welcome_user", "en"), True
            elif user_input == "2":
                # Swahili selected
                session_data["language"] = "sw"
                session_data["state"] = MenuState.LANGUAGE_SELECT.value
                return self.messages.get_message("welcome_user", "sw"), True
            elif user_input == "0":
                return self.messages.get_message("exit", lang), False
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif state == MenuState.LANGUAGE_SELECT.value:
            if user_input == "1":
                # User wants to join
                session_data["state"] = MenuState.COLLECT_NAME.value
                return self.messages.get_message("collect_name", lang), True
            elif user_input == "2":
                # User declined
                return self.messages.get_message("exit", lang), False
            elif user_input == "0":
                return self.messages.get_message("exit", lang), False
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif state == MenuState.COLLECT_NAME.value:
            if user_input == "0":
                session_data["state"] = MenuState.LANGUAGE_SELECT.value
                return self.messages.get_message("welcome_user", lang), True
            elif user_input and len(user_input.strip()) >= 2:
                # Extract the name from USSD text
                if "*" in user_input:
                    parts = user_input.split("*")
                    name = "*".join(parts[1:]).strip()  # Handle names with spaces
                else:
                    name = user_input.strip()
                
                if len(name) >= 2:
                    session_data["user_data"] = {"name": name}
                    session_data["state"] = MenuState.COLLECT_ID.value
                    return self.messages.get_message("collect_id", lang), True
                else:
                    return self.messages.get_message("collect_name", lang), True
            else:
                return self.messages.get_message("collect_name", lang), True
        
        elif state == MenuState.COLLECT_ID.value:
            if user_input == "0":
                session_data["state"] = MenuState.COLLECT_NAME.value
                return self.messages.get_message("collect_name", lang), True
            elif user_input and len(user_input.strip()) >= 6:
                # Extract ID from USSD text
                if "*" in user_input:
                    parts = user_input.split("*")
                    id_number = parts[-1].strip()  # Get last part as ID
                else:
                    id_number = user_input.strip()
                
                if len(id_number) >= 6:
                    session_data["user_data"]["id_number"] = id_number
                    session_data["state"] = MenuState.CONFIRM_REGISTRATION.value
                    return self.messages.get_message("confirm_registration", lang, 
                                                   name=session_data["user_data"]["name"],
                                                   id_number=id_number), True
                else:
                    return self.messages.get_message("collect_id", lang), True
            else:
                return self.messages.get_message("collect_id", lang), True
        
        elif state == MenuState.CONFIRM_REGISTRATION.value:
            if user_input == "1":
                # Confirm registration
                name = session_data["user_data"]["name"]
                session_data["state"] = MenuState.MAIN_MENU.value
                return self.messages.get_message("registration_success", lang, name=name), True
            elif user_input == "2":
                # Edit details
                session_data["state"] = MenuState.COLLECT_NAME.value
                return self.messages.get_message("collect_name", lang), True
            elif user_input == "0":
                session_data["state"] = MenuState.COLLECT_ID.value
                return self.messages.get_message("collect_id", lang), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # After registration, proceed to main menu
        return self._handle_navigation(session_data, user_input, lang)
    
    def _handle_navigation(self, session_data: Dict[str, Any], user_input: str, lang: str) -> Tuple[str, bool]:
        """Handle menu navigation for registered users"""
        current_state = session_data.get("state", MenuState.MAIN_MENU.value)
        
        # Global back navigation handlers
        if user_input == "00":
            # Return to main menu from anywhere
            session_data["state"] = MenuState.MAIN_MENU.value
            user_data = session_data.get("user_data", {})
            if user_data.get("name"):
                return self.messages.get_message("main_menu_registered", lang, name=user_data["name"]), True
            return self.messages.get_message("main_menu", lang), True
        
        # Main Menu Navigation
        if current_state == MenuState.MAIN_MENU.value:
            user_data = session_data.get("user_data", {})
            is_registered = bool(user_data.get("name"))
            
            if user_input == "":
                # Show appropriate main menu
                if is_registered:
                    return self.messages.get_message("main_menu_registered", lang, name=user_data["name"]), True
                else:
                    return self.messages.get_message("main_menu", lang), True
            
            # Handle menu options based on registration status
            if not is_registered:
                # New user menu options
                if user_input == "1":
                    session_data["state"] = MenuState.COLLECT_NAME.value
                    return self.messages.get_message("collect_name", lang), True
                elif user_input == "2":
                    session_data["state"] = MenuState.CHAMA_SERVICES.value
                    return self.messages.get_message("chama_menu", lang), True
                elif user_input == "3":
                    session_data["state"] = MenuState.SAVINGS.value
                    return self.messages.get_message("savings_menu", lang), True
                elif user_input == "4":
                    return self._get_trust_score_response(lang), True
                elif user_input == "5":
                    return self._get_financial_tips_response(session_data, lang), True
                elif user_input == "6":
                    return self.messages.get_message("help", lang), True
                elif user_input == "0":
                    return self.messages.get_message("exit", lang), False
            else:
                # Registered user menu options
                if user_input == "1":
                    session_data["state"] = MenuState.CHAMA_SERVICES.value
                    return self.messages.get_message("chama_menu", lang), True
                elif user_input == "2":
                    session_data["state"] = MenuState.SAVINGS.value
                    return self.messages.get_message("savings_menu", lang), True
                elif user_input == "3":
                    return self._get_trust_score_response(lang), True
                elif user_input == "4":
                    return self._get_financial_tips_response(session_data, lang), True
                elif user_input == "5":
                    return self.messages.get_message("help", lang), True
                elif user_input == "0":
                    return self.messages.get_message("exit", lang), False
            
            return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Handle remaining menu states - delegate to advanced navigation
        return self._handle_advanced_navigation(session_data, user_input, lang, current_state)
        
        # Handle remaining menu states
        return self._handle_advanced_navigation(session_data, user_input, lang, current_state)
    
    def _handle_advanced_navigation(self, session_data: Dict[str, Any], user_input: str, lang: str, current_state: str) -> Tuple[str, bool]:
        """Handle advanced menu navigation"""
        
        # Chama Services Navigation
        if current_state == MenuState.CHAMA_SERVICES.value:
            if user_input == "1":
                session_data["state"] = MenuState.CREATE_CHAMA.value
                return self.messages.get_message("create_chama", lang), True
            elif user_input == "2":
                session_data["state"] = MenuState.VIEW_CHAMA.value
                return self._get_chamas_list(lang), True
            elif user_input == "3":
                session_data["state"] = MenuState.MAKE_CONTRIBUTION.value
                return self._get_contribution_options(lang), True
            elif user_input == "4":
                session_data["state"] = MenuState.JOIN_CHAMA.value
                return self.messages.get_message("join_chama", lang), True
            elif user_input == "0":
                return self._back_to_main_menu(session_data, lang), True
        
        # Create Chama Flow
        elif current_state == MenuState.CREATE_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input and len(user_input.strip()) > 2:
                name = self._extract_text_input(user_input)
                session_data["create_chama"] = {"name": name}
                session_data["state"] = MenuState.CREATE_CHAMA_MEMBERS.value
                return self.messages.get_message("create_chama_members", lang), True
        
        elif current_state == MenuState.CREATE_CHAMA_MEMBERS.value:
            if user_input == "0":
                session_data["state"] = MenuState.CREATE_CHAMA.value
                return self.messages.get_message("create_chama", lang), True
            elif user_input.isdigit() and 3 <= int(user_input) <= 50:
                session_data["create_chama"]["members"] = int(user_input)
                session_data["state"] = MenuState.CREATE_CHAMA_AMOUNT.value
                return self.messages.get_message("create_chama_amount", lang), True
            else:
                return f"❌ Invalid number: {user_input}\n\nEnter number of members (3-50):\nExample: 10\n\n0. Back", True
        
        elif current_state == MenuState.CREATE_CHAMA_AMOUNT.value:
            if user_input == "0":
                session_data["state"] = MenuState.CREATE_CHAMA_MEMBERS.value
                return self.messages.get_message("create_chama_members", lang), True
            elif user_input.isdigit() and int(user_input) >= 100:
                chama_data = session_data["create_chama"]
                chama_data["amount"] = int(user_input)
                chama_code = f"TC{hash(chama_data['name']) % 9999:04d}"
                return self.messages.get_message("chama_created", lang,
                                                name=chama_data["name"],
                                                members=chama_data["members"],
                                                amount=chama_data["amount"],
                                                code=chama_code), True
            else:
                return f"❌ Invalid amount: {user_input}\n\nEnter amount ≥ KES 100:\nExample: 1000\n\n0. Back", True
        
        # Savings Navigation
        elif current_state == MenuState.SAVINGS.value:
            if user_input == "1":
                session_data["state"] = MenuState.ADD_SAVINGS.value
                balance = self.demo_data["savings"]["total_balance"]
                return self.messages.get_message("add_savings", lang, balance=balance), True
            elif user_input == "2":
                return self._get_balance_response(lang), True
            elif user_input == "3":
                session_data["state"] = MenuState.WITHDRAW_SAVINGS.value
                return self._get_withdraw_options(lang), True
            elif user_input == "4":
                return self._get_savings_history(lang), True
            elif user_input == "5":
                return self._get_savings_goals(lang), True
            elif user_input == "0":
                return self._back_to_main_menu(session_data, lang), True
        
        elif current_state == MenuState.ADD_SAVINGS.value:
            if user_input == "0":
                session_data["state"] = MenuState.SAVINGS.value
                return self.messages.get_message("savings_menu", lang), True
            elif user_input.isdigit() and int(user_input) >= 50:
                amount = int(user_input)
                current_balance = self.demo_data["savings"]["total_balance"]
                new_balance = current_balance + amount
                session_data["savings_amount"] = amount
                session_data["state"] = MenuState.SAVINGS_CONFIRM.value
                return self.messages.get_message("savings_confirm", lang, 
                                                amount=amount, new_balance=new_balance), True
            else:
                return f"❌ Invalid amount: {user_input}\n\nMinimum: KES 50\nExample: 500\n\n0. Back", True
        
        elif current_state == MenuState.SAVINGS_CONFIRM.value:
            if user_input == "1" or user_input == "2":
                amount = session_data.get("savings_amount", 0)
                new_balance = self.demo_data["savings"]["total_balance"] + amount
                trust_points = min(amount // 100, 10)  # 1 point per 100 KES, max 10
                return self.messages.get_message("savings_success", lang,
                                                amount=amount, balance=new_balance, points=trust_points), True
            elif user_input == "3":
                session_data["state"] = MenuState.ADD_SAVINGS.value
                balance = self.demo_data["savings"]["total_balance"]
                return self.messages.get_message("add_savings", lang, balance=balance), True
            elif user_input == "0":
                session_data["state"] = MenuState.ADD_SAVINGS.value
                balance = self.demo_data["savings"]["total_balance"]
                return self.messages.get_message("add_savings", lang, balance=balance), True
        
        # Join Chama Flow
        elif current_state == MenuState.JOIN_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input and len(user_input.strip()) >= 4:
                chama_code = self._extract_text_input(user_input).upper()
                # Validate chama code format (TC followed by 4 digits)
                if chama_code.startswith("TC") and len(chama_code) == 6 and chama_code[2:].isdigit():
                    # Simulate successful join
                    return f"🎉 Successfully joined Chama!\n\nChama Code: {chama_code}\nChama: Digital Hustlers\nMembers: 15/20\nMonthly contribution: KES 1,500\n\n📱 You'll receive SMS updates\n\n0. Back", True
                else:
                    return f"❌ Invalid chama code: {chama_code}\n\nFormat should be: TC1234\nExample: TC5678\n\n0. Back", True
            else:
                return f"❌ Invalid input: {user_input}\n\nEnter chama code (TC####)\nExample: TC1234\n\n0. Back", True
        
        # View Chamas Flow
        elif current_state == MenuState.VIEW_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input in ["1", "2"]:
                chama_idx = int(user_input) - 1
                chamas = self.demo_data["chamas"]
                if chama_idx < len(chamas):
                    chama = chamas[chama_idx]
                    session_data["selected_chama"] = chama_idx
                    session_data["state"] = MenuState.CHAMA_DETAILS.value
                    return self._get_chama_details(chama, lang), True
                else:
                    return self.messages.get_message("invalid_with_back", lang, input=user_input), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Chama Details Sub-menu
        elif current_state == MenuState.CHAMA_DETAILS.value:
            if user_input == "0":
                session_data["state"] = MenuState.VIEW_CHAMA.value
                return self._get_chamas_list(lang), True
            elif user_input == "1":
                # Make contribution from details page
                session_data["state"] = MenuState.CONTRIBUTION_AMOUNT.value
                chama_idx = session_data.get("selected_chama", 0)
                chama = self.demo_data["chamas"][chama_idx]
                return self.messages.get_message("contribution_amount", lang,
                                                chama=chama["name"], 
                                                amount=chama["due"],
                                                status=chama["status"]), True
            elif user_input == "2":
                # View members (placeholder)
                return f"👥 Chama Members\n\n1. John Doe (Admin)\n2. Jane Smith\n3. Mike Johnson\n4. Sarah Wilson\n5. David Brown\n\n📱 {self.demo_data['chamas'][session_data.get('selected_chama', 0)]['members']} total members\n\n0. Back", True
            elif user_input == "3":
                # Share invite code
                chama = self.demo_data["chamas"][session_data.get("selected_chama", 0)]
                return f"📱 Share Invite Code\n\n🔗 Chama Code: {chama['code']}\n\n📋 Share this message:\n\"Join our {chama['name']} chama!\nMonthly contribution: KES {chama['due']}\nUSSD: *384# → Join Chama → {chama['code']}\"\n\n0. Back", True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Make Contribution Flow
        elif current_state == MenuState.MAKE_CONTRIBUTION.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input in ["1", "2"]:
                chama_idx = int(user_input) - 1
                chamas = self.demo_data["chamas"]
                if chama_idx < len(chamas):
                    chama = chamas[chama_idx]
                    session_data["selected_chama"] = chama_idx
                    session_data["state"] = MenuState.CONTRIBUTION_AMOUNT.value
                    return self.messages.get_message("contribution_amount", lang,
                                                    chama=chama["name"], 
                                                    amount=chama["due"],
                                                    status=chama["status"]), True
                else:
                    return self.messages.get_message("invalid_with_back", lang, input=user_input), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Contribution Amount Entry
        elif current_state == MenuState.CONTRIBUTION_AMOUNT.value:
            if user_input == "0":
                session_data["state"] = MenuState.MAKE_CONTRIBUTION.value
                return self._get_contribution_options(lang), True
            elif user_input.isdigit() and int(user_input) >= 50:
                amount = int(user_input)
                chama_idx = session_data.get("selected_chama", 0)
                chama = self.demo_data["chamas"][chama_idx]
                new_balance = self.demo_data["savings"]["total_balance"] + amount
                trust_points = min(amount // 200, 5)  # 1 point per 200 KES for chama contributions
                return self.messages.get_message("contribution_success", lang,
                                                amount=amount,
                                                chama=chama["name"],
                                                balance=new_balance), True
            else:
                return f"❌ Invalid amount: {user_input}\n\nMinimum: KES 50\nExample: 1000\n\n0. Back", True
        
        # Trust Score Details
        elif current_state == MenuState.TRUST_SCORE_DETAILS.value:
            if user_input == "0":
                return self._back_to_main_menu(session_data, lang), True
        
        # Financial Tips Navigation
        elif current_state == MenuState.FINANCIAL_TIPS.value:
            if user_input == "1":
                return self._get_next_tip(session_data, lang), True
            elif user_input == "2":
                return self._get_previous_tip(session_data, lang), True
            elif user_input == "3":
                return self.messages.get_message("tip_categories", lang), True
            elif user_input == "0":
                return self._back_to_main_menu(session_data, lang), True
        
        # Global back navigation and default handling
        if user_input == "0":
            return self._handle_back_navigation(session_data, current_state, lang), True
        
        # Default invalid input handler
        return self.messages.get_message("invalid_with_back", lang, input=user_input), True
    
    def _get_trust_score_response(self, lang: str) -> str:
        """Get formatted trust score response"""
        score_data = self.demo_data["trust_score"]
        score = score_data["score"]
        
        # Determine rating and message
        if score >= 80:
            rating = self.messages.get_message("trust_score_excellent", lang)
            message = "You're doing great!"
            factor1 = "Consistent savings"
            factor2 = "Active chama participation"
            improvement = "Complete Financial Quiz to reach 85+"
        elif score >= 60:
            rating = self.messages.get_message("trust_score_good", lang)
            message = "Keep up the momentum!"
            factor1 = "Regular transactions"
            factor2 = "Growing savings"
            improvement = "Join more chamas to boost score"
        elif score >= 40:
            rating = self.messages.get_message("trust_score_fair", lang)
            message = "Building your financial profile"
            factor1 = "Account activity"
            factor2 = "Savings started"
            improvement = "Save consistently for 30 days"
        else:
            rating = self.messages.get_message("trust_score_poor", lang)
            message = "Welcome to your financial journey!"
            factor1 = "Profile created"
            factor2 = "Ready to save"
            improvement = "Make your first savings deposit"
        
        return self.messages.get_message("trust_score", lang,
                                       score=score, rating=rating, message=message,
                                       factor1=factor1, factor2=factor2, improvement=improvement)
    
    def _get_financial_tips_response(self, session_data: Dict[str, Any], lang: str) -> str:
        """Get financial tips with rotation"""
        tip_index = session_data.get("tip_index", 0)
        tips_key = "financial_tips_sw" if lang == "sw" else "financial_tips"
        tips = self.demo_data[tips_key]
        
        if tip_index >= len(tips):
            tip_index = 0
        
        current_tip = tips[tip_index]
        session_data["tip_index"] = tip_index
        session_data["state"] = MenuState.FINANCIAL_TIPS.value
        
        return self.messages.get_message("financial_tips", lang, tip_content=current_tip)
    
    def _get_next_tip(self, session_data: Dict[str, Any], lang: str) -> str:
        """Get next financial tip"""
        tip_index = session_data.get("tip_index", 0) + 1
        tips_key = "financial_tips_sw" if lang == "sw" else "financial_tips"
        tips = self.demo_data[tips_key]
        
        if tip_index >= len(tips):
            tip_index = 0
        
        session_data["tip_index"] = tip_index
        current_tip = tips[tip_index]
        
        return self.messages.get_message("financial_tips", lang, tip_content=current_tip)
    
    def _get_previous_tip(self, session_data: Dict[str, Any], lang: str) -> str:
        """Get previous financial tip"""
        tip_index = session_data.get("tip_index", 0) - 1
        tips_key = "financial_tips_sw" if lang == "sw" else "financial_tips"
        tips = self.demo_data[tips_key]
        
        if tip_index < 0:
            tip_index = len(tips) - 1
        
        session_data["tip_index"] = tip_index
        current_tip = tips[tip_index]
        
        return self.messages.get_message("financial_tips", lang, tip_content=current_tip)
    
    def _get_balance_response(self, lang: str) -> str:
        """Get formatted balance response"""
        savings_data = self.demo_data["savings"]
        return self.messages.get_message("check_balance", lang, **savings_data)
    
    def _get_chamas_list(self, lang: str) -> str:
        """Get list of user's chamas"""
        chamas = self.demo_data["chamas"]
        if not chamas:
            return self.messages.get_message("no_chamas", lang)
        return self.messages.get_message("view_chamas", lang)
    
    def _get_chama_details(self, chama: dict, lang: str) -> str:
        """Get detailed information about a specific chama"""
        status_icon = "🟢" if chama["status"] == "current" else "🟠"
        next_meeting = "Monday 2:00 PM" if chama["name"] == "Hustlers United" else "Wednesday 6:00 PM"
        
        details = f"👥 {chama['name']} Details\n\n"
        details += f"👫 Members: {chama['members']}/{chama['max_members']}\n"
        details += f"💰 Total Savings: KES {chama['savings']:,}\n"
        details += f"📅 Monthly Target: KES {chama['due'] * chama['members']:,}\n"
        details += f"💳 Your Contribution: KES {chama['due']:,}\n"
        details += f"{status_icon} Status: {chama['status'].title()}\n"
        details += f"📍 Next Meeting: {next_meeting}\n"
        details += f"🔗 Chama Code: {chama['code']}\n\n"
        details += f"1. Make Contribution\n2. View Members\n3. Share Invite Code\n0. Back"
        
        return details
    
    def _get_contribution_options(self, lang: str) -> str:
        """Get chama contribution options"""
        return self.messages.get_message("make_contribution", lang)
    
    def _get_withdraw_options(self, lang: str) -> str:
        """Get savings withdrawal options"""
        available = self.demo_data["savings"]["personal_savings"]
        max_withdraw = min(available, 10000)  # Max KES 10,000 per transaction
        return self.messages.get_message("withdraw_savings", lang, 
                                        available=available, max_withdraw=max_withdraw)
    
    def _get_savings_history(self, lang: str) -> str:
        """Get savings transaction history"""
        history_entries = "📅 Recent Transactions:\n\n" \
                         "24/10/2024: +KES 1,200 (Savings)\n" \
                         "20/10/2024: +KES 800 (Chama)\n" \
                         "15/10/2024: +KES 500 (Savings)\n" \
                         "10/10/2024: -KES 300 (Withdrawal)"
        return self.messages.get_message("savings_history", lang, history_entries=history_entries)
    
    def _get_savings_goals(self, lang: str) -> str:
        """Get savings goals display"""
        return self.messages.get_message("savings_goals", lang,
                                        emergency_current=25000, emergency_target=50000, emergency_percent=50,
                                        house_current=180000, house_target=500000, house_percent=36)
    
    def _extract_text_input(self, user_input: str) -> str:
        """Extract text from USSD input, handling asterisk separators"""
        if "*" in user_input:
            parts = user_input.split("*")
            return "*".join(parts[1:]).strip()  # Join back parts after first *
        return user_input.strip()
    
    def _back_to_main_menu(self, session_data: Dict[str, Any], lang: str) -> str:
        """Navigate back to main menu"""
        session_data["state"] = MenuState.MAIN_MENU.value
        user_data = session_data.get("user_data", {})
        if user_data.get("name"):
            return self.messages.get_message("main_menu_registered", lang, name=user_data["name"])
        return self.messages.get_message("main_menu", lang)
    
    def _handle_back_navigation(self, session_data: Dict[str, Any], current_state: str, lang: str) -> str:
        """Handle context-aware back navigation"""
        # Define state hierarchy for back navigation
        back_mapping = {
            MenuState.TRUST_SCORE_DETAILS.value: MenuState.MAIN_MENU.value,
            MenuState.FINANCIAL_TIPS.value: MenuState.MAIN_MENU.value,
            MenuState.HELP.value: MenuState.MAIN_MENU.value,
            MenuState.CREATE_CHAMA_MEMBERS.value: MenuState.CREATE_CHAMA.value,
            MenuState.CREATE_CHAMA_AMOUNT.value: MenuState.CREATE_CHAMA_MEMBERS.value,
            MenuState.ADD_SAVINGS.value: MenuState.SAVINGS.value,
            MenuState.SAVINGS_CONFIRM.value: MenuState.ADD_SAVINGS.value,
        }
        
        target_state = back_mapping.get(current_state, MenuState.MAIN_MENU.value)
        session_data["state"] = target_state
        
        # Return appropriate response based on target state
        if target_state == MenuState.MAIN_MENU.value:
            return self._back_to_main_menu(session_data, lang)
        elif target_state == MenuState.CHAMA_SERVICES.value:
            return self.messages.get_message("chama_menu", lang)
        elif target_state == MenuState.SAVINGS.value:
            return self.messages.get_message("savings_menu", lang)
        elif target_state == MenuState.CREATE_CHAMA.value:
            return self.messages.get_message("create_chama", lang)
        else:
            return self._back_to_main_menu(session_data, lang)