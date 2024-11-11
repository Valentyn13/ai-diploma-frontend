import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import config from '@common/config';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { useUser } from '@services/hooks/useUser';
import { logEvent } from '@utils/analytics';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { getFcmToken } from '../../../helper/pushNotifications';

const Login: FC = () => {
  const { loginWithEmail } = useLogin();
  const navigation = useNavigation();
  const { getAppData } = useAppData();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useUser();
  const appDataloaded = useSelector((state: RootState) => state.appData.loaded);
  const amplitudeInstance = useAmplitude();

  const scrollViewRef = useRef<ScrollView>(null);

  const onContinue = async () => {
    const fcmToken = await getFcmToken();
    setLoader(true);
    await loginWithEmail(email, password, fcmToken);
    setLoader(false);
  };

  const initCrashlytics = async () => {
    await Promise.all([
      crashlytics().setUserId(user.id),
      crashlytics().setAttributes({
        email,
        username: user.email,
      }),
      logEvent('LOGIN', {
        userName: user.name,
        email: user.email,
      }),
    ]);
  };

  useEffect(() => {
    if (user.accessToken) {
      if (!config.isDev) {
        amplitudeInstance.setUserId(user.id);
        amplitudeInstance.logEvent('LOGIN', { userID: user.id });
        amplitudeInstance.uploadEvents();
        initCrashlytics();
      }

      getAppData();
    }
  }, [user.accessToken, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      // @ts-ignore
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [appDataloaded, navigation]);

  useEffect(() => {
    setLoader(user.loader);
  }, [user.loader]);

  useEffect(() => {
    const scrollToEndOnKeyboardOpen = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    );
    return () => {
      scrollToEndOnKeyboardOpen.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#fdedd6] p-4">
      <View className="left-0 top-0 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={scale(2)}
          //className="flex"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ padding: scale(24) }}>
          <AppText className="font-bold text-2xl mt-16 text-center text-black">
            התחבר עם פרטי ההתחברות שלך
          </AppText>
          <View className="bg-white py-4 px-2 rounded mt-24 flex-row items-center w-full">
            <Icon name="email" size={scale(20)} color="#000" />
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholderTextColor="grey"
              keyboardType="email-address"
              returnKeyType="done"
              placeholder="אימייל"
              className="w-5/6 mx-5 text-2xl text-right text-black"
            />
          </View>
          <View className="bg-white py-4 px-2 rounded mt-4 flex-row items-center w-full">
            <Icon name="lock" size={scale(20)} color="#000" />
            <TextInput
              onChangeText={text => setPassword(text)}
              secureTextEntry
              placeholderTextColor="grey"
              returnKeyType="done"
              placeholder="סיסמא"
              className="w-5/6 mx-5 text-2xl text-right text-black"
            />
          </View>
          <TouchableOpacity
            className="flex items-end"
            onPress={() => {
              navigation.navigate('Auth', { screen: 'ForgotPassword' });
            }}>
            <Text className="text-black underline text-sm mt-5">
              שכחתי סיסמא
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>

      <View className="w-10/12 mx-auto">
        <AppButton onPress={onContinue}>התחברות</AppButton>
      </View>
      {loader && (
        <ActivityIndicator
          className="absolute z-50 top-0 bottom-0 left-0 right-0"
          color="#273051"
          size="large"
        />
      )}
    </SafeAreaView>
  );
};

export default Login;

interface RootState {
  appData: {
    loaded: boolean;
  };
}
