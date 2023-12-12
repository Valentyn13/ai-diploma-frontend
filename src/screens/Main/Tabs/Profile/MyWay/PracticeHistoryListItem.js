import {
  ListItemCaption,
  Separator,
  SimpleContainer,
  SubTitle,
  Title,
} from '@common/components/Styled';
import meditationTime from '@utils/meditationTime';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import PracticeHistoryIconedItem from './PracticeHistoryIconedItem';

const RowContainer = styled.View`
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 15px;
  padding-bottom: 15px;
`;

const MeditationInfo = styled.View`
  flex-direction: column;
`;

const CourseInfo = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row-reverse;
  align-self: flex-start;
`;

const CourseTitle = styled(ListItemCaption)`
  padding-left: 30px;
  padding-right: 30px;
`;

export const CustomSeparator = styled.View`
  flex: 1;
  left: -20px;
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.textColor};
`;

const MeditationDuration = styled(SubTitle)`
  margin-top: 5px;
`;

const BadgeListItem = ({ item: { badge } }) => (
  <PracticeHistoryIconedItem icon={badge} isBadge />
);

const MeditationListItem = ({ item: { name, duration, categoryTitle } }) => (
  <SimpleContainer>
    <RowContainer>
      <CourseInfo>
        <CourseTitle t={categoryTitle} />
        <CustomSeparator />
      </CourseInfo>
      <MeditationInfo>
        <Title t={name} />
        <MeditationDuration t={meditationTime(duration)} />
      </MeditationInfo>
    </RowContainer>
    <Separator />
  </SimpleContainer>
);

const PracticeHistoryListItem = ({ item }) =>
  item && item?.type === 'badge' ? (
    <BadgeListItem item={item} />
  ) : (
    <MeditationListItem item={item} />
  );

MeditationListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.number,
    categoryTitle: PropTypes.string,
  }),
};

BadgeListItem.propTypes = {
  item: PropTypes.shape({
    badge: PropTypes.string,
  }),
};

PracticeHistoryListItem.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default PracticeHistoryListItem;
