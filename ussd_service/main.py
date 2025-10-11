"""
TajiriCircle USSD Service - Main Application
"""
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import HTMLResponse
from ussd_handler import USSDHandler
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="TajiriCircle USSD Service",
    description="Standalone USSD service for TajiriCircle",
    version="1.0.0"
)

# Initialize USSD handler
ussd_handler = USSDHandler()

@app.get("/")
async def root():
    return {
        "service": "TajiriCircle USSD Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "ussd": "/ussd",
            "test": "/test"
        }
    }

@app.post("/ussd")
async def handle_ussd_request(
    sessionId: str = Form(...),
    phoneNumber: str = Form(...), 
    text: str = Form("")
):
    """
    Handle USSD requests from Africa's Talking
    
    Parameters:
    - sessionId: Unique session identifier
    - phoneNumber: User's phone number (format: +254xxxxxxxxx)
    - text: User input (empty for first request)
    """
    try:
        logger.info(f"USSD Request - Session: {sessionId}, Phone: {phoneNumber}, Text: '{text}'")
        
        # Process USSD request
        response = await ussd_handler.handle_request(sessionId, phoneNumber, text)
        
        logger.info(f"USSD Response: {response}")
        return response
        
    except Exception as e:
        logger.error(f"USSD Error - Session: {sessionId}, Error: {str(e)}")
        return "END Service temporarily unavailable. Please try again later."

@app.get("/test", response_class=HTMLResponse)
async def ussd_test_interface():
    """Simple web interface to test USSD flow"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>TajiriCircle USSD Tester</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 50px auto; 
                padding: 20px; 
                background: #f5f5f5;
            }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .phone { 
                background: #1a1a1a; 
                color: #0f0; 
                padding: 20px; 
                border-radius: 10px; 
                font-family: 'Courier New', monospace; 
                margin: 20px 0;
                border: 3px solid #333;
            }
            .screen {
                background: #000;
                color: #0f0;
                padding: 15px;
                border-radius: 5px;
                min-height: 120px;
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.4;
            }
            input, button { 
                padding: 12px; 
                margin: 10px 0; 
                width: 100%; 
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
            }
            button { 
                background: #007bff; 
                color: white; 
                border: none; 
                cursor: pointer; 
                font-weight: bold;
            }
            button:hover { background: #0056b3; }
            .response { 
                background: #f8f9fa; 
                padding: 15px; 
                border-radius: 5px; 
                margin: 10px 0; 
                white-space: pre-wrap; 
                border-left: 4px solid #007bff;
            }
            .info { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 10px 0; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #333; margin-bottom: 10px; }
            .header p { color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏦 TajiriCircle USSD Simulator</h1>
                <p>Test the USSD functionality before deploying to Africa's Talking</p>
            </div>
            
            <div class="phone">
                <h3>📱 Feature Phone Simulator</h3>
                <div class="screen" id="screen">Dial *384# to start TajiriCircle...</div>
            </div>
            
            <div class="info">
                <strong>How to test:</strong>
                <br>1. Enter your phone number (e.g., +254700123456)
                <br>2. Leave input empty for first dial (*384*7815#)
                <br>3. Enter menu choices (1, 2, 3, etc.)
                <br>4. Follow the menu navigation
            </div>
            
            <h3>Test Parameters</h3>
            <input type="text" id="phone" placeholder="Phone Number (e.g., +254700123456)" value="+254700123456">
            <input type="text" id="input" placeholder="Enter USSD input (leave empty for first dial)" maxlength="20">
            <button onclick="sendUSSD()">📞 Send USSD Request</button>
            
            <h3>Raw Response</h3>
            <div id="response" class="response">No response yet...</div>
            
            <h3>Session Info</h3>
            <div id="session" class="response">Session ID: None</div>

            <script>
                let sessionId = Math.random().toString(36).substring(7);
                let currentText = "";
                
                document.getElementById('session').textContent = 'Session ID: ' + sessionId;
                
                async function sendUSSD() {
                    const phone = document.getElementById('phone').value;
                    const input = document.getElementById('input').value;
                    
                    // Append input to current text (simulate USSD flow)
                    if (currentText && input) {
                        currentText += '*' + input;
                    } else if (input) {
                        currentText = input;
                    }
                    
                    const formData = new FormData();
                    formData.append('sessionId', sessionId);
                    formData.append('phoneNumber', phone);
                    formData.append('text', currentText);
                    
                    try {
                        const response = await fetch('/ussd', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const result = await response.text();
                        
                        document.getElementById('response').textContent = result;
                        
                        // Format for phone screen
                        let screenText = result.replace('CON ', '').replace('END ', '');
                        if (result.startsWith('END ')) {
                            screenText += '\\n\\n[SESSION ENDED]';
                        } else {
                            screenText += '\\n\\n> ';
                        }
                        document.getElementById('screen').textContent = screenText;
                        
                        // If session ended, reset
                        if (result.startsWith('END ')) {
                            sessionId = Math.random().toString(36).substring(7);
                            currentText = "";
                            document.getElementById('session').textContent = 'Session ID: ' + sessionId + ' (NEW)';
                        }
                        
                        // Clear input
                        document.getElementById('input').value = '';
                        
                    } catch (error) {
                        document.getElementById('response').textContent = 'Error: ' + error.message;
                        document.getElementById('screen').textContent = 'ERROR: Cannot connect to service';
                    }
                }
                
                // Allow Enter key to submit
                document.getElementById('input').addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendUSSD();
                    }
                });
                
                // Auto-focus input
                document.getElementById('input').focus();
            </script>
        </div>
    </body>
    </html>
    """
    return html_content

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ussd"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)