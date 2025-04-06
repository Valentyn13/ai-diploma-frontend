import image from '@common/assets/images';
import CustomDrawer from '@common/components/CustomDrawer';
import { useNavigation } from '@react-navigation/native';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import React from 'react';
import { View } from 'react-native';

import ChatContainer from '../ChatContainer';
import ChatHeader from '../ChatHeader';

const ChatView = () => {
  const navigation = useNavigation();
  const { isDrawerOpen, setIsDrawerOpen } = useCategorizedChatFlowStore(
    state => ({
      isDrawerOpen: state.isDrawerOpen,
      setIsDrawerOpen: state.setIsDrawerOpen,
    }),
  );

  return (
    <View className="flex flex-1 relative">
      <ChatHeader
        toggleDrawer={setIsDrawerOpen}
        title="Майкл"
        avatarSrc={image('michael_chat')}
        navigation={navigation}
      />
      <ChatContainer />
      {isDrawerOpen && (
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={setIsDrawerOpen}
        />
      )}
    </View>
  );
};

export default ChatView;
