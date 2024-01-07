import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { chooseCategories, chooseSex } from 'store/actions';

import useCache from './useCache';

export interface IntroMetadata {
  categories: string[];
  sex?: string;
}

export const INTRO_METADATA_KEY = 'intro_metadata';

export const useIntro = () => {
  const dispatch = useDispatch();
  const [cached] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const isFirstTimeUser = useMemo(() => {
    const isFirst =
      cached === null ||
      !cached.categories?.length ||
      cached?.sex === undefined;

    if (!isFirst) {
      setTimeout(() => {
        dispatch(chooseSex({ sex: cached.sex }));
        dispatch(chooseCategories({ categories: cached.categories }));
      }, 0);
    }

    return isFirst;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cached]);

  return {
    isFirstTimeUser,
  };
};
