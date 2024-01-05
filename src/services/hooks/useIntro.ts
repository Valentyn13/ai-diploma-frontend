import { useMemo } from 'react';

import useCache from './useCache';

export interface IntroMetadata {
  categories: string[];
  sex?: string;
}

export const INTRO_METADATA_KEY = 'intro_metadata';

export const useIntro = () => {
  const [cached] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const isFirstTimeUser = useMemo(
    () =>
      cached === null ||
      !cached.categories?.length ||
      cached?.sex === undefined,
    [cached],
  );

  return {
    isFirstTimeUser,
  };
};
