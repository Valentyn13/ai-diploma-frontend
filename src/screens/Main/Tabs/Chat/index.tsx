/* eslint-disable react/no-unstable-nested-components */
import image from '@common/assets/images';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import useChats from '@services/hooks/useChats';
import { useChatsStore } from '@store/useChatsStore';
import { getReadableTimeDifference } from '@utils/time';
import React from 'react';
import { Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';

enableScreens();

const Drawer = createDrawerNavigator();

export default function ChatDrawer() {
  const { chats } = useChats();
  const { isSessionStarted, setNavCallback, setIsLeaveModalVisible } =
    useChatsStore(state => ({
      isSessionStarted: state.isSessionStarted,
      setNavCallback: state.setNavCallback,
      setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    }));

  return (
    <Drawer.Navigator
      detachInactiveScreens={true}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            {props.state.routes.map((route, i) => {
              const focused = i === props.state.index;
              const { title, drawerLabel, drawerIcon } =
                props.descriptors[route.key].options;

              return (
                <DrawerItem
                  key={route.key}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#00000020',
                    marginVertical: 0,
                    paddingVertical: 2,
                    marginHorizontal: 0,
                  }}
                  label={
                    drawerLabel !== undefined
                      ? drawerLabel
                      : title !== undefined
                      ? title
                      : route.name
                  }
                  icon={drawerIcon}
                  focused={focused}
                  {...props}
                  onPress={() => {
                    const cb = () => {
                      props.navigation.dispatch({
                        ...(focused
                          ? DrawerActions.closeDrawer()
                          : CommonActions.navigate(route.name)),
                        target: props.state.key,
                      });
                    };
                    if (!isSessionStarted) {
                      cb();
                      return;
                    }
                    setNavCallback(cb);
                    setIsLeaveModalVisible(true);
                  }}
                />
              );
            })}
          </DrawerContentScrollView>
        );
      }}
      initialRouteName={'שיחה חדשה'}
      screenOptions={({ navigation }) => ({
        unmountOnBlur: true,

        header: () => (
          <ChatHeader
            title="מיכאל"
            avatarSrc={image('michael_chat')}
            navigation={navigation}
          />
        ),
      })}>
      <Drawer.Screen
        key={'chat-screen'}
        name={'chat-screen'}
        initialParams={{
          id: null,
          isNew: true,
        }}
        options={{
          drawerLabel: () => (
            <Text className="text-black text-left font-bold text-md">
              שיחה חדשה
            </Text>
          ),
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
                  {chat.firstMessageContent.length > 26
                    ? chat.firstMessageContent.slice(0, 23) + '...'
                    : chat.firstMessageContent}
                </Text>
                <Text className="text-black font-light text-xs ml-auto mr-[-24px]">
                  {getReadableTimeDifference(chat.firstMessageTimestamp)}
                </Text>
              </View>
            ),
          }}
          key={chat.chatId}
          name={chat.chatId}
          // @ts-ignore
          component={ChatContainer}
          initialParams={{
            id: chat.chatId,
            isNew: false,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
