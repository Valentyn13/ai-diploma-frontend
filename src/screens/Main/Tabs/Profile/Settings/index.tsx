/* eslint-disable handle-callback-err */
import { BoldTitle } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useDeleteData from '@services/hooks/useDeleteData';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import { logEvent } from '@utils/analytics';
import { fbLogout } from '@utils/facebook';
import { googleSignOut } from '@utils/google';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/actions';

const Settings = ({ navigation }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  const dispatch = useDispatch();
  const { name, email, isNotification, notificationTime } = useSelector(
    state => state.userDetails,
  );
  const { DeleteUserData, cancelSubsciption } = useDeleteData();
  const { saveNotification, cancelNotification } = useUpdateProfile();

  const [isNotificationLocal, setIsNotificationLocal] = React.useState(false);
  const [notificationTimeLocal, setNotificationTimeLocal] = React.useState(
    new Date(),
  );

  const amplitudeInstance = useAmplitude();
  const initRudderstack = async () => {
    await rudderClient.setup('2Ah3U42Qc6y9v3PB4w8sKYhvkkJ', {
      dataPlaneUrl: 'https://regatomxprg.dataplane.rudderstack.com',
      logLevel: RUDDER_LOG_LEVEL.DEBUG,
      flushQueueSize: 1,
      configRefreshInterval: 1,
    });
  };
  useEffect(() => {
    initRudderstack();
  }, []);

  const onLogout = async () => {
    await rudderClient.track('logout', {
      email,
      name,
    });
    amplitudeInstance.logEvent('LOGOUT');
    logEvent('logout', {
      email,
      name,
    });
    amplitudeInstance.uploadEvents();
    dispatch(logout());
    fbLogout();
    googleSignOut();
    // applelogout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowModal(false);
      setShowTime(false);
      const currentDate = selectedDate;
      saveNotification(currentDate);
      setNotificationTimeLocal(currentDate);
    } else {
      const currentDate = selectedDate;
      setNotificationTimeLocal(currentDate);
    }
  };

  const onToggleSwitch = e => {
    setIsNotificationLocal(e);
    if (!e) {
      cancelNotification();
    }
  };

  const onTimeSave = () => {
    setShowTime(false);
    saveNotification(notificationTimeLocal);
    setIsNotificationLocal(true);
  };

  useEffect(() => {
    if (notificationTime) {
      setNotificationTimeLocal(new Date(notificationTime));
    }
    if (isNotification) {
      setIsNotificationLocal(isNotification);
    }
  }, [isNotification, notificationTime]);

  const onContactUs = () => {
    const instagramUrl = 'https://www.instagram.com/rega.app';
    const instagramDMUrl = 'instagram://direct_message?username=rega.app';

    const emailAddress = 'hello@rega.co.il';
    const emailSubject = 'היי, רציתי לשאול שאלה';
    const emailBody = '';

    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject,
    )}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(instagramDMUrl).catch(err => {
      Linking.openURL(instagramUrl).catch(err => {
        Linking.openURL(emailUrl).catch(err =>
          Alert.alert(
            'לא ניתן לפתוח את האפליקציה',
            'אנא צרו קשר עם התמיכה במייל hello@rega.co.il, תודה',
          ),
        );
      });
    });
  };

  const deleteDataConfirm = () => {
    Alert.alert(
      'מחיקת נתונים',
      'האם אתם בטוחים שאתם רוצים למחוק את הנתונים שלכם?',
      [
        {
          text: 'ביטול',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'מחיקה',
          onPress: () => {
            DeleteUserData();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const cancelSubscriptionPrompt = () => {
    Alert.prompt(
      'ביטול רישום',
      'הכנס את כתובת האימייל שלך ואת הסיבה לביטול הרישום',
      [
        {
          text: 'ביטול',
          onPress: () => {},
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'שלח',
          onPress: () => {
            dispatch(cancelSubsciption(data));
          },
          style: 'destructive',
        },
      ],
      'plain-text',
      'אני רוצה לבטל את הרישום כי...',
    );
  };

  const logoutConfirm = () => {
    Alert.alert(
      'התנתקות',
      'חבל לנו לראות אותך עוזב אותנו, האם אתם בטוחים?',
      [
        {
          text: 'התנתק',
          onPress: () => {
            onLogout();
          },
          style: 'destructive',
        },
        {
          text: 'ביטול',
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
      title: 'הגדרות משתמש',
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
      title: 'התראות',
      onPress: () => setShowTime(true),
      icon: 'bullhorn',
      // eslint-disable-next-line react/no-unstable-nested-components
      left: () => (
        <View className="flex flex-row items-center">
          {isNotificationLocal === true && notificationTimeLocal !== null && (
            <Text className="text-sm text-left mr-4">
              {`כל יום ב-${notificationTimeLocal
                .getHours()
                .toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}:${notificationTimeLocal
                .getMinutes()
                .toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}`}
            </Text>
          )}
          <Switch
            trackColor={{
              true: '#513F73',
            }}
            onValueChange={onToggleSwitch}
            value={isNotificationLocal}
          />
        </View>
      ),
    },
    {
      title: 'צור קשר',
      onPress: onContactUs,
      icon: 'instagram',
    },
    {
      title: 'מדיניות הפרטיות ותנאי השימוש',
      onPress: () => navigation.navigate('PrivacyPolicy'),
      icon: 'book',
    },

    {
      title: 'מחיקת נתונים',
      onPress: deleteDataConfirm,
      icon: 'trash',
    },
    {
      title: 'ביטול רישום',
      onPress: cancelSubscriptionPrompt,
      icon: 'ban',
    },
    {
      title: 'התנתקות',
      onPress: logoutConfirm,
      icon: 'right-from-bracket',
    },
  ];

  return (
    <SafeAreaView className="relative w-full h-full flex-1 bg-[#FCE8CD]">
      <View className="relative p-5 flex flex-row items-center">
        <View className="absolute top-5 left-5 z-10">
          <CircleButton
            size={40}
            icon="chevron-right"
            onPress={navigation.goBack}
            backgroundColor="#00000060"
            color="#fff"
          />
        </View>
        <Text
          className="flex-1 text-3xl font-bold text-center"
          style={{ fontFamily: theme.fonts!.regular }}>
          הגדרות
        </Text>
      </View>
      <View className="w-full border-b border-[#513F73]/10" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.title}
        renderItem={({ item: { onPress, title, icon, left = null } }) => (
          <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center py-4 px-5 border-b border-[#513F73]/10">
            <View className="flex flex-row items-center justify-between flex-1">
              <View className="flex flex-row items-center">
                <Icon
                  style={{
                    width: 20,
                  }}
                  name={icon}
                  size={20}
                  color="#160f29"
                />
                <Text className="text-lg font-medium ml-4 text-left">
                  {title}
                </Text>
              </View>
              {left && left()}
            </View>
          </TouchableOpacity>
        )}
      />
      <Text className="text-center text-sm mt-2 mb-1 text-gray-500">
        גרסה נוכחית {DeviceInfo.getVersion()}
      </Text>
      {showTime && Platform.OS === 'android' && (
        <DateTimePicker
          value={notificationTimeLocal}
          mode="time"
          display="spinner"
          is24Hour={false}
          onChange={onChange}
        />
      )}
      <Modal isVisible={Platform.OS === 'ios' && showTime}>
        {showTime && (
          <View
            style={{
              display: 'flex',
              backgroundColor: 'white',
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <BoldTitle
              t="בחרו את השעה המתאימה"
              style={{ textAlign: 'center', paddingVertical: 10 }}
            />
            <DateTimePicker
              value={notificationTimeLocal}
              mode="time"
              display="spinner"
              is24Hour={false}
              onChange={onChange}
              textColor={colors.textColor}
            />
            <View className="items-center flex flex-row justify-around">
              <TouchableOpacity
                onPress={() => setShowTime(false)}
                className="bg-red-500 py-2 px-6 rounded">
                <Text className="text-white">ביטול</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onTimeSave}
                className="bg-[#273051] py-2 px-6 rounded">
                <Text className="text-white">שמירה</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
