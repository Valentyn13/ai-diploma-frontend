import { useEffect } from 'react';
import { BackHandler } from 'react-native';

interface UseOverrideBackGesture {
  onBack: () => void;
}

const useOverrideBackGesture = ({ onBack }: UseOverrideBackGesture) => {
  useEffect(() => {
    const backAction = () => {
      onBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [onBack]);
};

export default useOverrideBackGesture;
