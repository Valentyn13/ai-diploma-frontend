import HorizontalList from '@common/components/HorizontalList';
import { DashedSeparator, Title, TopTitle } from '@common/components/Styled';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CategoryMeditationsContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 17px;
`;

const CategoryTitle = styled(TopTitle)`
  font-weight: bold;
  margin-left: 15px;
`;

const Info = styled(Title)`
  margin: 15px 15px 17px;
`;

const Separator = styled(DashedSeparator)`
  margin: 15px ${({ theme: { dimens } }) => dimens.margin}px 0px;
`;

const CategoryMeditations = ({
  category: { title, info, height },
  meditations,
}) => (
  <CategoryMeditationsContainer>
    <CategoryTitle t={title} />
    {info !== null && info !== undefined && <Info t={info} />}
    <HorizontalList data={meditations} height={height} />
    <Separator />
  </CategoryMeditationsContainer>
);

CategoryMeditations.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string,
    height: PropTypes.string,
  }).isRequired,
  meditations: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};
export default CategoryMeditations;
