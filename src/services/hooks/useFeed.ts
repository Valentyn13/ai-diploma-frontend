import { LIMIT_MAX_MEDITATIONS_FEED } from '@common/constants';
import i18n from '@services/localization/i18n';
import {
  getMeditationsByCategories,
  getMeditationsByTimeOfTheDay,
  homeMeditationsSelector,
  latestMeditationSelector,
  toptMeditationSelector,
} from '@store/selectors';
import { getRandomElements, shuffleArray } from '@utils/rand';
import { getPeriodOfDay } from '@utils/time';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  MeditationByPredefinedCategories,
  MeditationsByTimeOfTheDay,
  Session,
} from 'types/Meditation';

interface Collection {
  id: string;
  title: string;
  items: Session[];
}

const useFeed = (): Collection[] => {
  const meditations = useSelector(homeMeditationsSelector) as Session[];
  const latest = useSelector(latestMeditationSelector) as Session[];
  const topRated = useSelector(toptMeditationSelector) as Session[];
  const allMeditations = useMemo(() => [], []);
  const meditationsByTimeOfTheDay = useSelector(
    getMeditationsByTimeOfTheDay,
  ) as MeditationsByTimeOfTheDay[];
  const meditationsByCategories = useSelector(
    getMeditationsByCategories,
  ) as MeditationByPredefinedCategories[];

  const idToItem = useCallback(
    (id: string) => allMeditations.find(m => m.id === id)!,
    [allMeditations],
  );

  const firstCollections: Collection[] = useMemo(
    () => [
      ...meditationsByTimeOfTheDay
        .filter(({ id }) => id === getPeriodOfDay())
        .map(({ title, id, trackIds }) => ({
          id,
          title,
          items: trackIds.map(idToItem).filter(Boolean),
        })),
      { id: 'latest-release', title: i18n.t('latest_release'), items: latest },
    ],
    [idToItem, latest, meditationsByTimeOfTheDay],
  );

  const fixedCollections: Collection[] = useMemo(
    () => [
      {
        id: 'greeting-general',
        title: i18n.t('Greeting_general'),
        items: meditations,
      },
      { id: 'top-rated', title: i18n.t('most_played'), items: topRated },
    ],
    [meditations, topRated],
  );

  const dynamicCollections: Collection[] = getRandomElements(
    meditationsByCategories,
    LIMIT_MAX_MEDITATIONS_FEED,
  ).map(({ title, id, trackIds }) => ({
    id,
    title,
    items: trackIds.map(idToItem).filter(Boolean),
  }));

  const collections: Collection[] = useMemo(
    () => [
      ...firstCollections,
      ...shuffleArray([...dynamicCollections, ...fixedCollections]),
    ],
    [dynamicCollections, firstCollections, fixedCollections],
  );

  return collections;
};

export default useFeed;
