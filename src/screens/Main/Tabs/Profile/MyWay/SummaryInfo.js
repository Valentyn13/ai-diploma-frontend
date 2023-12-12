import { BigTitle, Container, TopTitle } from '@common/components/Styled';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SummaryInfoContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const MetricWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const MetricTitle = styled(TopTitle)`
  margin-top: 10px;
  text-align: center;
`;

const SummaryMetric = ({ value, title }) => (
  <MetricWrapper>
    <BigTitle t={`${value}`} />
    <MetricTitle t={title} />
  </MetricWrapper>
);
const SummaryInfo = () => {
  const { meditationsPracticed, minutesPracticed } = useSelector(
    state => state.userProgress,
  );

  return (
    <SummaryInfoContainer>
      <SummaryMetric value={meditationsPracticed.length} title="תרגולים" />
      <Container flex={0.5} />
      <SummaryMetric
        value={minutesPracticed.toFixed(2)}
        title="דקות במדיטציה"
      />
    </SummaryInfoContainer>
  );
};

// SummaryMetric.propTypes = {
//   value: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
// };

export default SummaryInfo;
