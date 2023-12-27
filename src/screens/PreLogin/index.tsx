import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { AppleLoginButton } from '@common/components/buttons/AppleLoginButton';
import { EmailLoginButton } from '@common/components/buttons/EmailLoginButton';
import { FacebookLoginButton } from '@common/components/buttons/FacebookLoginButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import { useLoginActions } from '@services/hooks/useLoginActions';
import isLowResolution from '@utils/isLowResolution';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

import WomanReadingSVG from './WomanReading';

const PreLogin: React.FC = () => {
  const { onAppleButtonPress, onFblogin: onFBButtonPress } = useLoginActions();
  const { getAppData } = useAppData();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const accessToken = useSelector<any, string>(
    state => state.userDetails.accessToken,
  ); // Adjust types accordingly
  const appDataloaded = useSelector<any, boolean>(
    state => state.appData.loaded,
  );
  const firstCourse = useSelector<any, any>(firstCourseSelector);
  const { navigate } = useNavigation<NavigationProp<any>>();

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
      navigate('Home');
    }
  }, [appDataloaded, firstCourse, navigate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        padding: scale(24),
        alignItems: 'center',
      }}>
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
      <WomanReadingSVG style={{ marginTop: scale(30) }} />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: scale(40),
        }}>
        {Platform.OS === 'ios' && (
          <AppleLoginButton onPress={onAppleButtonPress} />
        )}
        <FacebookLoginButton onPress={onFBButtonPress} />
        <EmailLoginButton navigate={navigate} />
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
};

export default PreLogin;
