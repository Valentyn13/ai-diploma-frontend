import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import { AppleLoginButton } from '@common/components/buttons/AppleLoginButton';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import { FacebookLoginButton } from '@common/components/buttons/FacebookLoginButton';
import { GoogleLoginButton } from '@common/components/buttons/GoogleLoginButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import React, { FC, useEffect } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

type PreLoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth',
  'PreLogin'
>;

// type ProfileScreenProps = CompositeScreenProps<
//   NativeStackScreenProps<RootStackParamList, 'Main'>,
//   NativeStackScreenProps<RootStackParamList, 'Auth', 'PreLogin'>
// >;

const PreLogin: FC<PreLoginProps> = ({ navigation: { navigate } }) => {
  const { loginWithApple, loginWithFacebook, loginWithGoogle } = useLogin();
  const { getAppData } = useAppData();
  const accessToken = useSelector<any, string>(
    state => state.userDetails.accessToken,
  );
  const appDataLoaded = useSelector<any, boolean>(
    state => state.appData.loaded,
  );
  const firstCourse = useSelector<any, any>(firstCourseSelector);

  useEffect(() => {
    if (accessToken) {
      getAppData();
    }
  }, [accessToken, getAppData]);

  useEffect(() => {
    if (appDataLoaded) {
      // @ts-ignore TODO: fix this
      navigate('Main', {
        screen: 'Tabs',
        params: {
          screen: 'Home',
        },
      });
    }
  }, [appDataLoaded, firstCourse, navigate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        padding: scale(24),
        alignItems: 'center',
      }}>
      <View className="h-1/2">
        <View className="flex-col items-center">
          <Icon style={{ marginTop: scale(40) }} name="logo" size={40} />
          <AppText
            style={{ fontSize: 50, marginTop: scale(30), color: 'black' }}
            black>
            רגע לעצמך
          </AppText>
          <AppText style={{ fontSize: 18, color: 'black' }}>
            זה כל מה שצריך
          </AppText>
        </View>
        <View className="mt-4 flex-1">
          <Meditate />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: scale(40),
        }}>
        {Platform.OS === 'ios' && <AppleLoginButton onPress={loginWithApple} />}
        <FacebookLoginButton onPress={loginWithFacebook} />
        <GoogleLoginButton onPress={loginWithGoogle} />
        <EmailLoginButton navigate={navigate} />
        <AppText style={{ fontSize: 16, marginTop: 20, color: 'black' }}>
          נרשמת בעבר?
        </AppText>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigate('Auth', { screen: 'Login' })}>
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
};

export default PreLogin;
