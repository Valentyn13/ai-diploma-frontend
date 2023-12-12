import {
  Icon,
  Separator,
  SimpleContainer,
  Title,
} from '@common/components/Styled';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';

const IconedItemContainer = styled(SimpleContainer)`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 7px;
  padding-right: 7px;
`;

const SectionTitle = styled(Title)`
  margin-left: 15px;
  margin-right: 15px;
`;

const PracticeHistoryIconedItem = ({
  theme: {
    colors: { itemBgColor },
  },
  icon,
  isBadge,
}) => (
  <>
    <IconedItemContainer color={isBadge ? itemBgColor : 'transparent'}>
      <Icon name={icon} size={50} />
      {isBadge && <SectionTitle k={icon} />}
    </IconedItemContainer>
    <Separator />
  </>
);

PracticeHistoryIconedItem.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      itemBgColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  icon: PropTypes.string.isRequired,
  isBadge: PropTypes.bool,
};

PracticeHistoryIconedItem.defaultProps = {
  isBadge: false,
};

export default withTheme(PracticeHistoryIconedItem);
