import { useLDClient } from '@common/context/LDContext';
import { useEffect, useState } from 'react';

const useObjectFlag = <T>(key: string, defaultValue: T) => {
  const { evaluateObjectFlag } = useLDClient();
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const fetchFlag = async () => {
      const flagValue = await evaluateObjectFlag(key, defaultValue);

      console.log('flagValue', flagValue);

      // if (!flagValue) {
      //   return;
      // }

      setValue(flagValue);
    };

    fetchFlag();
  }, [key, defaultValue, evaluateObjectFlag]);

  return value;
};

export default useObjectFlag;
