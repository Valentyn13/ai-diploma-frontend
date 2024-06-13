import { CircleButton } from '@common/components/buttons/CircleButton';
import GlitterIcon from '@common/components/common/Glitter';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import useChats from '@services/hooks/useChats';
import { useUser } from '@services/hooks/useUser';
import { getReadableTimeDifference } from '@utils/time';
import React, { FC, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import Icon from 'react-native-vector-icons/Feather';
import { Session } from 'types/Chat';

import Chat from './Chat';

const generateUUID = () =>
  CryptoJS.lib.WordArray.random(128 / 8)
    .toString()
    .substring(0, 24);

const CustomHeader: FC<{
  title: string;
  avatarUri: string;
  onNew: () => void;
  navigation: any;
}> = ({ title, avatarUri, onNew, navigation }) => {
  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
        <View className="flex-row items-center ml-2">
          <Image source={{ uri: avatarUri }} className="w-8 h-8 rounded-full" />
          <Text className="text-black font-normal text-xl ml-2">{title}</Text>
          <GlitterIcon className="w-6 h-6 ml-1" />
        </View>
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
          <CustomHeader
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
        component={Chat}
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
                  {chat.messages[0].content.slice(0, 22)}
                  {chat.messages[0].content.length > 22 ? '...' : ''}
                </Text>
                <Text className="text-black font-light text-xs ml-auto">
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
          component={Chat}
          initialParams={{
            id: chat.id,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
