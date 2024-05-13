import { useEffect, useState } from 'react';

const useTimer = (initialTime = 3, onComplete = () => {}, isActive = true) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete, isActive]);

  return timeLeft;
};

export default useTimer;
