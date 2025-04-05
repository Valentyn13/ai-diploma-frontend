import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  AMPLITUDE_EVENTS,
  CONFIRM_PASSWORD_ERROR,
  EMAIL_ERROR_MESSAGE,
  MISSING_EMAIL_ERROR_MESSAGE,
  MISSING_PASSWORD_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  REGISTER_LICENSE_IS_NOT_ACCEPTED_ERROR,
} from '@common/constants';
import Theme from '@common/theme';
import CheckBox from '@react-native-community/checkbox';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { useUser } from '@services/hooks/useUser';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { logEvent } from '@utils/analytics';
import { initializeThirdParties } from '@utils/initialize-third-parties';
import validateEmail from '@utils/validateEmail';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { getFcmToken } from '../../../helper/pushNotifications';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { signUp } = useLogin();
  const { getAppData } = useAppData();
  const [loader, setLoader] = useState(false);

  const onContinue = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      Alert.alert(EMAIL_ERROR_MESSAGE);
      return;
    }

    const trimmedPassword = !!password ? password.trim() : '';

    if (!toggleCheckBox) {
      console.log(1)
      Alert.alert(REGISTER_LICENSE_IS_NOT_ACCEPTED_ERROR);
      return;
    } else if (!name) {
      console.log(2)
      Alert.alert(NAME_ERROR_MESSAGE);
      return;
    } else if (!email) {
      console.log(3)
      Alert.alert(MISSING_EMAIL_ERROR_MESSAGE);
      return;
    } else if (!trimmedPassword) {
      console.log(4)
      Alert.alert(MISSING_PASSWORD_ERROR_MESSAGE);
      return;
    } else if (trimmedPassword.length < 6) {
      // TODO: Add new message
      console.log(5)
      Alert.alert(PASSWORD_LENGTH_ERROR_MESSAGE);
    } else if (password !== verifyPassword) {
      console.log(6)
      Alert.alert(CONFIRM_PASSWORD_ERROR);
    } else {
      const fcmToken = await getFcmToken();

      if (fcmToken) {
        signUp(email, password, name, fcmToken);
      } else {
        signUp(email, password, name);
      }
    }
  };
  const {
    user: { accessToken, id, loder, email: useremail },
  } = useUser();
  const appDataloaded = useSelector(state => state.appData.loaded);

  useEffect(() => {
    if (!accessToken || !id) {
      return;
    }

    initializeThirdParties(id, useremail);
    logAmplitudeEvent(AMPLITUDE_EVENTS.REGISTER_SCREEN.REGISTER_SUCCESS);
    getAppData();

    AppEventsLogger.logEvent(AppEventsLogger.AppEvents.CompletedRegistration, {
      [AppEventsLogger.AppEventParams.RegistrationMethod]: 'email',
    });
    logEvent('register', {
      userName: name,
      email: useremail,
    });
  }, [accessToken, id, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [appDataloaded, navigation]);

  useEffect(
    function setLoaderFun() {
      setLoader(loder);
    },
    [loder],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.bgColor }}>
      <View className="left-4 top-4 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-left"
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: scale(24),
        }}
        extraScrollHeight={40}
        keyboardOpeningTime={0}>
        <AppText style={{ color: '#000', fontSize: 20, marginTop: scale(50) }}>
          Реєстрація
        </AppText>
        <AppText
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: scale(9),
            color: '#000000',
          }}>
          {
            '«Все, що залишилося, це заповнити необхідні дані, тоді ми зможемо почати досліджувати світ разом»'
          }
        </AppText>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: scale(40),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: scale(60),
          }}>
          <Image source={image('profile')} />
          <AppTextInput
            onChangeText={text => setName(text)}
            returnKeyType="done"
            placeholder="Ім'я"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: scale(60),
          }}>
          <Image source={image('email2')} />
          <AppTextInput
            onChangeText={text => setEmail(text)}
            returnKeyType="done"
            keyboardType="email-address"
            placeholder="Пошта"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginTop: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: scale(60),
          }}>
          <Image source={image('lock')} />
          <AppTextInput
            onChangeText={text => setPassword(text)}
            returnKeyType="done"
            secureTextEntry
            placeholder="Пароль"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: scale(60),
          }}>
          <Image source={image('lock')} />
          <AppTextInput
            onChangeText={text => setVerifyPassword(text)}
            returnKeyType="done"
            secureTextEntry
            placeholder="Підтвердження пароля"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: scale(30),
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            width: '90%',
          }}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            onFillColor={Theme.colors.bgColor}
          />
          <TouchableOpacity
            style={{ marginBottom: 10, marginRight: 15 }}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <AppText
              black
              style={{
                fontSize: 18,
                fontWeight: '500',
                paddingTop: 8,
                color: 'blue',
                textDecorationLine: 'underline',
                textAlign: 'left',
              }}>
             Політика конфіденційності та умови використання
            </AppText>
          </TouchableOpacity>
        </View>
        <View className="w-full" style={{ marginTop: scale(40) }}>
          <AppButton onPress={onContinue}>Реєстрація</AppButton>
        </View>
        {loader && (
          <ActivityIndicator
            style={{ position: 'absolute', zIndex: 111, top: '50%' }}
            color="#273051"
            size="large"
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
