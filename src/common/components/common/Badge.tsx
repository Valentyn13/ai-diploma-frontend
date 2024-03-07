import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BadgeProps {
  label: string;
  emoji: string;
  isSelected: boolean;
  onPress?: () => void;
}

const Badge: FC<BadgeProps> = ({
  label,
  emoji,
  isSelected = false,
  onPress = () => {},
}) => {
  const containerStyle = isSelected ? 'bg-blue-500' : 'bg-[#F7F7F7]';

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`flex-row items-center ${containerStyle} rounded-full px-2 py-1 mr-2.5 elevation-3`}>
        <Text className="text-lg mr-1">{label}</Text>
        <Text className="text-lg">{emoji}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Badge;
