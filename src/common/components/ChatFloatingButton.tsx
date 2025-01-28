import image from '@common/assets/images';
import { CATEGORY_NAMES } from '@common/constants';
import { FC } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ChatForDrawer } from 'types/Chat';

type ChatFloatingButtonProps = {
  width: number;
  lastActiveSessionIndex: number;
  latestChat: ChatForDrawer | undefined;
  handleOpenRecentChat: () => void;
  image_name: string;
  buttonUnderlayColor?: string;
};
const ChatFloatingButton: FC<ChatFloatingButtonProps> = ({
  width,
  lastActiveSessionIndex,
  latestChat,
  handleOpenRecentChat,
  image_name,
  buttonUnderlayColor = '#212242',
}) => {
  const categoryName = latestChat?.category || '';

  return (
    <TouchableHighlight
      onPress={handleOpenRecentChat}
      activeOpacity={1}
      underlayColor={buttonUnderlayColor}
      style={{ width }}
      className="absolute bottom-[83px] right-[12px] bg-[#273051] h-[64px] rounded-[12px] py-[12px] pl-[12px] pr-[25px]">
      <View className="flex items-start justify-center h-full">
        <View className="flex-row gap-[10px]">
          <View className="overflow-hidden relative w-[48px] h-[48px] rounded-full">
            <FastImage
              className="w-full h-full rounded-full"
              source={image(image_name)}
            />
          </View>
          <View className="flex-1 pl-[20px]">
            <Text className="text-[#FFFFFF] mb-0.5 text-base font-medium text-left">
              המשך שיחה
            </Text>
            <Text
              numberOfLines={1}
              className="text-[#FFFFFF] text-[14px] w-[85%] text-left">
              {/* TODO: add proper banner text for last categories */}
              {`${CATEGORY_NAMES[categoryName]} פגישה ${lastActiveSessionIndex}`}
            </Text>
          </View>
        </View>
        <View className="absolute m-auto left-0 right-0">
          <Icon name="chevron-left" color={'white'} size={21} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatFloatingButton;
