import ChatFloatingButton from '@common/components/ChatFloatingButton';
import { AMPLITUDE_EVENTS, ChatTypeData } from '@common/constants';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import React, { FC } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
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

    if (!sessionCount) {
      setCurrentChatId(null);
      setCurrentStep('chat');
      logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.SELECTED_CHAT_CATEGORY(type));
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
      <View className="flex items-start gap-[20px]">
        <Text className="text-[20px] text-[#222222] font-semibold text-left">
          {title}
        </Text>
        <Text className="text-[14px] text-[#222222] text-left leading-5">
          {description}
        </Text>
        {sessionCount && (
          <View className="bg-transparent border border-[#00000024] rounded-[57px] py-[2px] px-[4px]">
            <Text className="text-[16px] text-[#3F3F3F] text-left">
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

type SelectionProps = {
  lastActiveSessionIndex: number;
  categories: ChatTypeData[];
  latestChat: ChatForDrawer | undefined;
  handleOpenRecentChat: () => void;
};

const Selection: FC<SelectionProps> = ({
  lastActiveSessionIndex,
  categories,
  latestChat,
  handleOpenRecentChat,
}) => {
  return (
    <View className="relative px-[16px] pt-[16px] flex flex-1 bg-[#FFF7EE]">
      <View>
        <View className="flex flex-row justify-between">
          <Text className="text-2xl text-[#273051] font-semibold">ליווי</Text>
        </View>
        <Text className="text-base text-[#585858] mb-[15px] text-left">
          בחרו את התחום שברצונכם לחקור ולהעמיק בו:
        </Text>
      </View>
      <View />
      <View className="relative">
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View
              style={{
                height: latestChat ? 152 : 60,
              }}
            />
          }
          data={categories}
          renderItem={renderChatType}
        />
        {latestChat && (
          <ChatFloatingButton
            width={FLOATING_BUTTON_WIDTH}
            lastActiveSessionIndex={lastActiveSessionIndex}
            latestChat={latestChat}
            image_name="michael_chat"
            handleOpenRecentChat={handleOpenRecentChat}
          />
        )}
      </View>
    </View>
  );
};

export default Selection;
