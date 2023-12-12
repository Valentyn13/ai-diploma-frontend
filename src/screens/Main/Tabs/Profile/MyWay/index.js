import {
  DashedSeparator,
  Screen,
  ScrolledContainer,
} from '@common/components/Styled';
import colors from '@common/theme/colors';
import React from 'react';
import styled from 'styled-components';

import Badges from './Badges';
import PracticeHistory from './PracticeHistory';
import SummaryInfo from './SummaryInfo';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

// const badges = [
//   {
//     icon: 'pot',
//     title: 'שבוע רצוף',
//   },
//   {
//     icon: 'hand1',
//     title: 'סיימת קורס ראשון',
//   },
//   {
//     icon: 'heartSelected',
//     title: 'מועדפים',
//   },
//   {
//     icon: 'stones',
//     title: 'פעם ראשונה',
//   },
// ];

const MyWay = () => (
  <StyledSafeAreaView>
    <Screen color={colors.bgColor}>
      <ScrolledContainer>
        <SummaryInfo />
        <Badges />
        <DashedSeparator />
        <PracticeHistory />
      </ScrolledContainer>
    </Screen>
  </StyledSafeAreaView>
);

export default MyWay;
