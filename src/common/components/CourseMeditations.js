import captureMessage from '@utils/captureMessage';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components';

import CourseRowItem from './CourseRowItem';

const List = styled(FlatList).attrs(() => ({
  showsVerticalScrollIndicator: false,
  scrollEnabled: false,
}))`
  align-self: stretch;
`;

const CourseMeditations = ({ data, isCategoryLocked, hasPremium }) => {
  const { navigate } = useNavigation();
  const onPress = useCallback(
    item => navigate('MeditationPlayer', { item }),
    [navigate],
  );

  const renderItem = ({ item, index }) => {
    return (
      <CourseRowItem
        {...{ item, index, onPress, isCategoryLocked, navigate, hasPremium }}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <List
      {...{ data, renderItem }}
      keyExtractor={({ id }) => `${id.toString()}`}
      onScrollToIndexFailed={info => {
        captureMessage(
          `scrollToIndex failed in CourseMeditation. index=${info.index}`,
        );
      }}
    />
  );
};

CourseMeditations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  isCategoryLocked: PropTypes.bool.isRequired,
  hasPremium: PropTypes.bool.isRequired,
};

export default CourseMeditations;
