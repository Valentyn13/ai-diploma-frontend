import FavoriteButton from '@common/components/FavoriteButton';
import meditationTime from '@utils/meditationTime';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Meditation } from 'types/Meditation';

interface CourseRowItemProps {
  item: Meditation;
  onPress: () => void;
  index: number;
  isListened: boolean;
}

const CourseRowItem: React.FC<CourseRowItemProps> = ({
  item,
  onPress,
  index,
  isListened,
}) => {
  const { name, id, duration } = item;

  return (
    <TouchableOpacity
      className="flex flex-row justify-between items-center py-4 px-5 border-b border-[#513F73]/10"
      onPress={onPress}>
      <View>
        <Text
          style={{
            textDecorationLine: isListened ? 'line-through' : 'none',
          }}
          className="text-lg font-normal mt-4 text-black text-left"
          numberOfLines={1}>{`${index + 1}. ${name}`}</Text>
        <Text
          style={{
            textDecorationLine: isListened ? 'line-through' : 'none',
          }}
          className="text-sm font-normal mt-1 text-[#513F73] text-left ml-4">
          {meditationTime(duration)}
        </Text>
      </View>
      <View>
        <FavoriteButton id={id} isDark={true} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CourseRowItem);
