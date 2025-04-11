import image from '@common/assets/images';
import AppText from '@common/components/AppText';
import Gradient from '@common/components/Gradient';
import Logo from '@common/components/Logo';
import Meditate from '@common/components/animation/Meditate';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import Theme from '@common/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import { useUser } from '@services/hooks/useUser';
import { useLoginStore } from '@store/useLoginStore';
import React, { FC, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';

//import { SOCIAL_ICONS } from './Icons';

type PreLoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth',
  'PreLogin'
>;

const PreLogin: FC<PreLoginProps> = ({ navigation: { navigate } }) => {
  const { isLoading, setIsLoading } = useLoginStore(state => state);
  const { getAppData } = useAppData();
  const {
    user: { accessToken },
  } = useUser();
  const appDataLoaded = useSelector<any, boolean>(
    state => state.appData.loaded,
  );

  useEffect(() => {
    if (accessToken) {
      getAppData();
    }
  }, [accessToken, getAppData]);

  useEffect(() => {
    if (appDataLoaded) {
      // @ts-ignore TODO: fix this
      navigate('Main', { screen: 'Home' });
    }
  }, [appDataLoaded, navigate]);

  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.colors.bgColor,
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
          <View>
            <FastImage
              className="w-[40px] h-[40px]"
              resizeMode="cover"
              source={image('logo')}
            />
          </View>

          <AppText
            style={{
              fontSize: 32,
              marginTop: scale(4),
              color: '#fff',
            }}>
            Quill
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
            <Text className="text-center text-black text-lg">або</Text>
          </View>

          <View className="flex-col items-center gap-1">
            <Text className="text-center text-black text-md">
              Немає акаунту?
            </Text>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <AppText
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  color: 'black',
                }}>
                Зареєструватися
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PreLogin;
