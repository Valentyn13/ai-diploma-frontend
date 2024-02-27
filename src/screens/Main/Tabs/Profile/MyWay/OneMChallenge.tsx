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

const OneMChallenge: FC<{ totalMinutesPracticed: number }> = ({
  totalMinutesPracticed,
}) => {
  const progress = useMemo(
    () => totalMinutesPracticed / CHALLANGE_TOTAL,
    [totalMinutesPracticed],
  );

  return (
    <View>
      <Title className="mb-4" t="אתגר #מיליוןדקות של מדיטציה" />
      {/* <Text className="text-center text-black mb-5">
        כל דקת מדיטציה שאתם עושים נספרת לעבר מטרה משותפת - להגיע למיליון דקות של
        מדיטציה! זו הזדמנות נהדרת להיות חלק ממשהו גדול יותר תוך כדי חיזוק
        המודעות והרוגע הפנימי שלכם.
      </Text> */}
      <Card>
        <View className="flex-row justify-between mb-4">
          <Text className="text-black">
            {totalMinutesPracticed
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            דקות מתוך{' '}
            {CHALLANGE_TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          </Text>
          <Text>{Math.round(progress * 100)}%</Text>
        </View>
        <ProgressBar progress={Math.round(progress * 100)} />
        <Text className="text-left text-xs text-[#160F29] opacity-70 mt-2">
          סה״כ דקות מדיטציה של כלל משתמשי האפליקציה.
        </Text>
      </Card>
    </View>
  );
};

export default OneMChallenge;
