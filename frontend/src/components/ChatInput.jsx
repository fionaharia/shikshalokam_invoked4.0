import React from 'react';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useTranslation } from 'react-i18next';

export const ChatInput = ({ 
  inputText, 
  setInputText, 
  handleSend, 
  isListening, 
  toggleListening 
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSend} className="flex gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t("chatbot.placeholder")}
          className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 border border-white/20"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
            isListening ? 'bg-purple-600' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          <FaMicrophone className="w-4 h-4 text-white" />
        </button>
        <VoiceVisualizer isListening={isListening} />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-colors"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};
