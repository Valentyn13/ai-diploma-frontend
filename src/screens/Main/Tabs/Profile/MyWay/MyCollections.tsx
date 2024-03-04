import Divider from '@common/components/Divider';
import HorizontalCollection from '@common/components/HorizontalCollection';
import { useNavigation } from '@react-navigation/native';
import i18n from '@services/localization/i18n';
import {
  favoriteMeditationsSelector,
  practiceHistorySelector,
} from '@store/selectors';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Meditation } from 'types/Meditation';

const MyCollections = () => {
  const { navigate } = useNavigation();
  const favMeditations = useSelector(
    favoriteMeditationsSelector,
  ) as Meditation[];
  const history = useSelector(practiceHistorySelector) as Meditation[];

  const uniqueHistory = useMemo(() => {
    const ids = history.map(({ id }) => id);
    const uniqueIds = [...new Set(ids.slice().reverse())];
    return uniqueIds.map(id => history.find(m => m.id === id));
  }, [history]);

  const onShowAll = (title: string, meditations: Meditation[]) => {
    // @ts-ignore
    navigate('Main', {
      screen: 'GroupedMeditations',
      params: { title, meditations },
    });
  };

  return (
    <View>
      <HorizontalCollection
        shuffle={false}
        title={i18n.t('favorites')}
        items={favMeditations.slice().reverse()}
        onShowAll={() => {
          onShowAll(i18n.t('favorites'), favMeditations.slice().reverse());
        }}
      />
      <Divider className="my-6" />

      <HorizontalCollection
        shuffle={false}
        title={i18n.t('history')}
        items={uniqueHistory}
        onShowAll={() => {
          onShowAll(i18n.t('history'), uniqueHistory);
        }}
      />
    </View>
  );
};

export default MyCollections;
