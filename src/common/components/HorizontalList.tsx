import MeditationItem from '@common/components/MeditationItem';
import theme from '@common/theme';
import React, { FC, useMemo } from 'react';
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

  const uniqueRandomKey = useMemo(
    () => Math.random().toString(36).substring(2, 15),
    [],
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      // add gap between items
      keyExtractor={(item: any) =>
        `${item.id || item.name || item.title}-${uniqueRandomKey}`
      }
      getItemLayout={(_, index) => ({
        length: theme.dimens.winWidth / 2.4,
        offset: 180 * index,
        index,
      })}
    />
  );
};

export default HorizontalList;
