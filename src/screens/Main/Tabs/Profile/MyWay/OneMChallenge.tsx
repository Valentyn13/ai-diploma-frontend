import { SubTitle } from '@common/components/Styled';
import ProgressBar from '@screens/Main/Tabs/Profile/MyWay/ProgressBar';
import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import Card from './Card';

const CHALLANGE_TOTAL = 1000000;

const Title = styled(SubTitle)`
  font-size: 24;
  font-weight: bold;
`;

const OneMChallenge: FC<{
  totalMinutesPracticed: number;
  userMinutes: number;
}> = ({ totalMinutesPracticed, userMinutes }) => {
  const totalProgress = useMemo(
    () => totalMinutesPracticed / CHALLANGE_TOTAL,
    [totalMinutesPracticed],
  );

  const userContribution = useMemo(
    () => userMinutes / totalMinutesPracticed,
    [userMinutes, totalMinutesPracticed],
  );

  return (
    <View>
      <Title className="mb-4" t="אתגר #מיליוןדקות של מדיטציה" />
      <Card>
        <View className="flex-row justify-between mb-4">
          <Text className="text-black">
            {totalMinutesPracticed
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            דקות מתוך{' '}
            {CHALLANGE_TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          </Text>
          <Text>{Math.round(totalProgress * 100)}%</Text>
        </View>
        <ProgressBar progress={Math.round(totalProgress * 100)} />
        <Text className="text-left text-xs text-[#160F29] opacity-70 mt-2">
          התרומה שלך עומדת על {(userContribution * 100).toFixed(2)}% מהסך הכולל
          של דקות מדיטציה של כל המשתמשים
        </Text>
      </Card>
    </View>
  );
};

export default OneMChallenge;
