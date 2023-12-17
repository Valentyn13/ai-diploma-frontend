/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import isLowResolution from '@utils/isLowResolution';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

const PreLogin = ({ navigation }) => {
  const { loginWithFacebook, loginWithApple } = useLogin();
  const { getAppData } = useAppData();
  const [showLoading, setShowLoading] = useState(false);
  const accessToken = useSelector(state => state.userDetails.accessToken);
  const appDataloaded = useSelector(state => state.appData.loaded);
  const firstCourse = useSelector(firstCourseSelector);
  // const {hasPremium} = usePurchases();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (accessToken) {
      getAppData();
    }
    return () => {
      setShowLoading(false);
    };
  }, [accessToken, getAppData]);

  useEffect(() => {
    if (appDataloaded) {
      setShowLoading(false);
      if (firstCourse) {
        const courseMeditations = firstCourse.meditations;
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
  }, [appDataloaded, firstCourse, navigation]);

  async function onAppleButtonPress() {
    // performs login request
    loginWithApple();
  }

  const onFblogin = () => {
    setShowLoading(true);
    loginWithFacebook();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        padding: scale(24),
        alignItems: 'center',
      }}>
      {/* {showLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
            width: '150%',
            height: '100%',
            right: 0,
            zIndex: 999,
          }}>
          <ActivityIndicator
            size="large"
            color="green"
            style={{alignSelf: 'center', position: 'absolute', top: '60%'}}
          />
        </View>
      )} */}
      <Icon
        style={{ marginTop: scale(40) }}
        name="logo"
        size={isLowResolution ? 40 : 40}
      />
      <AppText
        style={{ fontSize: 50, marginTop: scale(30), color: 'black' }}
        black>
        רגע לעצמך
      </AppText>
      <AppText style={{ fontSize: 18, color: 'black' }}>זה כל מה שצריך</AppText>
      <Image style={{ marginTop: scale(30) }} source={image('login_bg')} />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: scale(40),
        }}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              paddingVertical: 20,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
              borderRadius: 8,
            }}
            onPress={() => onAppleButtonPress()}>
            <AppText
              bold
              style={{ color: '#000', fontSize: 16, textAlign: 'center' }}>
              הרשמה עם Apple
            </AppText>
            <Image
              source={image('apple_logo')}
              style={{ position: 'absolute', left: 10, height: 25, width: 25 }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            paddingVertical: 20,
            paddingHorizontal: 30,
            backgroundColor: '#1976D2',
            borderRadius: 8,
            marginTop: 10,
          }}
          onPress={() => onFblogin()}>
          <AppText
            bold
            style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            הרשמה עם פייסבוק
          </AppText>
          <Image
            source={image('fb')}
            style={{ position: 'absolute', left: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginTop: 10,
            alignItems: 'center',
            width: '90%',
            paddingVertical: 20,
            paddingHorizontal: 30,
            backgroundColor: '#273051',
            borderRadius: 8,
          }}
          onPress={() => navigate('Register')}>
          <AppText
            bold
            style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            הרשמה עם אימייל
          </AppText>
          <Image
            source={image('email')}
            style={{ position: 'absolute', left: 10 }}
          />
        </TouchableOpacity>
        <AppText style={{ fontSize: 16, marginTop: 20, color: 'black' }}>
          נרשמת בעבר?
        </AppText>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <AppText
            black
            style={{
              fontSize: 16,
              textDecorationLine: 'underline',
              color: 'black',
            }}>
            התחבר
          </AppText>
        </TouchableOpacity>
      </View>
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

PreLogin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PreLogin;
