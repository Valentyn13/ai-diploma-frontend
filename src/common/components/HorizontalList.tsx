import SessionCard from '@common/components/SessionCard';
import theme from '@common/theme';
import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

export interface Item {
  id: string;
  name: string;
  duration: number;
  categoryName: string;
}

interface HorizontalListProps {
  data: Item[];
}

const HorizontalList: FC<HorizontalListProps> = ({ data }) => {
  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <SessionCard
        item={item}
        index={index}
        height={264}
        width={theme.dimens.winWidth / 1.8}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 4, gap: 16 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      getItemLayout={(_, index) => ({
        length: theme.dimens.winWidth / 2.4,
        offset: 180 * index,
        index,
      })}
    />
  );
};

export default HorizontalList;
