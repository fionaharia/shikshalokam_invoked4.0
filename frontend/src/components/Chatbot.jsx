import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send, Bot, User, Volume2 } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null); // Store audio file
  const chatBoxRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "hi-IN"; // Change as needed

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
  
    setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);
    setUserInput('');
  
    try {
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }),
      });
  
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
  
      // Play the response as audio
      playAudioResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    }
  };
  
  // Function to play text as audio
  const playAudioResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN'; // Set language (Change if needed)
    speech.rate = 1; // Adjust speed (1 = normal)
    speech.pitch = 1; // Adjust pitch (1 = normal)
    window.speechSynthesis.speak(speech);
  };
  

  const handleAudioInput = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl m-4 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education Bot
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <Bot size={16} className="text-blue-500" />
            <span>AI Assistant</span>
          </div>
        </div>

        <div
          ref={chatBoxRef}
          className="mb-6 h-[500px] overflow-y-auto rounded-xl bg-gray-50 p-4 scroll-smooth"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 transparent",
          }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Bot size={48} className="mb-4 text-gray-300" />
              <p className="text-center">Start a conversation with the Education Bot!</p>
              <p className="text-sm mt-2">
                Ask any question in Hindi, Marathi, Tamil, or English
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 mb-4 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.sender === "user" ? "bg-blue-100" : "bg-purple-100"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User size={16} className="text-blue-600" />
                  ) : (
                    <Bot size={16} className="text-purple-600" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 pr-24 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              onClick={handleAudioInput}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={isListening ? "Stop recording" : "Start recording"}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {audioSrc && (
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => document.getElementById("audio-response").play()}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <Volume2 size={20} />
              Play Response
            </button>
            <audio id="audio-response" src={audioSrc} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
