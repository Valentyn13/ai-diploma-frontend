import colors from '@common/theme/colors';
import dimens from '@common/theme/dimens';
import { useNavigation } from '@react-navigation/native';
import { captureMessage } from '@sentry/react-native';
import isLowResolution from '@utils/isLowResolution';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { coursesSelector } from 'store/selectors';
import styled from 'styled-components';

import CoursesCarouselItem, { HEIGHT_RATIO } from './CoursesCarouselItem';
import { Container, ScrollViewContainer, SubTitle } from './Styled';

const CarouselContainer = styled.View`
  flex: 1;
  margin-top: ${isLowResolution ? 0 : 10}px;
  margin-bottom: ${isLowResolution ? 0 : 20}px;
`;

const CarouselTitle = styled(SubTitle)`
  margin-bottom: 10px;
  margin-left: 25px;
  font-size: 18px;
  font-weight: bold;
`;

const paginationDotStyle = {
  width: 5,
  height: 5,
  borderRadius: 3,
};

const paginationContainerStyle = {
  alignSelf: 'stretch',
  paddingVertical: 10,
};

const CoursesCarousel = ({
  title,
  renderStaticBottomContent,
  selectedCourse,
  height,
  setSelectedCourse,
  isTest = false,
}) => {
  const width = dimens.winWidth - 2 * dimens.margin;

  const [activeItem, setActiveItem] = useState(0);
  const { navigate } = useNavigation();

  const courses = useSelector(coursesSelector);

  const fullScreen = renderStaticBottomContent === null;

  const onItemPress = item => {
    navigate('Courses', { item });
  };

  const onAboutPress = item => {
    // navigate('AboutCourseForHome', {item});
  };

  const renderItem = ({ item, index }) => {
    return (
      <CoursesCarouselItem
        {...{ item, index, fullScreen, onItemPress, onAboutPress, isTest }}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
  };

  useEffect(() => {
    if (fullScreen || isTest) {
      if (selectedCourse) {
        const idx = courses.findIndex(({ id }) => id === selectedCourse.id);
        const newselected = courses.find(({ id }) => id === selectedCourse.id);
        setSelectedCourse(newselected);
        setActiveItem(idx);
      }
    }
  }, [courses, fullScreen, selectedCourse]);

  // useEffect(() => {
  //   if (fullScreen) {
  //   }
  // }, [activeItem, fullScreen]);

  return (
    <ScrollViewContainer>
      <CarouselContainer>
        <Pagination
          {...{
            dotsLength: courses.length,
            activeDotIndex: activeItem,
            dotStyle: paginationDotStyle,
            containerStyle: paginationContainerStyle,
            dotColor: colors.carouselActiveDotColor,
            inactiveDotColor: colors.carouselInactiveDotColor,
            inactiveDotScale: 1.0,
          }}
        />
        <CarouselTitle k={title} />
        <Container
          style={{ height: height ?? 'auto' }}
          flex={renderStaticBottomContent ? HEIGHT_RATIO.TOP : 1}>
          <Carousel
            {...{
              firstItem: activeItem,
              initialScrollIndex: activeItem,
              data: courses,
              renderItem,
              useNativeDriver: true,
              onBeforeSnapToItem: setActiveItem,
              sliderWidth: width,
              itemWidth: width,
              sliderHeight: 300,
              itemHeight: 300,
            }}
            keyExtractor={item => item.id}
            enableSnap
            onScrollToIndexFailed={info => {
              captureMessage(
                `scrollToIndex failed in CoursesCarousel. index=${info.index}`,
              );
            }}
          />
        </Container>
        {renderStaticBottomContent && renderStaticBottomContent()}
      </CarouselContainer>
    </ScrollViewContainer>
  );
};

CoursesCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  renderStaticBottomContent: PropTypes.func,
  selectedCourse: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

CoursesCarousel.defaultProps = {
  renderStaticBottomContent: null,
  selectedCourse: null,
};

export default CoursesCarousel;
