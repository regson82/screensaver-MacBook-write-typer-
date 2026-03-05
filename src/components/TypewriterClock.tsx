import { useState, useEffect } from 'react';
import { timeToWords } from '../utils/timeToWords';

const FONTS = [
  'font-sans',
  'font-mono',
  'font-serif',
  'font-display',
  'font-hand',
  'font-pixel'
];

export default function TypewriterClock() {
  const [targetText, setTargetText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [currentFont, setCurrentFont] = useState(FONTS[0]);
  
  // Time tracking
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      if (newTime.getMinutes() !== now.getMinutes()) {
        setNow(newTime);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [now]);

  // When time changes, update target text and font
  useEffect(() => {
    const newText = timeToWords(now);
    if (newText === targetText) return;

    // Change font
    let newFont = currentFont;
    while (newFont === currentFont) {
      newFont = FONTS[Math.floor(Math.random() * FONTS.length)];
    }
    setCurrentFont(newFont);
    setTargetText(newText);
    
    // Reset displayed text to start typing
    setDisplayedText('');
    
  }, [now]);

  // Typing effect
  useEffect(() => {
    if (displayedText.length < targetText.length) {
      // Randomize typing speed slightly for realism (50ms - 150ms)
      const timeout = setTimeout(() => {
        setDisplayedText(targetText.slice(0, displayedText.length + 1));
      }, 50 + Math.random() * 100); 
      
      return () => clearTimeout(timeout);
    }
  }, [displayedText, targetText]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden select-none cursor-none">
      <div className="absolute inset-0 rainbow-bg pointer-events-none" />
      
      <div className={`relative z-10 text-4xl md:text-6xl lg:text-8xl text-center leading-tight ${currentFont} max-w-5xl`}>
        <span>
          {displayedText}
          <span className="inline-block w-[0.1em] h-[1em] bg-white ml-1 animate-pulse align-middle" />
        </span>
      </div>
      
    </div>
  );
}
