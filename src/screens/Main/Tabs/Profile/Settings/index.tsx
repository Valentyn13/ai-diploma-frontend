/* eslint-disable handle-callback-err */
import { CircleButton } from '@common/components/buttons/CircleButton';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useDeleteData from '@services/hooks/useDeleteData';
import { useUser } from '@services/hooks/useUser';
import { logout } from '@store/actions';
import { logEvent } from '@utils/analytics';
import { fbLogout } from '@utils/facebook';
import { googleSignOut } from '@utils/google';
import React, { useRef } from 'react';
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
    fbLogout();
    googleSignOut();
    // applelogout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const onContactUs = () => {
    const whatsappNumber = '+972532424833';
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
      'היי, רציתי לשאול שאלה',
    )}`;

    const instagramUrl = 'https://www.instagram.com/rega.app';
    const instagramDMUrl = 'instagram://direct_message?username=rega.app';

    const emailAddress = 'hello@rega.co.il';
    const emailSubject = 'היי, רציתי לשאול שאלה';
    const emailBody = '';

    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject,
    )}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(whatsappUrl).catch(err => {
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

  const timePickerRef = useRef(null);

  const cancelSubscriptionPrompt = () => {
    Alert.prompt(
      'ביטול מנוי',
      'אנא הזינו את הסיבה לביטול המנוי, על מנת שנוכל לשפר את השירות',
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
            const url =
              Platform.OS === 'android'
                ? 'https://play.google.com/store/account/subscriptions'
                : 'https://apps.apple.com/account/subscriptions';

            Linking.openURL(url).catch(err => {
              Alert.alert(
                'Unable to open the app',
                'Please contact support via email at hello@rega.co.il, thank you',
              );
            });
          },
          style: 'destructive',
        },
      ],
      'plain-text',
      'אני רוצה לבטל את הרישום כי ',
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
          'הנתונים הועתקו',
          'נתוני משתמש הועתקו, אנא הדביקו אותם בשיחה עם התמיכה',
        );
      },
      icon: 'whatsapp',
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
          className="flex-1 text-3xl font-bold text-center text-black"
          style={{ fontFamily: theme.fonts!.regular }}>
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
                <Icon
                  style={{
                    width: 20,
                  }}
                  name={icon}
                  size={20}
                  color="#160f29"
                />
                <Text className="text-lg font-medium ml-4 text-left text-black">
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
