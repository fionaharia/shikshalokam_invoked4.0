import React from 'react';

export const MessageList = ({ messages }) => {
  return (
    <div className="h-[calc(100%-160px)] overflow-y-auto mb-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-lg ${
              message.isBot
                ? 'bg-gray-800 text-white'
                : 'bg-purple-600 text-white'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};
