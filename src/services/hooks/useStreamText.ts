import { useEffect, useState } from 'react';

const useStreamText = (text: string | undefined, interval = 50) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');

    let currentIndex = 0;
    if (!text) {
      return;
    }

    const innerText = text.toString();

    const timer = setInterval(() => {
      setDisplayText(prev => prev + innerText[currentIndex]);
      currentIndex++;

      if (currentIndex >= text.length) {
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
