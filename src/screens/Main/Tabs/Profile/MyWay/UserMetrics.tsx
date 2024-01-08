import i18n from '@services/localization/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const MetricBox = ({ value, title, ...props }) => (
  <View
    className="flex flex-1 text-center h-24 justify-center items-center text-white bg-[#513F73] rounded-lg"
    {...props}>
    <Text className="text-3xl font-bold text-white text-left">{value}</Text>
    <Text className="text-lg text-white text-left">{title}</Text>
  </View>
);

const UserMetrics = () => {
  const { meditationsPracticed, minutesPracticed } = useSelector(
    state => state.userProgress,
  );

  return (
    <View className="flex flex-row flex-wrap content-center items-center gap-4 overflow-hidden p-2">
      <MetricBox
        value={meditationsPracticed.length}
        title={i18n.t('sessions')}
      />
      <MetricBox
        value={Math.round(minutesPracticed)}
        title={i18n.t('minutesSessions')}
      />
    </View>
  );
};

export default UserMetrics;
