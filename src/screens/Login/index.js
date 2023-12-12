import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import { SubTitle } from '@common/components/Styled';
import crashlytics from '@react-native-firebase/crashlytics';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import usePurchases from '@services/hooks/usePurchases';
import { logEvent } from '@utils/analytics';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setLoder } from 'store/actions';
import { firstCourseSelector } from 'store/selectors';
import styled from 'styled-components';

import { getFcmToken } from '../../helper/pushNotifications';

const TabBarButtonContainer = styled.TouchableOpacity`
  background-color: ${({ selected, theme: { colors } }) =>
    selected ? colors.selectedTabBgColor : colors.itemBgColor};
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 45px;
  padding-right: 45px;
`;

const TabBarButton = ({ k, selected, onPress }) => (
  <TabBarButtonContainer {...{ selected, onPress }}>
    <SubTitle {...{ k }} />
  </TabBarButtonContainer>
);

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const {
    accessToken,
    id,
    loder,
    email: userEmail,
    name,
  } = useSelector(state => state.userDetails);
  const appDataloaded = useSelector(state => state.appData.loaded);
  const firseCourse = useSelector(firstCourseSelector);
  const { hasPremium } = usePurchases();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { loginWithEmail } = useLogin();
  const { getAppData } = useAppData();
  const amplitudeInstance = useAmplitude();

  const onContinue = async () => {
    const fcmToken = await getFcmToken();
    dispatch(setLoder());
    loginWithEmail(email, password, fcmToken);
  };
  const initCrashlytics = async () => {
    await Promise.all([
      crashlytics().setUserId(id),
      crashlytics().setAttributes({
        email,
        username: userEmail,
      }),
      logEvent('LOGIN', {
        userName: name,
        email: userEmail,
      }),
    ]);
  };
  useEffect(() => {
    if (accessToken) {
      amplitudeInstance.setUserId(id);
      amplitudeInstance.logEvent('LOGIN', { userID: id });
      amplitudeInstance.uploadEvents();
      getAppData();
      initCrashlytics();
    }
  }, [accessToken, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      if (firseCourse) {
        const courseMeditations = firseCourse.meditations;
        if (courseMeditations && courseMeditations.length > 0) {
          const item = courseMeditations[0];
          navigation.navigate('MeditationPlayer', { item, autoPlay: true });
          // if (!hasPremium) {
          //     navigation.navigate('Subscribe', {firstRun: true});
          // } else {
          //     navigation.navigate('MeditationPlayer', {item, autoPlay: true});
          // }
        } else {
          navigation.navigate('Home');
        }
      } else {
        navigation.navigate('Home');
      }
    }
  }, [appDataloaded, navigation]);

  useEffect(() => {
    setLoader(loder);
  }, [loder]);
  return (
    <View style={{ flex: 1, backgroundColor: '#fdedd6' }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, padding: scale(24) }}>
        <AppText
          black
          style={{
            fontSize: 18,
            marginTop: scale(60),
            textAlign: 'center',
            color: 'black',
          }}>
          התחבר עם פרטי ההתחברות שלך
        </AppText>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: scale(100),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image source={image('email2')} />
          <AppTextInput
            onChangeText={text => setEmail(text)}
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="done"
            placeholder="אימייל"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
              color: 'black',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image source={image('lock')} />
          <AppTextInput
            onChangeText={text => setPassword(text)}
            secureTextEntry
            placeholderTextColor="grey"
            returnKeyType="done"
            placeholder="סיסמא"
            style={{
              width: '90%',
              marginHorizontal: 20,
              fontSize: 20,
              textAlign: 'right',
              color: 'black',
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          bottom: isKeyboardVisible ? scale(40) : scale(40),
        }}>
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => navigation.goBack()}>
          <AppText
            black
            style={{
              fontSize: 16,
              textDecorationLine: 'underline',
              color: 'black',
            }}>
            חזור למסך קודם
          </AppText>
        </TouchableOpacity>
        <AppButton onPress={() => onContinue()}>התחברות</AppButton>
      </View>
      {loader && (
        <ActivityIndicator
          style={{ position: 'absolute', zIndex: 111, top: '50%', left: '50%' }}
          color="#273051"
          size="large"
        />
      )}
    </View>
  );

  // return (
  //     <LoginScreen>
  //         <StyledKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  //             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //                 <Container>
  //                     <Icon name="logo" size={isLowResolution ? 70 : 125}/>
  //                     <TabBarButtonss>
  //                         <TabBarButton k="login" selected={!isSignUp} onPress={() => setIsSignUp(false)}/>
  //                         <TabBarButton k="signup" selected={isSignUp} onPress={() => setIsSignUp(true)}/>
  //                     </TabBarButtonss>
  //                     <SignUpTitle k={isSignUp ? 'signupTitle' : 'loginTitle'}/>
  //                     {isSignUp && <InputField label="name" value={name} onChangeText={setName}/>}
  //                     <InputField label="email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
  //                     <InputField label="password" value={password} onChangeText={setPassword}/>
  //                     {isSignUp &&
  //                     <InputField label="verifyPassword" value={verifyPassword} onChangeText={setVerifyPassword}/>}
  //                     <Button title="login" onPress={onButtonPress} big/>
  //                     <SignUpTitle k="facebookTitle"/>
  //                     <Button title="facebook" onPress={loginWithFacebook} big fb/>
  //                 </Container>
  //             </TouchableWithoutFeedback>
  //         </StyledKeyboardAvoidingView>
  //     </LoginScreen>
  // );
};

TabBarButton.propTypes = {
  k: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
