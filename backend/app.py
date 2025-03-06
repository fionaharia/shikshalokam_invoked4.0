import os
import threading
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client
from huggingface_hub import InferenceClient
from deep_translator import GoogleTranslator
from langdetect import detect
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Fetch credentials
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")
HF_API_TOKEN = os.getenv("HUGGINGFACE_TOKEN")

# Initialize Hugging Face client
client = InferenceClient(token=HF_API_TOKEN)

# Supported languages for translation
SUPPORTED_LANGUAGES = ["en", "hi", "ta", "te", "mr", "bn", "gu", "ml", "kn", "pa", "ur"]

# Import EducationBot if it exists in the education_bot module
try:
    from education_bot import EducationBot
    bot = EducationBot()
    has_education_bot = True
except ImportError:
    has_education_bot = False
    print("EducationBot module not found. Related functionality will be disabled.")

# Helper Functions
def detect_language(text):
    """Detect the language of the input text"""
    try:
        lang = detect(text)
        return lang if lang in SUPPORTED_LANGUAGES else "en"
    except:
        return "en"

def translate_text(text, target_lang="en"):
    """Translate text to the target language"""
    try:
        translator = GoogleTranslator(source="auto", target=target_lang)
        return translator.translate(text)
    except:
        return text

def generate_ai_response(user_message, user_lang="en"):
    """Generate AI response using Hugging Face model"""
    try:
        print(f"Generating AI response for: {user_message}")
        
        if user_lang != "en":
            user_message = translate_text(user_message, "en")
        
        prompt = f"<s>Human: {user_message}\n\nAssistant: "
        response = client.text_generation(
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            prompt=prompt,
            max_new_tokens=300,
            temperature=0.7,
            do_sample=True,
            top_p=0.95
        )
        
        ai_response = str(response).strip()
        print(f"AI Response: {ai_response}")
        
        if user_lang != "en":
            return translate_text(ai_response, user_lang)
        return ai_response
    except Exception as e:
        print(f"AI API Error: {str(e)}")
        return "Sorry, I'm having trouble right now. Try again later!"

def send_sms(phone, message):
    """Send SMS using Twilio"""
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(body=message, from_=TWILIO_NUMBER, to=phone)
        return True
    except Exception as e:
        print(f"SMS Error: {str(e)}")
        return False

# Routes
@app.route('/')
def index():
    return "Unified Backend Service"

# Education Bot Routes
if has_education_bot:
    @app.route('/ask', methods=['POST'])
    def ask():
        data = request.json
        query = data.get('query', '')
        
        if not query:
            return jsonify({"response": "Please provide a query."}), 400
        
        # Detect language and get response
        language = bot.detect_language(query)
        response = bot.find_response(query, language)
        
        return jsonify({"response": response})

# WhatsApp Webhook Route
@app.route('/webhook', methods=['POST'])
def whatsapp_webhook():
    """Handles incoming WhatsApp messages"""
    try:
        sender = request.form.get("From")
        message = request.form.get("Body", "")
        
        if not message:
            return str(MessagingResponse().message("Sorry, I didn't receive any message.")), 200

        user_lang = detect_language(message)
        print(f"📩 Message from {sender}: {message} (Language: {user_lang})")

        # Generate AI response
        ai_response = generate_ai_response(message, user_lang)
        print(f"📤 Sending response: {ai_response}")

        response = MessagingResponse()
        response.message(ai_response)
        return str(response), 200, {"Content-Type": "application/xml"}
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        error_response = MessagingResponse()
        error_response.message("Sorry, something went wrong. Please try again later.")
        return str(error_response), 200, {"Content-Type": "application/xml"}

# SMS API Route
@app.route('/send-sms', methods=['POST'])
def send_sms_api():
    """API endpoint to send SMS"""
    data = request.json
    phone = data.get('phone')
    message = data.get('message')
    
    if not phone or not message:
        return jsonify({"success": False, "error": "Phone number and message are required"}), 400
    
    success = send_sms(phone, message)
    
    if success:
        return jsonify({"success": True, "message": "SMS sent successfully"})
    else:
        return jsonify({"success": False, "error": "Failed to send SMS"}), 500

def run_bot():
    """Run the education bot if available"""
    if has_education_bot:
        bot.run()

if __name__ == '__main__':
    # Run the education bot in a separate thread if available
    if has_education_bot:
        bot_thread = threading.Thread(target=run_bot)
        bot_thread.daemon = True
        bot_thread.start()
    
    # Run the Flask app
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)