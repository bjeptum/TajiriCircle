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
    MAIN_MENU = "main_menu"
    CHAMA_SERVICES = "chama_services"
    JOIN_CHAMA = "join_chama"
    CREATE_CHAMA = "create_chama"
    VIEW_CHAMA = "view_chama"
    MAKE_CONTRIBUTION = "make_contribution"
    TRUST_SCORE = "trust_score"
    SAVINGS = "savings"
    CHECK_BALANCE = "check_balance"
    ADD_SAVINGS = "add_savings"
    HELP = "help"

class USSDMessages:
    """Multilingual USSD Messages"""
    
    MESSAGES = {
        "en": {
            # Registration
            "welcome": "🏦 Welcome to TajiriCircle!\nYour AI-powered financial companion\n\nDo you want to join?\n1. Yes\n2. No",
            "collect_name": "📝 Please enter your full name:",
            "registration_success": "✅ Registration successful!\nWelcome to TajiriCircle, {name}!\n\nPress any key to continue...",
            
            # Main Menu
            "main_menu": "🏠 TajiriCircle Main Menu\n1. Chama Services\n2. Trust Score\n3. Savings\n4. Help\n0. Exit",
            
            # Chama Services
            "chama_menu": "🤝 Chama Services\n1. Join Chama\n2. Create Chama\n3. View My Chamas\n4. Make Contribution\n0. Back to Main Menu",
            "join_chama": "📝 Join a Chama\n\nEnter Chama invitation code:\n(e.g., UMOJA2024)\n\n0. Back",
            "create_chama": "🆕 Create New Chama\n\nEnter Chama name:\n(e.g., Umoja Traders)\n\n0. Back",
            "view_chamas": "👥 My Chamas:\n\n1. Umoja Traders\n   Members: 12 | Savings: KES 145,000\n\n2. Mama Mboga Network\n   Members: 8 | Savings: KES 67,500\n\n0. Back",
            "make_contribution": "💰 Make Contribution\n\nSelect Chama:\n1. Umoja Traders - KES 1,200 due\n2. Mama Mboga - KES 800 due\n\n0. Back",
            
            # Trust Score
            "trust_score": "⭐ Your Trust Score\n\nScore: 750/850 (Excellent)\n\n📊 Breakdown:\n• Payment History: 95%\n• Chama Activity: 88%\n• Savings Consistency: 92%\n\n0. Back",
            
            # Savings
            "savings_menu": "💳 Savings Menu\n1. Check Balance\n2. Add Savings\n3. Savings Goals\n0. Back to Main Menu",
            "check_balance": "💰 Account Balance\n\nCurrent Balance: KES 15,400\nTotal Savings: KES 85,600\nChama Contributions: KES 52,200\n\nLast transaction: +KES 1,200\n\n0. Back",
            "add_savings": "💵 Add to Savings\n\nEnter amount (KES):\n(Minimum: KES 50)\n\nExample: 500\n\n0. Back",
            "savings_goals": "🎯 Savings Goals\n\n📈 Emergency Fund\nProgress: KES 25,000 / 50,000 (50%)\n\n🏠 House Deposit\nProgress: KES 180,000 / 500,000 (36%)\n\n0. Back",
            
            # Help
            "help": "ℹ️  TajiriCircle Help\n\n📞 Customer Support:\n• Call: 0700-123-456\n• SMS: Send HELP to 40404\n• WhatsApp: 0700-TAJIRI\n\n🕐 Available 24/7\n\n0. Back",
            
            # Common
            "exit": "👋 Thank you for using TajiriCircle!\n\nYour financial partner for:\n✓ Smart savings\n✓ Group investments\n✓ AI-powered insights\n\nDial *384# anytime!",
            "invalid": "❌ Invalid option. Please try again.\n\nEnter a valid choice or:\n0. Back to previous menu\n00. Main menu",
            "invalid_with_back": "❌ Invalid input: '{input}'\n\nPlease enter a valid option or:\n0. Back\n00. Main Menu",
            "error": "⚠️ Service temporarily unavailable.\nPlease try again in a few minutes.\n\n0. Back",
            "processing": "⏳ Processing your request...",
            "back_to_main": "🏠 Returning to Main Menu...",
        },
        
        "sw": {
            # Registration (Swahili)
            "welcome": "🏦 Karibu TajiriCircle!\nMwenzi wako wa kifedha wenye akili bandia\n\nUnataka kujiunga?\n1. Ndiyo\n2. Hapana",
            "collect_name": "📝 Tafadhali ingiza jina lako kamili:",
            "registration_success": "✅ Usajili umefanikiwa!\nKaribu TajiriCircle, {name}!\n\nBonyeza kitufe chochote kuendelea...",
            
            # Main Menu (Swahili)
            "main_menu": "🏠 Menyu Kuu ya TajiriCircle\n1. Huduma za Chama\n2. Alama ya Uaminifu\n3. Akiba\n4. Msaada\n0. Toka",
            
            # Chama Services (Swahili)
            "chama_menu": "🤝 Huduma za Chama\n1. Jiunge na Chama\n2. Unda Chama\n3. Angalia Chama Zangu\n4. Changia\n0. Rudi Menyu Kuu",
            "join_chama": "📝 Jiunge na Chama\n\nIngiza msimbo wa mwaliko:\n(k.m., UMOJA2024)\n\n0. Rudi",
            "create_chama": "🆕 Unda Chama Mpya\n\nIngiza jina la chama:\n(k.m., Wafanyabiashara Umoja)\n\n0. Rudi",
            "view_chamas": "👥 Chama Zangu:\n\n1. Wafanyabiashara Umoja\n   Wanachama: 12 | Akiba: KES 145,000\n\n2. Mtandao wa Mama Mboga\n   Wanachama: 8 | Akiba: KES 67,500\n\n0. Rudi",
            "make_contribution": "💰 Changia\n\nChagua Chama:\n1. Wafanyabiashara Umoja - KES 1,200\n2. Mama Mboga - KES 800\n\n0. Rudi",
            
            # Trust Score (Swahili)
            "trust_score": "⭐ Alama Yako ya Uaminifu\n\nAlama: 750/850 (Bora)\n\n📊 Maelezo:\n• Historia ya Malipo: 95%\n• Shughuli za Chama: 88%\n• Uthabiti wa Akiba: 92%\n\n0. Rudi",
            
            # Savings (Swahili)
            "savings_menu": "💳 Menyu ya Akiba\n1. Angalia Salio\n2. Ongeza Akiba\n3. Malengo ya Akiba\n0. Rudi Menyu Kuu",
            "check_balance": "💰 Salio la Akaunti\n\nSalio la Sasa: KES 15,400\nJumla ya Akiba: KES 85,600\nMichango ya Chama: KES 52,200\n\nMuamala wa mwisho: +KES 1,200\n\n0. Rudi",
            "add_savings": "💵 Ongeza Akiba\n\nIngiza kiasi (KES):\n(Kiwango cha chini: KES 50)\n\nMfano: 500\n\n0. Rudi",
            "savings_goals": "🎯 Malengo ya Akiba\n\n📈 Fedha za Dharura\nMaendeleo: KES 25,000 / 50,000 (50%)\n\n🏠 Amana ya Nyumba\nMaendeleo: KES 180,000 / 500,000 (36%)\n\n0. Rudi",
            
            # Help (Swahili)
            "help": "ℹ️  Msaada wa TajiriCircle\n\n📞 Huduma kwa Wateja:\n• Piga: 0700-123-456\n• SMS: Tuma MSAADA kwa 40404\n• WhatsApp: 0700-TAJIRI\n\n🕐 Inapatikana 24/7\n\n0. Rudi",
            
            # Common (Swahili)
            "exit": "👋 Asante kwa kutumia TajiriCircle!\n\nMshirika wako wa kifedha kwa:\n✓ Akiba busara\n✓ Uwekezaji wa kikundi\n✓ Maarifa ya AI\n\nPiga *384# wakati wowote!",
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
        # In-memory fallback for demo data
        self.demo_data = {
            "chamas": [
                {"name": "Umoja Traders", "members": 12, "savings": 145000, "due": 1200},
                {"name": "Mama Mboga Network", "members": 8, "savings": 67500, "due": 800}
            ],
            "balance": 15400,
            "total_savings": 85600,
            "trust_score": 750
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
                # First dial
                return self.messages.get_message("welcome", lang), True
            elif user_input == "1":
                # User wants to join
                session_data["state"] = MenuState.COLLECT_NAME.value
                return self.messages.get_message("collect_name", lang), True
            elif user_input == "2":
                # User declined
                return self.messages.get_message("exit", lang), False
            else:
                # Invalid choice during registration
                return f"❌ Invalid choice: {user_input}\n\nPlease choose:\n1. Yes - Join TajiriCircle\n2. No - Exit", True
        
        elif state == MenuState.COLLECT_NAME.value:
            if user_input and len(user_input.strip()) >= 2:
                # Extract the name from USSD text (format: "1*John Doe")
                if "*" in user_input:
                    name = user_input.split("*", 1)[1].strip()
                else:
                    name = user_input.strip()
                
                if len(name) >= 2:
                    session_data["user_data"] = {"name": name}
                    session_data["state"] = MenuState.MAIN_MENU.value
                    return self.messages.get_message("registration_success", lang, name=name), True
                else:
                    return self.messages.get_message("collect_name", lang), True
            else:
                return self.messages.get_message("collect_name", lang), True
        
        # After registration, proceed to main menu
        return self._handle_navigation(session_data, user_input, lang)
    
    def _handle_navigation(self, session_data: Dict[str, Any], user_input: str, lang: str) -> Tuple[str, bool]:
        """Handle menu navigation for registered users"""
        current_state = session_data.get("state", MenuState.MAIN_MENU.value)
        
        # Global back navigation handlers
        if user_input == "00":
            # Return to main menu from anywhere
            session_data["state"] = MenuState.MAIN_MENU.value
            return self.messages.get_message("main_menu", lang), True
        
        # Main Menu Navigation
        if current_state == MenuState.MAIN_MENU.value:
            if user_input == "" or user_input == "0":
                return self.messages.get_message("main_menu", lang), True
            elif user_input == "1":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input == "2":
                return self.messages.get_message("trust_score", lang), True
            elif user_input == "3":
                session_data["state"] = MenuState.SAVINGS.value
                return self.messages.get_message("savings_menu", lang), True
            elif user_input == "4":
                return self.messages.get_message("help", lang), True
            elif user_input == "0":
                return self.messages.get_message("exit", lang), False
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Chama Services Menu
        elif current_state == MenuState.CHAMA_SERVICES.value:
            if user_input == "1":
                session_data["state"] = MenuState.JOIN_CHAMA.value
                return self.messages.get_message("join_chama", lang), True
            elif user_input == "2":
                session_data["state"] = MenuState.CREATE_CHAMA.value
                return self.messages.get_message("create_chama", lang), True
            elif user_input == "3":
                session_data["state"] = MenuState.VIEW_CHAMA.value
                return self.messages.get_message("view_chamas", lang), True
            elif user_input == "4":
                session_data["state"] = MenuState.MAKE_CONTRIBUTION.value
                return self.messages.get_message("make_contribution", lang), True
            elif user_input == "0":
                session_data["state"] = MenuState.MAIN_MENU.value
                return self.messages.get_message("main_menu", lang), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Savings Menu
        elif current_state == MenuState.SAVINGS.value:
            if user_input == "1":
                session_data["state"] = MenuState.CHECK_BALANCE.value
                return self.messages.get_message("check_balance", lang), True
            elif user_input == "2":
                session_data["state"] = MenuState.ADD_SAVINGS.value
                return self.messages.get_message("add_savings", lang), True
            elif user_input == "3":
                return self.messages.get_message("savings_goals", lang), True
            elif user_input == "0":
                session_data["state"] = MenuState.MAIN_MENU.value
                return self.messages.get_message("main_menu", lang), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Individual Chama Services Pages
        elif current_state == MenuState.JOIN_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input and len(user_input.strip()) > 2:
                # Process chama code
                code = user_input.strip().upper()
                return f"🔍 Searching for Chama: {code}\n\n⏳ Please wait...\n\n0. Back", True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif current_state == MenuState.CREATE_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input and len(user_input.strip()) > 2:
                # Process chama name
                name = user_input.strip()
                return f"✅ Creating Chama: {name}\n\nSetting up your group...\n⏳ Please wait...\n\n0. Back", True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif current_state == MenuState.VIEW_CHAMA.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input in ["1", "2"]:
                chama_name = "Umoja Traders" if user_input == "1" else "Mama Mboga Network"
                return f"👥 {chama_name} Details\n\n📊 Monthly Target: KES 15,000\n💰 Your Contribution: KES 1,200\n📅 Next Meeting: Monday 2PM\n\n0. Back", True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif current_state == MenuState.MAKE_CONTRIBUTION.value:
            if user_input == "0":
                session_data["state"] = MenuState.CHAMA_SERVICES.value
                return self.messages.get_message("chama_menu", lang), True
            elif user_input in ["1", "2"]:
                amount = "1,200" if user_input == "1" else "800"
                chama = "Umoja Traders" if user_input == "1" else "Mama Mboga"
                return f"💳 Contribute to {chama}\n\nAmount: KES {amount}\n\n1. Pay with M-Pesa\n2. Pay with Bank\n\n0. Back", True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        # Individual Savings Pages
        elif current_state == MenuState.CHECK_BALANCE.value:
            if user_input == "0":
                session_data["state"] = MenuState.SAVINGS.value
                return self.messages.get_message("savings_menu", lang), True
            else:
                return self.messages.get_message("invalid_with_back", lang, input=user_input), True
        
        elif current_state == MenuState.ADD_SAVINGS.value:
            if user_input == "0":
                session_data["state"] = MenuState.SAVINGS.value
                return self.messages.get_message("savings_menu", lang), True
            elif user_input.isdigit() and int(user_input) >= 50:
                amount = user_input
                return f"💰 Add KES {amount} to Savings\n\n1. Confirm Payment\n2. Change Amount\n\n0. Back", True
            else:
                return f"❌ Invalid amount: {user_input}\n\nEnter amount ≥ KES 50\nExample: 500\n\n0. Back", True
        
        # Handle back navigation and invalid inputs for any unhandled states
        if user_input == "0":
            # Determine where to go back to based on current state
            if current_state in [MenuState.TRUST_SCORE.value, MenuState.HELP.value]:
                session_data["state"] = MenuState.MAIN_MENU.value
                return self.messages.get_message("main_menu", lang), True
            else:
                session_data["state"] = MenuState.MAIN_MENU.value
                return self.messages.get_message("main_menu", lang), True
        
        # Default invalid input handler
        return self.messages.get_message("invalid_with_back", lang, input=user_input), True