import { getCategoryImgName } from '@common/assets/images';
import AppText from '@common/components/AppText';
import { usePurchases } from '@common/context/PurchaseContext';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import CourseMeditations from './CourseMeditations';
import { Container, ListItemCaption } from './Styled';

const BGS_ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/bgs/';

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
  source: { uri: `${BGS_ASSETS_URL}${getCategoryImgName('starthere', index)}` },
}))`
  flex: 1;
  margin-bottom: 20px;
  width: 100%;
`;

const CourseTitle = styled(ListItemCaption)`
  margin-top: 32px;
`;

const CourseItem = ({ item, index, onPress, fullScreen }) =>
  fullScreen ? (
    <Item index={index}>
      <CourseTitle t={item.title} />
    </Item>
  ) : (
    <TouchableItem onPress={onPress}>
      <Item index={index}>
        <View className="absolute bottom-0 w-full bg-[#160f29] px-4 py-2 justify-center items-start rounded-b-lg">
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

const CoursesCarouselItem = ({ item, index, onPress, fullScreen }) => {
  const { hasPremium } = usePurchases();

  return (
    <Container>
      <CourseItem
        index={index}
        item={item}
        onPress={onPress}
        fullScreen={fullScreen}
      />
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
  onPress: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
};

CoursesCarouselItem.defaultProps = {
  fullScreen: false,
};

CourseItem.propTypes = {
  fullScreen: PropTypes.bool,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

CourseItem.defaultProps = {
  fullScreen: false,
};

export default CoursesCarouselItem;
