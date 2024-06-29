import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import useChats from '@services/hooks/useChats';
import { useUser } from '@services/hooks/useUser';
import { getReadableTimeDifference } from '@utils/time';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import { Session } from 'types/Chat';

import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';

const generateUUID = () =>
  CryptoJS.lib.WordArray.random(128 / 8)
    .toString()
    .substring(0, 24);

const Drawer = createDrawerNavigator();

export default function ChatDrawer() {
  const { user } = useUser();
  const { chats, fetchData, loading } = useChats();
  const [newChat, setNewChat] = useState<Session>({
    id: generateUUID(),
    messages: [],
    userId: user.id,
  });

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={'שיחה חדשה' + newChat.id}
      screenOptions={({ navigation }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        header: () => (
          <ChatHeader
            title="מיכאל"
            avatarUri="https://rega.co.il/images/michael.png"
            onNew={() => {
              if (!loading) {
                fetchData();
              }

              const id = generateUUID();

              setNewChat({
                id,
                messages: [],
                userId: user.id,
              });

              navigation.navigate('Main', {
                screen: 'Tabs',
                params: {
                  screen: 'Chat',
                  params: {
                    screen: id,
                  },
                },
              });
            }}
            navigation={navigation}
          />
        ),
      })}>
      <Drawer.Screen
        key={newChat.id}
        name={newChat.id}
        initialParams={{
          id: newChat.id,
          isNew: true,
        }}
        options={{
          drawerLabel: () => (
            <Text className="text-black text-left font-bold text-md">
              שיחה חדשה
            </Text>
          ),
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#00000020',
            marginVertical: 0,
            paddingVertical: 2,
            marginHorizontal: 0,
          },
        }}
        // @ts-ignore
        component={ChatContainer}
      />
      {chats.map(chat => (
        <Drawer.Screen
          options={{
            drawerStyle: {
              backgroundColor: '#FFF8EE',
            },
            drawerLabel: () => (
              <View className="flex-row items-end">
                <Text className="text-black text-left font-normal text-md">
                  {chat.messages[0].content.length > 26
                    ? chat.messages[0].content.slice(0, 23) + '...'
                    : chat.messages[0].content}
                </Text>
                <Text className="text-black font-light text-xs ml-auto mr-[-24px]">
                  {getReadableTimeDifference(chat.messages[0].timestamp)}
                </Text>
              </View>
            ),
            drawerItemStyle: {
              borderBottomWidth: 1,
              borderBottomColor: '#00000020',
              marginVertical: 0,
              paddingVertical: 2,
              marginHorizontal: 0,
            },
          }}
          key={chat.id}
          name={`${chat.messages[0].content}-${chat.id}`}
          // @ts-ignore
          component={ChatContainer}
          initialParams={{
            id: chat.id,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
