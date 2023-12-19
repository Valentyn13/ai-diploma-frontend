/* eslint-disable react-native/no-inline-styles */
import { categoryImage } from '@common/assets/images';
import AppText from '@common/components/AppText';
import { usePurchases } from '@common/context/PurchaseContext';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import CourseMeditations from './CourseMeditations';
import { Container, ListItemCaption } from './Styled';

export const HEIGHT_RATIO = {
  TOP: 2.0,
  BOTTOM: 2.5,
};

const TouchableItem = styled.TouchableHighlight.attrs(() => ({
  underlayColor: 'transparent',
  activeOpacity: 1,
}))`
  flex: 1;
  align-self: stretch;
`;

const Item = styled.ImageBackground.attrs(({ index }) => ({
  resizeMode: 'cover',
  borderRadius: 8,
  overflow: 'hidden',
  source: categoryImage('starthere', index),
}))`
  flex: 1;
  margin-bottom: 20px;
  align-self: stretch;
`;

const CourseTitle = styled(ListItemCaption)`
  margin-top: 32px;
`;

const CourseItem = ({ item, index, onItemPress, fullScreen }) =>
  fullScreen ? (
    <Item {...{ index }}>
      <CourseTitle t={item.title} />
    </Item>
  ) : (
    <TouchableItem onPress={onItemPress}>
      <Item {...{ index }}>
        {/* <CourseTitle t={item.title} /> */}
        {/* to navigate to course detail change view to TouchableOpacity and onPress={onAboutPress} */}
        <View
          style={{
            position: 'absolute',
            alignItems: 'flex-start',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'center',
            backgroundColor: '#160f29',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <AppText bold style={{ color: 'white', fontSize: 26 }}>
            {item.title}
          </AppText>
          <AppText style={{ color: 'white', fontSize: 16 }}>
            {item.subTitle}
          </AppText>
        </View>
      </Item>
    </TouchableItem>
  );

const CoursesCarouselItem = ({
  item,
  index,
  onItemPress: onItem,
  onAboutPress: onAbout,
  fullScreen,
}) => {
  const onItemPress = () => onItem(item);
  const onAboutPress = () => onAbout(item);
  const { hasPremium } = usePurchases();

  return (
    <Container>
      <Container flex={fullScreen ? 1 : 1}>
        <CourseItem
          {...{ item, index, onItemPress, onAboutPress, fullScreen }}
        />
      </Container>
      {fullScreen && (
        <Container flex={HEIGHT_RATIO.BOTTOM}>
          <CourseMeditations
            data={item.meditations}
            isCategoryLocked={item.isCategoryLocked}
            hasPremium={hasPremium}
          />
        </Container>
      )}
    </Container>
  );
};

CoursesCarouselItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    meditations: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onItemPress: PropTypes.func.isRequired,
  onAboutPress: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
};

CoursesCarouselItem.defaultProps = {
  // onItemPress: undefined,
  fullScreen: false,
};

CourseItem.propTypes = {
  fullScreen: PropTypes.bool,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onItemPress: PropTypes.func.isRequired,
  onAboutPress: PropTypes.func.isRequired,
};

CourseItem.defaultProps = {
  fullScreen: false,
};

export default CoursesCarouselItem;
