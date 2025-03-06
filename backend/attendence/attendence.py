import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_NUMBER")


def send_sms(phone, message):
    client = Client(account_sid, auth_token)
    client.messages.create(body=message, from_=twilio_number, to=phone)

# Test message
send_sms("+918291678256", "Your child,  is present today.")