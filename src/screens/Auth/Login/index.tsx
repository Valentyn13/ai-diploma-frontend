import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { logEvent } from '@utils/analytics';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const appDataloaded = useSelector((state: RootState) => state.appData.loaded);
  const amplitudeInstance = useAmplitude();

  const onContinue = async () => {
    const fcmToken = await getFcmToken();
    setLoader(true);
    await loginWithEmail(email, password, fcmToken);
    setLoader(false);
  };

  const initCrashlytics = async () => {
    await Promise.all([
      crashlytics().setUserId(userDetails.id),
      crashlytics().setAttributes({
        email,
        username: userDetails.email,
      }),
      logEvent('LOGIN', {
        userName: userDetails.name,
        email: userDetails.email,
      }),
    ]);
  };

  useEffect(() => {
    if (userDetails.accessToken) {
      amplitudeInstance.setUserId(userDetails.id);
      amplitudeInstance.logEvent('LOGIN', { userID: userDetails.id });
      amplitudeInstance.uploadEvents();
      getAppData();
      initCrashlytics();
    }
  }, [userDetails.accessToken, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      navigation.navigate('Main', { screen: 'Home' });
    }
  }, [appDataloaded, navigation]);

  useEffect(() => {
    setLoader(userDetails.loader);
  }, [userDetails.loader]);

  return (
    <SafeAreaView className="flex-1 bg-[#fdedd6]">
      <View className="left-4 top-4 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        className="flex"
        contentContainerStyle={{ flex: 1, padding: scale(24) }}>
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
          <Text className="text-black underline text-sm mt-5">שכחתי סיסמא</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  userDetails: {
    accessToken: string;
    id: string;
    loader: boolean;
    email: string;
    name: string;
  };
  appData: {
    loaded: boolean;
  };
}
