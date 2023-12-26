import { useNavigation } from '@react-navigation/native';
import isLowResolution from '@utils/isLowResolution';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { coursesSelector } from 'store/selectors';
import styled from 'styled-components/native';
import { Course } from 'types/Course';

import Carousel2 from './Carosuel';
import { SubTitle } from './Styled';

interface CoursesCarouselProps {
  title: string;
  renderStaticBottomContent?: () => React.ReactNode;
  selectedCourse?: {
    id: string;
  } | null;
  height?: number;
  setSelectedCourse?: (course: any) => void; // Adjust the type accordingly
  isTest?: boolean;
  withParallax?: boolean;
}

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

const CoursesCarousel: FC<CoursesCarouselProps> = ({
  title,
  renderStaticBottomContent = null,
  selectedCourse = null,
  setSelectedCourse,
  withParallax = false,
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const { navigate } = useNavigation();

  const courses = useSelector(coursesSelector) as Course[];

  const fullScreen = renderStaticBottomContent === null;

  const onItemPress = (item: any) => {
    navigate('Courses', { item });
  };

  useEffect(() => {
    if (fullScreen && selectedCourse) {
      const idx = courses.findIndex(({ id }) => id === selectedCourse.id);
      const newselected = courses.find(({ id }) => id === selectedCourse.id);
      setSelectedCourse?.(newselected);
      setActiveItem(idx);
    }
  }, [courses, fullScreen, selectedCourse, setSelectedCourse]);

  return (
    <View className="pt-4">
      <CarouselTitle k={title} />
      <CarouselContainer>
        <Carousel2
          withParallax={withParallax}
          renderStaticBottomContent={renderStaticBottomContent}
          data={courses.sort((a, b) => b.name.localeCompare(a.name))}
        />
        {renderStaticBottomContent && renderStaticBottomContent()}
      </CarouselContainer>
    </View>
  );
};

export default CoursesCarousel;
