import { Icon, SubTitle } from '@common/components/Styled';
import PropTypes from 'deprecated-react-native-prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BadgesContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
  padding-bottom: 28px;
`;

const BadgeWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 2px;
`;

const BadgeTitle = styled(SubTitle)`
  margin-top: 10px;
  text-align: center;
`;

const Badge = ({ badge: { badge } = {} }) => (
  <BadgeWrapper>
    {badge && (
      <>
        <Icon name={badge} size={64} />
        <BadgeTitle k={badge} />
      </>
    )}
  </BadgeWrapper>
);

const Badges = () => {
  const { badgesAchieved } = useSelector(state => state.userProgress);

  return (
    <BadgesContainer>
      <Badge badge={badgesAchieved[0]} />
      <Badge badge={badgesAchieved[1]} />
      <Badge badge={badgesAchieved[2]} />
    </BadgesContainer>
  );
};

Badge.propTypes = {
  badge: PropTypes.shape({
    badge: PropTypes.string,
  }),
};

Badge.defaultProps = {
  badge: {},
};

export default Badges;
