import CoursesCarousel from '@common/components/CoursesCarousel';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';

interface CoursesProps {
  navigation: any;
}

const Courses: React.FC<CoursesProps> = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const { height } = Dimensions.get('screen');

  // TODO: REVERT comment
  // useFocusEffect(
  //   useCallback(() => {
  //     const item = navigation.dangerouslyGetParent().getParam('item', null);
  //     setSelectedCourse(item);
  //   }, [navigation]),
  // );

  return (
    <SafeAreaView className="flex-1 bg-[#fdedd6]">
      <CoursesCarousel
        height={height}
        title="ourCourses"
        {...{ selectedCourse }}
        setSelectedCourse={setSelectedCourse}
      />
    </SafeAreaView>
  );
};

export default Courses;
