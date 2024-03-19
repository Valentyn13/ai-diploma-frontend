import { useFlags } from 'flagsmith/react';

export const useFlag = <T extends string | number | boolean>(
  flagName: string,
  defaultValue: T,
): T => {
  const flags = useFlags([flagName]);
  const flagValue = flags[flagName]?.value;

  if (typeof flagValue === typeof defaultValue) {
    return flagValue as T;
  }

  return defaultValue;
};
