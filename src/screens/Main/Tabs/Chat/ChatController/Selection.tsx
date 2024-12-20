import image from '@common/assets/images';
import { AMPLITUDE_EVENTS, ChatTypeData } from '@common/constants';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import React, { FC } from 'react';
import {
  Dimensions,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ChatForDrawer } from 'types/Chat';

const WINDOW_WIDTH = Dimensions.get('window').width;
const CONATAINER_X_PADDINGS = 32;
const FLOAING_BUTTON_X_MARGINS = 24;

const FLOATING_BUTTON_WIDTH =
  WINDOW_WIDTH - CONATAINER_X_PADDINGS - FLOAING_BUTTON_X_MARGINS;

const ChatType: FC<ChatTypeData> = ({
  title,
  type,
  description,
  sessionCount,
  bgColor,
}) => {
  const { setCurrentStep, setSelectedCategory } = useCategorizedChatFlowStore(
    state => ({
      setCurrentStep: state.setCurrentStep,
      setSelectedCategory: state.setSelectedCategory,
    }),
  );
  const setCurrentChatId = useChatsStore(state => state.setCurrentChatId);

  const handleSelectCategory = () => {
    setSelectedCategory(type);
    if (type === null) {
      setCurrentChatId(null);
      setCurrentStep('chat');
      logAmplitudeEvent(
        AMPLITUDE_EVENTS.CHATS.SELECTED_CHAT_CATEGORY('free_chat'),
      );
      return;
    }
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.SELECTED_CHAT_CATEGORY(type));
    setCurrentStep('list');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="px-[16px] py-[24px] mb-[12px] rounded-[12px]"
      style={{ backgroundColor: bgColor }}
      onPress={handleSelectCategory}>
      <View className="flex items-start gap-[26px]">
        <Text className="text-base text-[#273051] font-bold text-left">
          {title}
        </Text>
        <Text className="text-base text-[#585858] text-left">
          {description}
        </Text>
        {sessionCount && (
          <View className="bg-transparent border border-[#00000024] rounded-[57px] py-[2px] px-[4px]">
            <Text className="text-base text-[#585858] text-left">
              {sessionCount} מפגשים נעשו
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const renderChatType = ({ item }: any) => {
  return <ChatType {...item} />;
};

const ChatTypesHeader = () => {
  return (
    <Text className="text-base text-[#585858] mb-[25px] text-left">
      בחרו את התחום שברצונכם לחקור ולהעמיק בו:
    </Text>
  );
};

type SelectionProps = {
  lastActiveSessionIndex: number;
  categories: ChatTypeData[];
  latestChat: ChatForDrawer | undefined;
};

const Selection: FC<SelectionProps> = ({
  lastActiveSessionIndex,
  categories,
  latestChat,
}) => {
  const { setCurrentChatId } = useChatsStore(state => ({
    setCurrentChatId: state.setCurrentChatId,
  }));
  const { lastActiveSessionId, setCurrentStep, setSelectedCategory } =
    useCategorizedChatFlowStore(state => ({
      lastActiveSessionId: state.lastActiveSessionId,
      setCurrentStep: state.setCurrentStep,
      setSelectedCategory: state.setSelectedCategory,
    }));

  const handleOpenRecentChat = () => {
    logAmplitudeEvent(
      AMPLITUDE_EVENTS.CHATS.PRESSED_CONTINUE_LAST_CONVERSATION_CTA,
    );
    setCurrentStep('chat');
    setSelectedCategory(latestChat?.category || null);
    setCurrentChatId(lastActiveSessionId);
  };

  const handleGoToFreeChat = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_FREE_CHAT_BUTTON);
    setCurrentChatId(null);
    setCurrentStep('chat');
    setSelectedCategory(null);
  };

  return (
    <View className="relative px-[16px] pt-[16px] flex flex-1 bg-[#FFF7EE]">
      <View>
        <View className="flex flex-row justify-between mb-[15px]">
          <Text className="text-2xl text-[#273051] font-bold">ליווי</Text>
          <TouchableOpacity
            onPress={handleGoToFreeChat}
            className="bg-[#908883] py-[8px] px-[10px] rounded-[37px]">
            <Text className="text-base text-[#FFFFFF] font-bold">
              צ׳אט חופשי
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View />
      <View className="relative">
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ChatTypesHeader}
          ListFooterComponent={
            <View
              style={{
                height: latestChat ? 142 : 60,
              }}
            />
          }
          data={categories}
          renderItem={renderChatType}
        />
        {latestChat && (
          <TouchableHighlight
            onPress={handleOpenRecentChat}
            activeOpacity={1}
            underlayColor={'#212242'}
            style={{ width: FLOATING_BUTTON_WIDTH }}
            className="h-[70px] bg-[#273051] rounded-[12px] absolute bottom-[70px]  right-[12px] py-[12px] pl-[12px] pr-[25px]">
            <View className="flex items-start justify-center h-full">
              <View className="flex-row gap-[10px]">
                <View className="overflow-hidden relative w-[52px] h-[52px] rounded-full">
                  <FastImage
                    className="w-full h-full rounded-full"
                    source={image('michael_chat')}
                  />
                </View>
                <View className="flex-1 pl-[20px]">
                  <Text className="text-base text-[#FFFFFF] font-semibold text-left">
                    המשך שיחה
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[14px] w-[85%] text-[#FFFFFF] text-left">
                    {`${lastActiveSessionIndex + 1}. ${
                      latestChat.firstMessageContent
                    }`}
                  </Text>
                </View>
              </View>
              <View className="absolute m-auto left-0 right-0">
                <Icon name="chevron-left" color={'white'} size={21} />
              </View>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default Selection;
