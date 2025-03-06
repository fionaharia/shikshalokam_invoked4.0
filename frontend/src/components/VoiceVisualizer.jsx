import React, { useState, useEffect } from 'react';

export const VoiceVisualizer = ({ isListening }) => {
  const [circles, setCircles] = useState([
    { scale: 1, opacity: 0.8 },
    { scale: 1.5, opacity: 0.6 },
    { scale: 2, opacity: 0.4 }
  ]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setCircles(prevCircles => 
          prevCircles.map(circle => ({
            scale: circle.scale > 2 ? 1 : circle.scale + 0.1,
            opacity: circle.scale > 2 ? 0.8 : circle.opacity - 0.02
          }))
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  if (!isListening) return null;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full bg-purple-500"
          style={{
            width: '20px',
            height: '20px',
            transform: `translate(-50%, -50%) scale(${circle.scale})`,
            opacity: circle.opacity,
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};