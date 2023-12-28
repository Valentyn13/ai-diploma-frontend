import MeditationItem from '@common/components/MeditationItem';
import { dimens } from '@common/theme';
import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

interface Item {
  id: string;
}

interface HorizontalListProps {
  data: Item[];
  big?: boolean;
  height?: string;
  renderUsing?: React.ElementType<{
    item: Item;
    index: number;
    big?: boolean;
    height?: string;
  }>;
}

export const ITEM_WIDTH = (): number => dimens.winWidth / 2.4;

const HorizontalList: FC<HorizontalListProps> = ({
  data,
  big = false,
  height = 'medium',
  renderUsing = null,
}) => {
  const Child = renderUsing || MeditationItem;

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <Child
        horizontal={true}
        item={item}
        index={index}
        big={big}
        height={height}
      />
    );
  };

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id || item.name}
    />
  );
};

export default HorizontalList;
