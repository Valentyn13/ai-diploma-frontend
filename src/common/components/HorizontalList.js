import { captureMessage } from '@sentry/react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import HorizontalListItem from './HorizontalListItem';

const List = styled(FlatList).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

const HorizontalList = ({ data, big, height, renderUsing }) => {
  const Child = renderUsing || HorizontalListItem;

  const renderItem = ({ item, index }) => {
    return <Child {...{ item, index, big, height }} />;
  };

  renderItem.propTypes = {
    item: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <List
      {...{ data, renderItem }}
      initialNumToRender={10}
      keyExtractor={item => item.id}
      getItemLayout={(_data, index) => ({
        length: Child.ITEM_WIDTH(big),
        offset: Child.ITEM_WIDTH(big) * index,
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

HorizontalList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  big: PropTypes.bool,
  height: PropTypes.string,
  renderUsing: PropTypes.elementType,
};

HorizontalList.defaultProps = {
  big: false,
  height: 'medium',
  renderUsing: null,
};

export default HorizontalList;
