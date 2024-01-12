import { coursesSelector } from '@store/selectors';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Course } from 'types/Course';

import Carousel2 from './Carosuel';
import { SubTitle } from './Styled';

interface CoursesCarouselProps {
  title: string;
  fullScreen?: boolean;
  selectedCourse?: {
    id: string;
  };
  height?: number;
  isTest?: boolean;
  withParallax?: boolean;
}

const CarouselTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CoursesCarousel: FC<CoursesCarouselProps> = ({
  title,
  fullScreen = true,
  selectedCourse = null,
  withParallax = false,
}) => {
  const courses = useSelector(coursesSelector) as Course[];

  const selected = useMemo(
    () =>
      selectedCourse
        ? courses.findIndex(({ id }) => id === selectedCourse.id)
        : undefined,
    [courses, selectedCourse],
  );

  return (
    <View className="pt-6 px-5">
      <CarouselTitle k={title} />
      <Carousel2
        activeItem={selected}
        withParallax={withParallax}
        fullScreen={fullScreen}
        data={courses.sort((a, b) => b.name.localeCompare(a.name))}
      />
    </View>
  );
};

export default CoursesCarousel;
