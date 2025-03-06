import os
import requests
from dotenv import load_dotenv
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from huggingface_hub import InferenceClient
from deep_translator import GoogleTranslator
from langdetect import detect

# Load environment variables
load_dotenv()

# Fetch credentials
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
HF_API_TOKEN = os.getenv("HUGGINGFACE_TOKEN")

# Initialize Hugging Face client
client = InferenceClient(token=HF_API_TOKEN)

# Initialize Flask app
app = Flask(__name__)

# Supported languages for translation
SUPPORTED_LANGUAGES = ["en", "hi", "ta", "te", "mr", "bn", "gu", "ml", "kn", "pa", "ur"]

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
            max_new_tokens=300,  # Ensure longer responses
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
