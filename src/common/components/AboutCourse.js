import image from '@common/assets/images';
import Button from '@common/components/Button';
import {
  ListItemCaption,
  ScrolledContainer,
  Title,
  TopTitle,
} from '@common/components/Styled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { instructorById } from '@utils/dbQueries';
import React from 'react';
import styled from 'styled-components';

const Content = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const CourseImage = styled.ImageBackground.attrs(() => ({
  resizeMode: 'cover',
  source: image('tempBg'),
}))`
  height: 200;
  justify-content: flex-end;
`;

const CourseTitle = styled(ListItemCaption)`
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  top: -20;
  right: 0;
  left: 0;
  height: 40;
  width: ${({ theme: { dimens } }) => dimens.winWidth};
  align-items: center;
  justify-content: center;
`;

const CourseInfoTitle = styled(TopTitle)`
  align-self: flex-start;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const InstructorInfo = styled(Title)`
  margin-top: 50px;
`;

const AbourCourse = () => {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { name, info, instructor, title } = route.params?.item || {};
  const { info: instructorInfo } = instructorById(instructor);
  return (
    <ScrolledContainer>
      <CourseImage>
        <CourseTitle t={title} />
      </CourseImage>
      <Content>
        <ButtonWrapper>
          <Button title="close" onPress={() => goBack()} />
        </ButtonWrapper>
        <InstructorInfo t={instructorInfo} />
        <CourseInfoTitle t={title} />
        <Title t={info} />
      </Content>
    </ScrolledContainer>
  );
};

export default AbourCourse;
