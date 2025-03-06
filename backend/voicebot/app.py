from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from education_bot import EducationBot
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

bot = EducationBot()

@app.route('/')
def index():
    return "Education Bot Backend"

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

def run_bot():
    bot.run()

if __name__ == '__main__':
    # Run the bot in a separate thread
    bot_thread = threading.Thread(target=run_bot)
    bot_thread.daemon = True
    bot_thread.start()
    
    # Run the Flask app
    app.run(debug=True)