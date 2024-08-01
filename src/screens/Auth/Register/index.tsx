import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import { CircleButton } from '@common/components/buttons/CircleButton';
import CheckBox from '@react-native-community/checkbox';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { useUser } from '@services/hooks/useUser';
import { logEvent } from '@utils/analytics';
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
    if (!toggleCheckBox) {
      Alert.alert('אנא אשר את תנאי השימוש ומדיניות הפרטיות');
      return;
    } else if (!name) {
      Alert.alert('אנא הכנס שם');
      return;
    } else if (!email) {
      Alert.alert('אנא הכנס אימייל');
      return;
    } else if (!password) {
      Alert.alert('אנא הכנס סיסמא');
      return;
    } else if (password !== verifyPassword) {
      Alert.alert('סיסמאות לא תואמות');
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
  const amplitudeInstance = useAmplitude();

  useEffect(() => {
    if (!accessToken || !id) {
      return;
    }

    amplitudeInstance.setUserId(id);
    amplitudeInstance.logEvent('SIGNUP', { userID: id });
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
      navigation.navigate('Main');
    }
  }, [appDataloaded, navigation]);

  useEffect(
    function setLoaderFun() {
      setLoader(loder);
    },
    [loder],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdedd6' }}>
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
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: scale(24),
        }}
        extraScrollHeight={40}
        keyboardOpeningTime={0}>
        <AppText style={{ color: '#000', fontSize: 18, marginTop: scale(50) }}>
          הרשמה
        </AppText>
        <AppText
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: scale(9),
            color: '#000000',
          }}>
          {
            'עוד רגע והחשבון שלך מוכן\nכל שנשאר זה למלא את הפרטים הדרושים,\nולאחר מכן נוכל להתחיל בחוויית רגע'
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
            placeholder="שם פרטי"
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
            placeholder="אימייל"
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
            placeholder="סיסמא"
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
            placeholder="וידוא סיסמא"
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
            onFillColor="#fdedd6"
          />
          <TouchableOpacity
            style={{ marginBottom: 10, marginRight: 15 }}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <AppText
              black
              style={{
                fontSize: 18,
                paddingTop: 8,
                color: 'blue',
                textDecorationLine: 'underline',
                textAlign: 'left',
              }}>
              מדיניות הפרטיות ותנאי השימוש
            </AppText>
          </TouchableOpacity>
        </View>
        <View className="w-full" style={{ marginTop: scale(40) }}>
          <AppButton onPress={onContinue}>הרשמה</AppButton>
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
