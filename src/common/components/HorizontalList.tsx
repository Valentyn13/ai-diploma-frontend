import { dimens } from '@common/theme';
import { captureMessage } from '@sentry/react-native';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import HorizontalListItem from './HorizontalListItem';

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

export const ITEM_WIDTH = (big?: boolean): number =>
  dimens.winWidth / (big ? 2.4 : 2.4);

const HorizontalList: FC<HorizontalListProps> = ({
  data,
  big = false,
  height = 'medium',
  renderUsing = null,
}) => {
  const Child = renderUsing || HorizontalListItem;

  const renderItem: ListRenderItem<any> = ({ item, index }): ReactElement => {
    return <Child item={item} index={index} big={big} height={height} />;
  };

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={true}
      data={data}
      renderItem={renderItem}
      initialNumToRender={10}
      keyExtractor={(item: any) => item.id || item.name}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH(big),
        offset: ITEM_WIDTH(big) * index,
        index,
      })}
      onScrollToIndexFailed={info => {
        captureMessage(
          `scrollToIndex failed in HorizontalList. index=${info.index}`,
        );
      }}
    />
  );
};

export default HorizontalList;
