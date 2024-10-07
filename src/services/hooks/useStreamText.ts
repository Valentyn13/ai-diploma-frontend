import { useEffect, useState } from 'react';

type Props = {
  text: string;
  interval?: number;
  shouldStart?: boolean;
};

const useStreamText = ({ text, interval = 80, shouldStart }: Props) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');

    let currentIndex = 0;
    if (!text || !shouldStart) {
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
  }, [text, shouldStart, interval]);

  return displayText;
};

export default useStreamText;
