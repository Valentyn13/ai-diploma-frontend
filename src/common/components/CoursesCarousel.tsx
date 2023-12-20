import { useNavigation } from '@react-navigation/native';
import Animation from '@screens/Main/Tabs/Home/Animation';
import isLowResolution from '@utils/isLowResolution';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { coursesSelector } from 'store/selectors';
import styled from 'styled-components/native';
import { Course } from 'types/Course';

import Carousel2 from './Carosuel';
import { ScrollViewContainer, SubTitle } from './Styled';

interface CoursesCarouselProps {
  title: string;
  renderStaticBottomContent?: () => React.ReactNode;
  selectedCourse?: {
    id: string;
  } | null;
  height?: number;
  setSelectedCourse?: (course: any) => void; // Adjust the type accordingly
  isTest?: boolean;
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
    <ScrollViewContainer>
      <Animation />
      <CarouselTitle k={title} />
      <CarouselContainer>
        <Carousel2
          renderStaticBottomContent={renderStaticBottomContent}
          data={courses.reverse()}
        />
        {renderStaticBottomContent && renderStaticBottomContent()}
      </CarouselContainer>
    </ScrollViewContainer>
  );
};

export default CoursesCarousel;
