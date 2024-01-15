import React, { FC, useCallback } from 'react';
import { FlatList } from 'react-native';
import { Meditation } from 'types/Meditation';

import MeditationItem from './MeditationItem';

const SessionsGrid: FC<{ meditations: Meditation[]; title?: string }> = ({
  meditations,
}) => {
  const renderMeditationItem = useCallback(
    ({ item, index }) => (
      <MeditationItem key={item.id} item={item} index={index} />
    ),
    [],
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingTop: 40,
        paddingBottom: 40,
        rowGap: 20,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      scrollEnabled={false}
      data={meditations}
      keyExtractor={item => item.id}
      renderItem={renderMeditationItem}
      numColumns={2}
    />
  );
};

export default SessionsGrid;
