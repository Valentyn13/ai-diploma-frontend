import { Icon } from '@common/components/Styled';
import i18n from '@services/localization/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Badge = ({ badge: { badge } = {} }) => (
  <View className="flex-1 flex items-center">
    <View className="flex items-center justify-center w-16 h-16 rounded-full bg-[#513F73]">
      <Icon name={badge} size={40} color="#fff" />
    </View>
    <Text className="text-lg text-black text-center mt-4">{i18n.t(badge)}</Text>
  </View>
);

const Badges = () => {
  const { badgesAchieved } = useSelector(state => state.userProgress);

  return (
    <View className="flex flex-row">
      {badgesAchieved.map(badge => (
        <Badge key={badge.badge} badge={badge} />
      ))}
    </View>
  );
};

export default Badges;
