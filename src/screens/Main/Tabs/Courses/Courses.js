import CoursesCarousel from '@common/components/CoursesCarousel';
import { Screen, StyledSafeAreaView } from '@common/components/Styled';
import colors from '@common/theme/colors';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';

const Courses = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState();
  const { height } = Dimensions.get('screen');

  useFocusEffect(
    React.useCallback(() => {
      const item = navigation.dangerouslyGetParent().getParam('item', null);
      setSelectedCourse(item);
    }, [navigation, selectedCourse]),
  );

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

Courses.propTypes = {
  navigation: PropTypes.shape({
    dangerouslyGetParent: PropTypes.func.isRequired,
  }).isRequired,
};

export default Courses;
