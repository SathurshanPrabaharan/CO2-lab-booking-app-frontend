import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface TypingEffectProps {
  text: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    if (currentIndex < text.length) {
      const intervalId = setInterval(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearInterval(intervalId);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, speed, text]);

  if (isMobile) {
    return null; // Don't render anything on mobile
  }

  return (
    <div className="font-mono text-2xl font-bold text-gray-900 overflow-hidden whitespace-nowrap">
      {displayText}
      {isTyping && <span className="border-r-2 border-orange-500"></span>}
    </div>
  );
};

export default TypingEffect;
