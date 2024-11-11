import AppText from '@common/components/AppText';
import Gradient from '@common/components/Gradient';
import Logo from '@common/components/Logo';
import Meditate from '@common/components/animation/Meditate';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useLogin from '@services/hooks/useLogin';
import { useUser } from '@services/hooks/useUser';
import { firstCourseSelector } from '@store/selectors';
import { useLoginStore } from '@store/useLoginStore';
import alert from '@utils/alert';
import logger from '@utils/logger';
import React, { FC, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';

import { SOCIAL_ICONS } from './Icons';

type PreLoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth',
  'PreLogin'
>;

// type ProfileScreenProps = CompositeScreenProps<
//   NativeStackScreenProps<RootStackParamList, 'Main'>,
//   NativeStackScreenProps<RootStackParamList, 'Auth', 'PreLogin'>
// >;

const PreLogin: FC<PreLoginProps> = ({ navigation: { reset, navigate } }) => {
  const { isLoading, setIsLoading } = useLoginStore(state => state);
  const { loginWithApple, loginWithFacebook, loginWithGoogle } = useLogin();
  const { getAppData } = useAppData();
  const {
    user: { accessToken },
  } = useUser();
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
      reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [appDataLoaded, firstCourse, reset]);

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

    setIsLoading(false);
  };

  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        padding: scale(30),
        alignItems: 'center',
      }}>
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Gradient colors={['#4F84D5', '#A9B8E8', '#FFF8EE']} angle={0} />
      </View>
      <View
        className="h-1/2"
        style={{
          paddingTop: insets.top,
        }}>
        <View className="flex-col items-center">
          <Logo height={40} />
          <AppText
            medium
            style={{
              fontSize: 42,
              marginTop: scale(4),
              color: '#fff',
            }}>
            רגע
          </AppText>
        </View>
        <View
          style={{
            width: width / 3,
          }}>
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
          <ActivityIndicator className="mb-4" size="large" color="#fff" />
          <AppText
            style={{
              color: '#000',
            }}>
            טוען...
          </AppText>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: insets.bottom,
            paddingBottom: scale(24),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 48,
          }}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}>
            <EmailLoginButton
              onPress={() => navigate('Auth', { screen: 'Login' })}
            />
            <Text className="text-center text-black text-lg">או</Text>

            <View
              row
              style={{
                gap: 8,
              }}>
              {['facebook', 'google', 'apple'].map(provider => {
                const SocialIcon = SOCIAL_ICONS[provider];

                return (
                  <TouchableOpacity
                    center
                    style={{
                      backgroundColor: '#FFF',
                      flex: 1,
                      borderRadius: 100,
                      height: 64,
                      width: width / 3.5,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}
                    onPress={() => loginWith(provider)}>
                    <SocialIcon />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="flex-col items-center gap-1">
            <Text className="text-center text-black text-md">חדשים פה?</Text>
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
      )}
    </View>
  );
};

export default PreLogin;
