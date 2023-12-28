import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import CheckBox from '@react-native-community/checkbox';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
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
    const fcmToken = await getFcmToken();
    if (!toggleCheckBox) {
      Alert.alert('please select checkbox');
      return;
    }
    if (password !== verifyPassword) {
      Alert.alert('סיסמאות לא תואמות');
    } else if (fcmToken) {
      // setLoader(true)
      signUp(email, password, name, fcmToken);
      // setLoader(false)
    } else {
      signUp(email, password, name);
    }
  };
  const {
    accessToken,
    id,
    loder,
    email: useremail,
  } = useSelector(state => state.userDetails);
  const appDataloaded = useSelector(state => state.appData.loaded);
  const amplitudeInstance = useAmplitude();

  const initRudderstack = async () => {
    await rudderClient.setup('2Ah3U42Qc6y9v3PB4w8sKYhvkkJ', {
      dataPlaneUrl: 'https://regatomxprg.dataplane.rudderstack.com',
      // trackLifecycleEvents: true,
      logLevel: RUDDER_LOG_LEVEL.DEBUG,
      flushQueueSize: 1,
      configRefreshInterval: 1,
    });
  };
  useEffect(() => {
    initRudderstack();
    if ((accessToken, id)) {
      amplitudeInstance.setUserId(id);
      amplitudeInstance.logEvent('SIGNUP', { userID: id });
      getAppData();
      rudderClient.identify(
        'UserID',
        {
          userID: id,
        },
        null,
      );
      rudderClient.track('register', {
        email: useremail || '',
      });
      rudderClient.identify('2CWOG3PZz8NEE6EICJOBFFAroDS', {
        email: useremail,
      });
      AppEventsLogger.logEvent(
        AppEventsLogger.AppEvents.CompletedRegistration,
        {
          [AppEventsLogger.AppEventParams.RegistrationMethod]: 'email',
        },
      );
      logEvent('register', {
        userName: name,
        email: useremail,
      });
    }
  }, [accessToken, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      navigation.navigate('Home');
    }
  }, [appDataloaded, navigation]);

  useEffect(
    function setLoaderFun() {
      setLoader(loder);
    },
    [loder],
  );
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#fdedd6' }}
      contentContainerStyle={{ alignItems: 'center', padding: scale(24) }}
      extraScrollHeight={40}
      keyboardOpeningTime={0}>
      <AppText black style={{ fontSize: 18, marginTop: scale(50) }}>
        איך זה?
      </AppText>
      <AppText
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginTop: scale(9),
          color: '#000000',
        }}>
        {
          'עוד רגע והחשבון שלך מוכן\nכל שנשאר זה למלא את הפרטים הדרושים,\nולאחר מכן נוכל להתחיל בחווית הרגע שהכנו לך'
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
      <View style={{ alignItems: 'center', marginTop: scale(40) }}>
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => navigation.goBack()}>
          <AppText
            black
            style={{ fontSize: 16, textDecorationLine: 'underline' }}>
            חזור למסך קודם
          </AppText>
        </TouchableOpacity>
        <AppButton onPress={() => onContinue()}>הרשמה</AppButton>
      </View>
      {loader && (
        <ActivityIndicator
          style={{ position: 'absolute', zIndex: 111, top: '50%' }}
          color="#273051"
          size="large"
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default Register;
