import Gradient from '@common/components/Gradient';
import Logo from '@common/components/Logo';
import WithPulse from '@common/components/transitions/WIthPulse';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import config from '@common/config';
import StoreUpdate from '@common/storeUpdate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import {
  checkIsTokenValid,
  useRequestWithReauth,
} from '@services/hooks/useAxios/reauthWrapper';
import { useClearChatStore } from '@services/hooks/useClearChatStore';
import { useIntro } from '@services/hooks/useIntro';
import { logout } from '@store/actions';
import { useShowUpdateAppStore } from '@store/useShowUpdateAppStore';
import { initializeThirdParties } from '@utils/initialize-third-parties';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from './RootNavigator';

type RootState = any;

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: FC<SplashProps> = ({ navigation: { navigate, replace } }) => {
  const { isFirstTimeUser } = useIntro();
  const { getAppData } = useAppData();
  const { clearChatStore } = useClearChatStore();
  const dispatchAction = useDispatch();
  const [animationFinished, setAnimationFinished] = useState(false);
  const { logEvent, uploadEvents } = useAmplitude();
  const { executeApiRequest } = useRequestWithReauth();
  const isLoaded = useSelector((state: RootState) => state.appData.loaded);
  const user = useSelector((state: RootState) => state.userDetails);
  const { accessToken, id, email } = user || {};
  const { showUpdateModal, requestDone } = useShowUpdateAppStore(state => ({
    showUpdateModal: state.showUpdateModal,
    requestDone: state.requestDone,
  }));

  useEffect(() => {
    const timer = setTimeout(
      async () => {
        if (!requestDone) {
          return;
        }

        if (showUpdateModal) {
          // dispatchAction(logout());
          // clearChatStore();
          return;
        }

        if (accessToken) {
          const checkResult = await executeApiRequest(checkIsTokenValid);
          if (!checkResult) {
            dispatchAction(logout());
            clearChatStore();
            replace('Auth');
            return;
          }
          getAppData();
          initializeThirdParties(id, email);
        } else if (isFirstTimeUser) {
          logEvent(AMPLITUDE_EVENTS.ONBOARDING_START);
          uploadEvents();
          replace('Onboarding');
        } else {
          replace('Auth');
        }
      },
      config.isDev ? 1000 : 3000,
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accessToken,
    getAppData,
    isFirstTimeUser,
    requestDone,
    showUpdateModal,
    navigate,
  ]);

  useEffect(() => {
    if (animationFinished) {
      replace('Main');
    }
  }, [isLoaded, animationFinished, replace]);

  useEffect(() => {
    const simulateAnimationEnd = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationFinished(true);
    };

    simulateAnimationEnd();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Gradient colors={['#4F84D5', '#A9B8E8', '#FFF8EE']} angle={0} />
      <WithFadeIn delay={0} duration={1000}>
        <WithPulse scaleMin={0.9} scaleMax={1.2} duration={2000}>
          <Logo transform={[{ rotate: '-10deg' }]} />
        </WithPulse>
      </WithFadeIn>
      <StoreUpdate />
    </View>
  );
};

export default Splash;
