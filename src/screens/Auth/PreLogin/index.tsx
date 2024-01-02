import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import React, { FC, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import IconFA from 'react-native-vector-icons/FontAwesome6';
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

  const loginWith = (provider: string) => {
    switch (provider) {
      case 'facebook':
        loginWithFacebook();
        break;
      case 'google':
        loginWithGoogle();
        break;
      case 'apple':
        loginWithApple();
        break;
    }
  };

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
        <EmailLoginButton
          onPress={() => navigate('Auth', { screen: 'Login' })}
        />
        <Text className="text-center text-black text-lg mt-2 mb-2">או</Text>
        <View className="flex flex-row space-x-4">
          {['facebook', 'google', 'apple'].map((provider, index) => (
            <TouchableOpacity
              key={provider}
              onPress={() => loginWith(provider)}
              style={{
                backgroundColor: '#273051',
                width: 48,
                height: 48,
                borderRadius: 48 / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconFA name={provider} size={48 / 2} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-center text-black text-md mt-20">חדשים פה?</Text>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigate('Register')}>
          <AppText
            black
            style={{
              fontSize: 16,
              textDecorationLine: 'underline',
              color: 'black',
            }}>
            הירשמו
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreLogin;
