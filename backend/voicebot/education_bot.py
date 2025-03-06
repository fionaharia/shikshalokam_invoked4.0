import speech_recognition as sr
from gtts import gTTS
import json
import time
import os
import sys
from difflib import SequenceMatcher
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

class EducationBot:
    def __init__(self):
        print("Initializing Education Bot...")
        try:
            self.recognizer = sr.Recognizer()
        except Exception as e:
            print(f"Error initializing speech recognizer: {e}")
            sys.exit(1)

        self.language_codes = {
            "hindi": "hi-IN",
            "marathi": "mr-IN",
            "tamil": "ta-IN",
            "english": "en-IN"
        }

        try:
            with open("knowledge_base.json", "r", encoding="utf-8") as file:
                self.knowledge_base = json.load(file)
        except Exception as e:
            print(f"Error loading knowledge base: {e}")
            sys.exit(1)

    def detect_language(self, text):
        hindi_markers = ["क्या", "है", "में", "का", "की", "के"]
        marathi_markers = ["आहे", "काय", "मध्ये", "ची", "चे", "च्या"]
        tamil_markers = ["என்ன", "இல்", "உள்ள", "என்று", "ஆகும்"]

        text_lower = text.lower()
        hindi_count = sum(1 for marker in hindi_markers if marker in text_lower)
        marathi_count = sum(1 for marker in marathi_markers if marker in text_lower)
        tamil_count = sum(1 for marker in tamil_markers if marker in text_lower)

        if any("\u0B80" <= c <= "\u0BFF" for c in text) or tamil_count > 0:
            return "tamil"
        elif any("\u0900" <= c <= "\u097F" for c in text):
            return "marathi" if marathi_count > hindi_count else "hindi"
        return "english"

    def similar(self, a, b):
        return SequenceMatcher(None, a.lower(), b.lower()).ratio()

    def find_response(self, query, language):
        query_lower = query.lower()
        best_match = None
        best_ratio = 0
        for category in self.knowledge_base:
            responses = self.knowledge_base[category].get(language, {})
            for key in responses:
                ratio = self.similar(query_lower, key.lower())
                if query_lower in key.lower() or key.lower() in query_lower:
                    ratio = max(ratio, 0.8)
                if ratio > best_ratio:
                    best_ratio = ratio
                    best_match = responses[key]
        
        if best_ratio > 0.3:
            return best_match
        else:
            default_responses = {
                "hindi": "मुझे क्षमा करें, मैं आपका प्रश्न नहीं समझ पाया।",
                "marathi": "क्षमस्व, मला तुमचा प्रश्न समजला नाही.",
                "tamil": "மன்னிக்கவும், உங்கள் கேள்வியை புரிந்துகொள்ள முடியவில்லை.",
                "english": "I'm sorry, I couldn't understand your question."
            }
            return default_responses.get(language, default_responses["english"])

    def listen(self):
        try:
            with sr.Microphone() as source:
                print("\nListening... (Speak now)")
                self.recognizer.adjust_for_ambient_noise(source, duration=1)
                audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=10)
                text = self.recognizer.recognize_google(audio, language="hi-IN")
                return text
        except:
            return "Could not understand audio"

    def speak(self, text, language):
        try:
            lang_code = self.language_codes.get(language, "en-IN").split('-')[0]
            tts = gTTS(text=text, lang=lang_code, slow=False)
            filename = f"response_{int(time.time())}.mp3"
            tts.save(filename)
            print("Audio response generated (not played)")
        except Exception as e:
            print(f"Error in speech synthesis: {e}")

    def transliterate_text(self, text, language):
        if language == "hindi":
            return transliterate(text, sanscript.ITRANS, sanscript.DEVANAGARI)
        elif language == "marathi":
            return transliterate(text, sanscript.ITRANS, sanscript.DEVANAGARI)
        elif language == "tamil":
            return transliterate(text, sanscript.ITRANS, sanscript.TAMIL)
        return text

    def run(self):
        print("\n" + "="*50)
        print("Educational Voice Assistant Started")
        print("="*50 + "\n")
        while True:
            try:
                query = self.listen()
                if not query or query == "Could not understand audio":
                    continue
                language = self.detect_language(query)
                transliterated_query = self.transliterate_text(query, language)
                print(f"\nYou said: {transliterated_query}")
                response = self.find_response(query, language)
                transliterated_response = self.transliterate_text(response, language)
                print(f"Response: {transliterated_response}")
                self.speak(response, language)
            except KeyboardInterrupt:
                print("\nExiting...")
                break
            except Exception as e:
                print(f"Error in main loop: {e}")
                continue

if __name__ == "__main__":
    try:
        bot = EducationBot()
        bot.run()
    except Exception as e:
        print(f"Critical error: {e}")
        sys.exit(1)