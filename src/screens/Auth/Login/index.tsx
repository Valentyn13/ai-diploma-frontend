import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { AMPLITUDE_EVENTS, EMAIL_ERROR_MESSAGE } from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { useUser } from '@services/hooks/useUser';
import alert from '@utils/alert';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { initializeThirdParties } from '@utils/initialize-third-parties';
import validateEmail from '@utils/validateEmail';
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

  const scrollViewRef = useRef<ScrollView>(null);

  const onContinue = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      alert(EMAIL_ERROR_MESSAGE);
      return;
    }
    const fcmToken = await getFcmToken();
    setLoader(true);
    await loginWithEmail(email, password, fcmToken);
    setLoader(false);
  };

  useEffect(() => {
    if (user.accessToken) {
      initializeThirdParties(user.id, user.email);
      logAmplitudeEvent(AMPLITUDE_EVENTS.LOGIN_SCREEN.LOGIN_SUCCESS);
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
    <SafeAreaView className="flex-1 bg-primary-bg p-4">
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
          <View
            style={{ backgroundColor: 'white' }}
            className="py-4 px-2 rounded mt-24 flex-row items-center w-full">
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
          <View
            style={{ backgroundColor: 'white' }}
            className="py-4 px-2 rounded mt-4 flex-row items-center w-full">
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
