import { useNavigation } from '@react-navigation/native';
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
  fullScreen?: boolean;
  selectedCourse?: {
    id: string;
  } | null;
  height?: number;
  setSelectedCourse?: (course: any) => void; // Adjust the type accordingly
  isTest?: boolean;
  withParallax?: boolean;
}

const CarouselTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
`;

const CoursesCarousel: FC<CoursesCarouselProps> = ({
  title,
  fullScreen = true,
  selectedCourse = null,
  setSelectedCourse,
  withParallax = false,
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const { navigate } = useNavigation();

  const courses = useSelector(coursesSelector) as Course[];

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
    <View className="pl-2">
      <CarouselTitle k={title} />
      <Carousel2
        withParallax={withParallax}
        fullScreen={fullScreen}
        data={courses.sort((a, b) => b.name.localeCompare(a.name))}
      />
    </View>
  );
};

export default CoursesCarousel;
