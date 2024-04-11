import { COLLECTIONS } from '@common/constants';
import i18n from '@services/localization/i18n';
import { allMeditations as allMeditationsSelector } from '@store/selectors';
import { getRandomElements } from '@utils/rand';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Session } from 'types/Meditation';

import useFeed from './useFeed';

interface Collection {
  id: string;
  title: string;
  items: Session[];
}

const useDiscovery = (): Collection[] => {
  const feedCollections = useFeed();
  const allMeditations = useSelector(allMeditationsSelector) as Session[];

  const idToItem = useCallback(
    (id: string) => allMeditations.find(m => m.id === id)!,
    [allMeditations],
  );

  const dynamicCollections = useMemo(
    () =>
      COLLECTIONS.filter(c => !feedCollections.some(fc => fc.id === c.id)).map(
        ({ title, id, trackIds }) => ({
          id,
          title,
          items: trackIds.map(idToItem).filter(Boolean),
        }),
      ),
    [feedCollections, idToItem],
  );

  const fixedCollections: Collection[] = useMemo(() => {
    const existingIds = dynamicCollections
      .reduce((acc, c) => [...acc, ...c.items], [] as Session[])
      .map(m => m.id);

    const meditations = allMeditations.filter(m => !existingIds.includes(m.id));

    return [
      {
        id: 'todays-pick',
        title: i18n.t('המלצות היום'),
        items: getRandomElements(meditations, Math.random() * (8 - 5) + 5),
      },
    ];
  }, [dynamicCollections, allMeditations]);

  const collections: Collection[] = useMemo(
    () => [...fixedCollections, ...dynamicCollections],
    [dynamicCollections, fixedCollections],
  );

  return collections;
};

export default useDiscovery;
