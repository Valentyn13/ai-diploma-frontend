import CoursesCarousel from '@common/components/CoursesCarousel';
import { Screen, StyledSafeAreaView } from '@common/components/Styled';
import colors from '@common/theme/colors';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

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
    <StyledSafeAreaView>
      <Screen color={colors.bgColor}>
        <CoursesCarousel
          height={height}
          title="ourCourses"
          {...{ selectedCourse }}
          setSelectedCourse={setSelectedCourse}
        />
      </Screen>
    </StyledSafeAreaView>
  );
};

export default Courses;
