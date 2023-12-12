import CoursesCarousel from '@common/components/CoursesCarousel';
import HorizontalList from '@common/components/HorizontalList';
import {
  BoldTitle,
  Screen,
  ScrolledContainer,
  Title,
  TopTitle,
  TouchableIcon,
} from '@common/components/Styled';
import i18n from '@services/localization/i18n';
import { categoryMeditations } from '@utils/dbQueries';
import React from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styled from 'styled-components';

import { courses } from '../../../../db';

const Header = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
`;

const AppNameTitle = styled(TopTitle)`
  align-self: stretch;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Info = styled(Title)`
  margin-top: 9px;
  margin-bottom: 9px;
`;

const CategoryCoursesTitle = styled(TopTitle)`
  margin-top: 50px;
  margin-bottom: 15px;
`;

const CoursesCarouselWrapper = styled.View`
  height: 300;
  margin-top: 100px;
`;

const CategoryDetails = () => {
  const { goBack } = useNavigation();
  const { id, name, info } = useNavigationParam('category');
  const onClose = () => goBack();
  return (
    <Screen>
      <AppNameTitle k="appName" />
      <ScrolledContainer>
        <Header>
          <BoldTitle t={name} />
          <TouchableIcon name="close" onPress={onClose} />
        </Header>
        <Info t={info} />
        <TopTitle k="mentors" />
        <CoursesCarouselWrapper>
          <CoursesCarousel
            data={courses}
            title="categoryCourses"
            showAboutButton
            isHomeTab
          />
        </CoursesCarouselWrapper>
        <CategoryCoursesTitle t={`${i18n.t('categoryMeditations')} ${name}`} />
        <HorizontalList data={categoryMeditations(id)} />
      </ScrolledContainer>
    </Screen>
  );
};

export default CategoryDetails;
