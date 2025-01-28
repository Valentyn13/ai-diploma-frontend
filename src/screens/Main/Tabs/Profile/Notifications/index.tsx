import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import { useUser } from '@services/hooks/useUser';
import { setUserData } from '@store/actions';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Card, DateTimePicker, Switch } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

const Notifications = ({ navigation }) => {
  const { saveNotification, cancelNotification } = useUpdateProfile();
  const {
    user: { isNotification, notificationTime },
  } = useUser();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'תזכורת יומית',
      isEnabled: isNotification,
      time: notificationTime ? new Date(notificationTime) : new Date(),
      color: '#FF6F61',
    },
  ]);

  const handleToggleSwitch = (id: number) => {
    const isEnabled = notifications[0].isEnabled;
    const time = notifications[0].time;

    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, isEnabled: !isEnabled }
          : notification,
      ),
    );

    isEnabled ? cancelNotification() : saveNotification(time);

    setTimeout(() => {
      dispatch(
        setUserData({
          isNotification: !isEnabled,
          notificationTime: !isEnabled ? time : null,
        }),
      );
    }, 0);
  };

  const handleTimeChange = (id: number, selectedDate: Date) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, time: selectedDate, isEnabled: true }
          : notification,
      ),
    );

    saveNotification(selectedDate);

    setTimeout(() => {
      dispatch(
        setUserData({
          isNotification: true,
          notificationTime: selectedDate,
        }),
      );
    }, 0);
  };

  const renderItem = ({ item }) => (
    <Card
      className="rounded-lg p-4 m-4"
      style={{
        backgroundColor: item.isEnabled ? theme.colors.primary : '#BDBDBD',
      }}
      enableShadow>
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-10">
          <DateTimePicker
            value={item.time}
            label="תזכורת יומית"
            labelStyle={{
              color: 'white',
              fontSize: 20,
              fontWeight: '600',
              marginBottom: 5,
            }}
            style={{
              color: 'white',
              fontSize: 36,
              fontWeight: '600',
            }}
            mode="time"
            display="spinner"
            is24Hour={true}
            locale="he-IL"
            dateTimeFormatter={d =>
              d.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }
            onChange={selectedDate => handleTimeChange(item.id, selectedDate)}
          />
        </View>
        <View className="flex-row items-center">
          <Switch
            value={item.isEnabled}
            onValueChange={() => handleToggleSwitch(item.id)}
            onColor={theme.colors.selected}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8EE]">
      <View className="p-5 flex-row items-center">
        <View className="absolute top-5 left-5 z-10">
          <CircleButton
            size={40}
            icon="chevron-down"
            onPress={navigation.goBack}
            backgroundColor="#00000060"
            color="#fff"
          />
        </View>
        <Text className="flex-1 text-3xl font-semibold text-center text-black">
          התראות
        </Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Notifications;
