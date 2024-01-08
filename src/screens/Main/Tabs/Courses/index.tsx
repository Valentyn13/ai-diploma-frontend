import CoursesCarousel from '@common/components/CoursesCarousel';
import { useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';

interface CoursesProps {
  navigation: any;
}

const Courses: FC<CoursesProps> = () => {
  const route = useRoute<any>();
  const { item: selectedCourse } = route.params || {};
  const { height } = Dimensions.get('screen');

  return (
    <SafeAreaView className="flex-1 bg-[#fdedd6]">
      <CoursesCarousel
        height={height}
        title="ourCourses"
        selectedCourse={selectedCourse}
      />
    </SafeAreaView>
  );
};

export default Courses;
