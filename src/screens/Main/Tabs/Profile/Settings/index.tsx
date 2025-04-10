import PeopleCommunitySvgIcon from '@common/assets/icons/PeopleCommunitySvgIcon';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  DELETE_DATA_CONFIRM_MESSAGE,
  DELETE_DATA_CONFIRM_TITLE,
  LOGOUT_CONFIRM_MESSAGE,
  LOGOUT_CONFIRM_TITLE,
} from '@common/constants';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { useClearChatStore } from '@services/hooks/useClearChatStore';
import useDeleteData from '@services/hooks/useDeleteData';
import { useUser } from '@services/hooks/useUser';
import { logout } from '@store/actions';
import { clearAmplitudeUser } from '@utils/amplitude-helpers';
import { clearSentryUser } from '@utils/sentry-helpers';
import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
  const { clearChatStore } = useClearChatStore();
  const dispatch = useDispatch();
  const {
    user: { name, email, id },
  } = useUser();
  const { DeleteUserData } = useDeleteData();

  const amplitudeInstance = useAmplitude();

  const onLogout = async () => {
    amplitudeInstance.logEvent('LOGOUT');
    amplitudeInstance.uploadEvents();
    dispatch(logout());
    clearChatStore();
    clearSentryUser();
    clearAmplitudeUser();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const deleteDataConfirm = () => {
    Alert.alert(
      DELETE_DATA_CONFIRM_TITLE,
      DELETE_DATA_CONFIRM_MESSAGE,
      [
        {
          text: 'Так',
          onPress: () => {
            DeleteUserData();
          },
          style: 'destructive',
        },
        {
          text: 'Ні',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const logoutConfirm = () => {
    Alert.alert(
      LOGOUT_CONFIRM_TITLE,
      LOGOUT_CONFIRM_MESSAGE,
      [
        {
          text: 'Так',
          onPress: () => {
            onLogout();
          },
          style: 'destructive',
        },
        {
          text: 'Ні',
          onPress: () => {},
          style: 'cancel',
          isPreferred: true,
        },
      ],
      { cancelable: true },
    );
  };

  const list = [
    {
      title: 'Налаштування користувача',
      onPress: () =>
        navigation.navigate('Main', {
          screen: 'Tabs',
          params: {
            screen: 'Profile',
            params: {
              screen: 'SettingsNavigator',
              params: {
                screen: 'Details',
              },
            },
          },
        }),
      icon: 'user-large',
    },
    {
      title: 'Політика конфіденційності',
      onPress: () => navigation.navigate('PrivacyPolicy'),
      icon: 'book',
    },

    {
      title: 'Видалення даних',
      onPress: deleteDataConfirm,
      icon: 'trash',
    },
    {
      title: 'Вихід з акаунту',
      onPress: logoutConfirm,
      icon: 'right-from-bracket',
    },
  ];

  return (
    <SafeAreaView className="relative w-full h-full flex-1 bg-[#FFF8EE]">
      <View className="relative p-5 flex flex-row items-center">
        <View>
          <CircleButton
            size={40}
            icon="chevron-left"
            onPress={navigation.goBack}
            backgroundColor="#00000060"
            color="#fff"
          />
        </View>
        <Text className="flex-1 text-3xl font-semibold text-center text-black">
          Налаштування
        </Text>
      </View>
      <View className="w-full border-b border-[#513F73]/10" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.title}
        renderItem={({ item: { onPress, title, icon, onLongPress } }) => (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex flex-row items-center py-4 px-5 border-b border-[#513F73]/10">
            <View className="flex flex-row items-center justify-between flex-1">
              <View className="flex flex-row items-center">
                {icon === 'people-community' ? (
                  <PeopleCommunitySvgIcon
                    style={{ marginRight: -6 }}
                    height={26}
                    width={26}
                    fill="#160f29"
                  />
                ) : (
                  <Icon
                    style={{
                      width: 20,
                    }}
                    name={icon}
                    size={20}
                    color="#160f29"
                  />
                )}
                <Text className="text-lg font-medium ml-4 text-left text-black/80">
                  {title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text className="text-center text-sm mt-2 mb-4 text-gray-500">
        Версія додатку 1.0.0
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
