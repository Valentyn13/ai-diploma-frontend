import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { AMPLITUDE_EVENTS } from '@common/constants';
import Theme from '@common/theme';
import { deleteChat } from '@services/api/chat';
import { useRequestWithReauth } from '@services/hooks/useAxios/reauthWrapper';
import useOverrideBackGesture from '@services/hooks/useOverrideBackGesture';
import {
  ChatCategories,
  ChatCategoriesEnum,
  useCategorizedChatFlowStore,
} from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { getReadableTimeDifference } from '@utils/time';
import React from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';
import { Source } from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';
import { ChatForDrawer } from 'types/Chat';

const BG_IMAGES: Record<Partial<ChatCategoriesEnum>, Source> = {
  anxiety: require('./bgs/anxiety.png'),
  negative: require('./bgs/negative.png'),
  self_dev: require('./bgs/self_dev.png'),
  bad_habits: require('./bgs/bad_habits.png'),
};

type ChatItemProps = {
  chat: ChatForDrawer;
  index: number;
};

const ChatItem = ({
  chat: { chatId, firstMessageContent, firstMessageTimestamp },
  index,
}: ChatItemProps) => {
  const { executeApiRequest } = useRequestWithReauth();
  const setCurrentStep = useCategorizedChatFlowStore(
    state => state.setCurrentStep,
  );
  const {
    setCurrentChatId,
    removeChat,
    setDeleteCallback,
    setIsDeleteModalVisible,
  } = useChatsStore(state => ({
    setIsDeleteModalVisible: state.setIsDeleteModalVisible,
    setCurrentChatId: state.setCurrentChatId,
    removeChat: state.removeChat,
    setDeleteCallback: state.setDeleteCallback,
  }));

  const handleOnChatPress = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_EXISTING_CHAT('category'));
    setCurrentStep('chat');
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = () => {
    const cb = async () => {
      logAmplitudeEvent(
        AMPLITUDE_EVENTS.CHATS.CONFIRMED_CHAT_DELETION('category'),
      );
      removeChat(chatId);
      await executeApiRequest(deleteChat, chatId);
    };

    logAmplitudeEvent(
      AMPLITUDE_EVENTS.CHATS.PRESSED_DELETE_CHAT_BUTTON('category'),
    );
    setDeleteCallback(cb);
    setIsDeleteModalVisible(true);
  };

  return (
    <TouchableOpacity
      onPress={handleOnChatPress}
      className="mt-[18px] pb-[18px] border-b border-[#00000024]">
      <View className="flex flex-row items-center">
        <View className="flex flex-1 flex-row items-center pl-[20px]">
          <View className="items-start flex-1">
            <Text
              numberOfLines={1}
              className="text-[#222222] text-base font-normal">
              {`${index + 1}. ${firstMessageContent}`}
            </Text>
            <Text className="text-[#515151] text-sm font-normal">
              {getReadableTimeDifference(firstMessageTimestamp)}
            </Text>
          </View>
        </View>
        <View className="mr-[12px] ml-[20px]">
          <TouchableOpacity onPress={handleDeleteChat} className="p-2">
            <IconFeather name="trash" size={17} color="#222222" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const renderChatItem = ({ item, index }: any) => {
  return <ChatItem chat={item} index={index} />;
};

type ChatListType = {
  chats: ChatForDrawer[];
  category: {
    title: string | undefined;
    sessionCount: number | undefined;
    categoryValue: ChatCategories;
  };
};

const ChatsList = ({ chats, category }: ChatListType) => {
  const { setCurrentStep, selectedCategory, currentStep } =
    useCategorizedChatFlowStore(state => ({
      setCurrentStep: state.setCurrentStep,
      selectedCategory: state.selectedCategory,
      currentStep: state.currentStep,
    }));
  const setCurrentChatId = useChatsStore(state => state.setCurrentChatId);

  useOverrideBackGesture({
    onBack: () => {
      if (currentStep === 'list') {
        logAmplitudeEvent(
          AMPLITUDE_EVENTS.CHATS.PRESSED_BACK_BUTTON('category'),
        );
        setCurrentStep('selection');
      }
    },
  });

  const handleCreateChat = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_NEW_CHAT('category'));
    setCurrentStep('chat');
    setCurrentChatId(null);
  };

  const handlePressBack = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_BACK_BUTTON('category'));
    setCurrentStep('selection');
  };

  return (
    <View className="bg-[#FFF7EE] flex-1">
      <ParallaxScrollView
        parallaxEnabled={false}
        srcImage={
          selectedCategory
            ? BG_IMAGES[selectedCategory] || BG_IMAGES.anxiety
            : BG_IMAGES.anxiety
        }
        backgroundColor={Theme.colors.bgColor}
        contentBackgroundColor={Theme.colors.bgColor}
        parallaxHeaderHeight={205}
        renderForeground={() => (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              height: 205,
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: '#273051',
                textAlign: 'center',
                width: 224,
              }}>
              {category.title}
            </Text>
            {category.sessionCount !== 0 && (
              <Text className="text-[20px] text-[#273051] mt-[6px]">
                Чатів в категорії {category.sessionCount}
              </Text>
            )}
          </View>
        )}
        renderStickyHeader={() => (
          <View className="absolute left-5 top-5 z-10">
            <CircleButton
              size={40}
              icon="chevron-left"
              onPress={handlePressBack}
              backgroundColor="#00000060"
              color="white"
            />
          </View>
        )}>
        <View className="px-[16px]">
          <View className="mt-[-25px]">
            <TouchableHighlight
              onPress={handleCreateChat}
              activeOpacity={1}
              underlayColor={'#364373'}
              className="h-[50px] flex justify-center items-center bg-[#273051] rounded-[8px]">
              <Text className="text-base font-semibold text-[#FFFFFF]">
                Створити чат
              </Text>
            </TouchableHighlight>
          </View>
          {chats.length ? (
            <Text className="text-lg text-[#0000008F] mt-[20px] text-left">
              Попередні чати
            </Text>
          ) : (
            <Text className="text-xl text-[#0000008F] mt-[50px] text-center">
              Немає попередніх чатів
            </Text>
          )}
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={chats}
            renderItem={renderChatItem}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export default ChatsList;
