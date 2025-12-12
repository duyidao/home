import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[currentIndex];
      
      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayText((prev) => currentFullText.substring(0, prev.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
          return; // Skip the timeout below
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`${className} font-typewriter border-r-2 border-black animate-pulse pr-1`}>
      {displayText}
    </span>
  );
};