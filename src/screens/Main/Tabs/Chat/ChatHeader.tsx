import { CircleButton } from '@common/components/buttons/CircleButton';
import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const GlitterIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 61"
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M24.722 12.58C21.833 9.69 19.856 4.642 18.875.051c-.983 4.592-2.958 9.64-5.847 12.53C10.138 15.468 5.09 17.445.5 18.43c4.592.98 9.639 2.957 12.527 5.846 2.89 2.89 4.866 7.936 5.85 12.528.98-4.593 2.957-9.64 5.845-12.53 2.889-2.888 7.937-4.864 12.527-5.848-4.591-.98-9.638-2.958-12.528-5.847ZM43.486 35.717c-1.724-1.725-2.908-4.742-3.494-7.484-.587 2.742-1.766 5.759-3.492 7.485-1.727 1.724-4.742 2.906-7.484 3.493 2.743.587 5.758 1.768 7.484 3.494 1.726 1.725 2.907 4.741 3.494 7.484.586-2.744 1.767-5.759 3.493-7.485 1.725-1.725 4.741-2.907 7.483-3.495-2.742-.586-5.758-1.767-7.484-3.492ZM12.886 41.619c-.493 2.302-1.483 4.835-2.932 6.284-1.449 1.448-3.98 2.44-6.283 2.933 2.302.494 4.834 1.483 6.283 2.933 1.449 1.448 2.44 3.98 2.934 6.283.492-2.304 1.483-4.835 2.932-6.284 1.448-1.449 3.98-2.44 6.282-2.934-2.302-.492-4.834-1.483-6.283-2.932-1.448-1.448-2.44-3.98-2.933-6.283Z"
    />
  </Svg>
);

const ChatHeader: FC<{
  title: string;
  avatarUri: string;
  onNew: () => void;
}> = ({ title, avatarUri, onNew }) => {
  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <Image source={{ uri: avatarUri }} className="w-10 h-10 rounded-full" />
        <Text className="text-black font-normal text-xl ml-2">{title}</Text>
        <GlitterIcon className="w-6 h-6 ml-1" />
      </View>
      <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={onNew}
        size={40}
        icon="rotate-right"
      />
    </View>
  );
};

export default ChatHeader;
