# EduConnect

EduConnect is a parental engagement platform designed to track children's academic and non-academic progress. It provides multilingual support, AI-powered multilingual voicebot, a WhatsApp chatbot, and various features to enhance communication between parents and schools.

# ![Architecture Diagram](https://github.com/user-attachments/assets/8fc5ad94-24d9-4a22-b55e-ce846bc16a65)

## Features

- **Parent Dashboard**
- **Admin Panel**
- **WhatsApp Chatbot**
- **Multilingual Voice Bot** 

- **Attendance SMS Alerts**

## Tech Stack

- **Frontend**: Vite (React, JavaScript)
- **Backend**: Flask (Python)
- **AI Models**: Hugging Face models for NLP
- **Communication Services**: Twilio
- **Hosting**: Ngrok for local tunneling

---

## Installation & Setup

### Backend (Flask)

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     TWILIO_SID=your_twilio_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_NUMBER=your_twilio_number
     HUGGINGFACE_TOKEN=your_huggingface_token
     NGROK_AUTH_TOKEN=your_ngrok_auth_token
     ```
5. Run the backend:
   ```sh
   python app.py
   ```

### Frontend (Next.js)

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License

This project is licensed under the MIT License.
