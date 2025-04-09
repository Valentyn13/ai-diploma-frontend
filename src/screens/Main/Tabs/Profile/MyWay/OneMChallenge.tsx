import ProgressBar from '@screens/Main/Tabs/Profile/MyWay/ProgressBar';
import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';

import Card from './Card';

const CHALLANGE_TOTAL = 1500;

const OneMChallenge: FC<{
  totalMinutesPracticed: number;
  userMinutes: number;
}> = ({ totalMinutesPracticed = 0, userMinutes }) => {
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
      <Text className="mb-5 font-bold text-2xl">
        אתגר #מיליוןדקות של מדיטציה
      </Text>
      <Card>
        <View className="flex-row justify-between mb-4">
          <Text className="text-black">
            {totalMinutesPracticed
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            דקות מתוך{' '}
            {CHALLANGE_TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          </Text>
          <Text className="text-black">{Math.round(totalProgress * 100)}%</Text>
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
