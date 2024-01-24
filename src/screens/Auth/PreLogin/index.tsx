import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { firstCourseSelector } from '@store/selectors';
import alert from '@utils/alert';
import logger from '@utils/logger';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import IconFA from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';

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
  const [isLoading, setIsLoading] = useState(false);
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

  const loginWith = async (provider: string) => {
    setIsLoading(true);

    try {
      switch (provider) {
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'google':
          await loginWithGoogle();
          break;
        case 'apple':
          await loginWithApple();
          break;
      }
    } catch (error) {
      logger.error(error);
      alert(
        'היי אנחנו חווים תקלה בהתחברות דרך ערוץ זה, אנא נסו שנית או בחרו ערוץ התחברות אחר',
      );

      setIsLoading(false);
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
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator className="mb-4" size="large" color="#000" />
          <AppText>טוען...</AppText>
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: scale(40),
          }}>
          <View className="flex flex-row space-x-4">
            {['facebook', 'google', 'apple'].map(provider => (
              <TouchableOpacity
                key={provider}
                onPress={() => loginWith(provider)}
                style={{
                  backgroundColor: '#273051',
                  width: 56,
                  height: 56,
                  borderRadius: 56 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconFA name={provider} size={56 / 2} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-center text-black text-lg my-4">או</Text>
          <EmailLoginButton
            onPress={() => navigate('Auth', { screen: 'Login' })}
          />
          <Text className="text-center text-black text-md mt-20">
            חדשים פה?
          </Text>

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
      )}
    </View>
  );
};

export default PreLogin;
