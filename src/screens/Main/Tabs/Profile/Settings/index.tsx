/* eslint-disable handle-callback-err */
import PeopleCommunitySvgIcon from '@common/assets/icons/PeopleCommunitySvgIcon';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  CONTACT_EMAIL_SUPPORT,
  CONTACT_WATSAPP_SUPPORT,
  COPIED_DATA_MESSAGE_CONTACT_SUPPORT_WITH,
  COPIED_DATA_TITLE,
  DELETE_DATA_CONFIRM_MESSAGE,
  DELETE_DATA_CONFIRM_TITLE,
  LOGOUT_CONFIRM_MESSAGE,
  LOGOUT_CONFIRM_TITLE,
  UNABLE_TO_OPEN_APP,
  UNSUBSCRIBE_CONFIRM_MESSAGE,
  UNSUBSCRIBE_CONFIRM_TITLE,
} from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { useClearChatStore } from '@services/hooks/useClearChatStore';
import useDeleteData from '@services/hooks/useDeleteData';
import { useUser } from '@services/hooks/useUser';
import { logout } from '@store/actions';
import { clearAmplitudeUser } from '@utils/amplitude-helpers';
import { logEvent } from '@utils/analytics';
import { fbLogout } from '@utils/facebook';
import { googleSignOut } from '@utils/google';
import { clearSentryUser } from '@utils/sentry-helpers';
import React from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
  const { hasPremium } = usePurchases();
  const { clearChatStore } = useClearChatStore();
  const dispatch = useDispatch();
  const {
    user: { name, email, id },
  } = useUser();
  const { DeleteUserData, cancelSubscription } = useDeleteData();

  const amplitudeInstance = useAmplitude();

  const onLogout = async () => {
    amplitudeInstance.logEvent('LOGOUT');
    logEvent('logout', {
      email,
      name,
    });
    amplitudeInstance.uploadEvents();
    dispatch(logout());
    clearChatStore();
    fbLogout();
    googleSignOut();
    clearSentryUser();
    clearAmplitudeUser();
    // applelogout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const onJoinUs = () => {
    const whatsappUrl = 'https://chat.whatsapp.com/IGDeIhM3NvIFwS2LtOaSW4';

    Linking.openURL(whatsappUrl).catch(err => {
      Alert.alert('לא ניתן לפתוח וואטסאפ במכשיר שלך');
    });
  };

  const onContactUs = () => {
    const whatsappNumber = '+972532424833';
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
      'היי, רציתי לשאול שאלה',
    )}`;

    const instagramUrl = 'https://www.instagram.com/rega.app';
    const instagramDMUrl = 'instagram://direct_message?username=rega.app';

    const emailAddress = 'hello@rega-app.com';
    const emailSubject = 'היי, רציתי לשאול שאלה';
    const emailBody = '';

    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject,
    )}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(whatsappUrl).catch(err => {
      Linking.openURL(instagramDMUrl).catch(err => {
        Linking.openURL(instagramUrl).catch(err => {
          Linking.openURL(emailUrl).catch(err =>
            Alert.alert(UNABLE_TO_OPEN_APP, CONTACT_EMAIL_SUPPORT),
          );
        });
      });
    });
  };

  const deleteDataConfirm = () => {
    Alert.alert(
      DELETE_DATA_CONFIRM_TITLE,
      DELETE_DATA_CONFIRM_MESSAGE,
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
    if (Platform.OS === 'android') {
      const url = 'https://play.google.com/store/account/subscriptions';
      Linking.openURL(url).catch(err => {
        Alert.alert(UNABLE_TO_OPEN_APP, CONTACT_WATSAPP_SUPPORT);
      });
    } else {
      Alert.prompt(
        UNSUBSCRIBE_CONFIRM_TITLE,
        UNSUBSCRIBE_CONFIRM_MESSAGE,
        [
          {
            text: 'ביטול',
            onPress: () => console.log('Cancelled'),
            style: 'cancel',
          },
          {
            text: 'אישור',
            onPress: reason => {
              cancelSubscription(reason);
              const url = 'https://apps.apple.com/account/subscriptions';

              Linking.openURL(url).catch(err => {
                Alert.alert(UNABLE_TO_OPEN_APP, CONTACT_WATSAPP_SUPPORT);
              });
            },
            style: 'destructive',
          },
        ],
        'plain-text',
        'אני רוצה לבטל את הרישום כי ',
      );
    }
  };

  const logoutConfirm = () => {
    Alert.alert(
      LOGOUT_CONFIRM_TITLE,
      LOGOUT_CONFIRM_MESSAGE,
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
      onPress: () => navigation.navigate('Notifications'),
      icon: 'bullhorn',
    },
    {
      title: 'פנו אלינו',
      onPress: onContactUs,
      onLongPress: () => {
        const data = {
          id,
          name,
          email,
          hasPremium,
          appVersion: DeviceInfo.getVersion(),
          platform: Platform.OS,
        };
        Clipboard.setString(JSON.stringify(data));

        Alert.alert(
          COPIED_DATA_TITLE,
          COPIED_DATA_MESSAGE_CONTACT_SUPPORT_WITH,
        );
      },
      icon: 'whatsapp',
    },
    {
      title: 'הצטרפו לקהילה',
      onPress: onJoinUs,
      icon: 'people-community',
      isPremium: true,
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
      title: 'ביטול מנוי',
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
    <SafeAreaView className="relative w-full h-full flex-1 bg-[#FFF8EE]">
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
        <Text className="flex-1 text-3xl font-semibold text-center text-black">
          הגדרות
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
      <Text className="text-center text-sm mt-2 mb-1 text-gray-500">
        גרסה נוכחית {DeviceInfo.getVersion()}
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
