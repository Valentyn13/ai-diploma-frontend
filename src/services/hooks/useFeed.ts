import {
  COLLECTIONS,
  COLLECTIONS_TIME_OF_DAY,
  LIMIT_MAX_MEDITATIONS_FEED,
} from '@common/constants';
import i18n from '@services/localization/i18n';
import { getRandomElements } from '@utils/rand';
import { getCollectionIdByTime } from '@utils/time';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  allMeditations as allMeditationsSelector,
  homeMeditationsSelector,
  latestMeditationSelector,
  toptMeditationSelector,
} from 'store/selectors';
import { Meditation } from 'types/Meditation';

interface Collection {
  id: string;
  title: string;
  items: Meditation[];
}

const useFeed = (): Collection[] => {
  const meditations = useSelector(homeMeditationsSelector) as Meditation[];
  const latest = useSelector(latestMeditationSelector) as Meditation[];
  const topRated = useSelector(toptMeditationSelector) as Meditation[];
  const allMeditations = useSelector(allMeditationsSelector) as Meditation[];

  const idToItem = useCallback(
    (id: string) => allMeditations.find(m => m.id === id)!,
    [allMeditations],
  );

  const firstCollections: Collection[] = useMemo(
    () =>
      COLLECTIONS_TIME_OF_DAY.filter(
        ({ id }) => id === getCollectionIdByTime(),
      ).map(({ title, id, trackIds }) => ({
        id,
        title,
        items: trackIds.map(idToItem).filter(Boolean),
      })),
    [idToItem],
  );

  const fixedCollections: Collection[] = useMemo(
    () => [
      {
        id: 'greeting-general',
        title: i18n.t('Greeting_general'),
        items: meditations,
      },
      { id: 'latest-release', title: i18n.t('latest_release'), items: latest },
      { id: 'top-rated', title: i18n.t('most_played'), items: topRated },
    ],
    [meditations, latest, topRated],
  );

  const dynamicCollections: Collection[] = getRandomElements(
    COLLECTIONS,
    LIMIT_MAX_MEDITATIONS_FEED,
  ).map(({ title, id, trackIds }) => ({
    id,
    title,
    items: trackIds.map(idToItem).filter(Boolean),
  }));

  const collections: Collection[] = useMemo(
    () => [
      ...firstCollections,
      ...getRandomElements([...dynamicCollections, ...fixedCollections], 6),
    ],
    [dynamicCollections, firstCollections, fixedCollections],
  );

  return collections;
};

export default useFeed;
