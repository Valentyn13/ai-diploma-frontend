import {useState, useEffect} from 'react';
import {AppState} from 'react-native';

// cloned from https://github.com/amrlabib/react-native-appstate-hook/blob/master/dist/index.js

export default function useAppState(settings) {
  const {onChange, onForeground, onBackground} = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // settings validation
    function isValidFunction(func) {
      return func && typeof func === 'function';
    }
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        if (isValidFunction(onForeground)) onForeground();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        if (isValidFunction(onBackground)) onBackground();
      }
      setAppState(nextAppState);
      if (isValidFunction(onChange)) onChange(nextAppState);
    }
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [onChange, onForeground, onBackground, appState]);

  return {appState};
}
