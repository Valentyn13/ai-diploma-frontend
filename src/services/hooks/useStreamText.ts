import { useEffect, useState } from 'react';

const useStreamText = (text: string | undefined, interval = 80) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');

    let currentIndex = 0;
    if (!text) {
      return;
    }

    const wordsArray = text.split(' ');

    const timer = setInterval(() => {
      setDisplayText(
        prev => prev + (currentIndex > 0 ? ' ' : '') + wordsArray[currentIndex],
      );
      currentIndex++;

      if (currentIndex >= wordsArray.length) {
        clearInterval(timer);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [text, interval]);

  return displayText;
};

export default useStreamText;
