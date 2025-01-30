import config from '@common/config';
import { PurchaseProvider } from '@common/context/PurchaseContext';
import { TrackPlayerProvider } from '@common/context/TrackPlayerContext';
import StoreUpdate from '@common/storeUpdate';
import theme from '@common/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import useSentry from '@services/hooks/useSentry';
import WithFeatureFlag from '@utils/WithFeatureFlag';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { CopilotProvider } from 'react-native-copilot';
import { Settings } from 'react-native-fbsdk-next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import setDefaultProps from 'react-native-simple-default-props';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import './PolyfillConfig';
import {
  notificationListner,
  requestUserPermission,
} from './helper/pushNotifications';
import RootNavigator from './screens/RootNavigator';
import configureStore from './store';

const { store, persistor } = configureStore();
Settings.initializeSDK();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignSelf: 'stretch',
    color: theme.colors.textColor,
    backgroundColor: theme.colors.bgColor,
  },
});

setDefaultProps(TextInput, {
  allowFontScaling: false,
  style: [{ fontFamily: 'Rubik' }],
});

setDefaultProps(Text, {
  allowFontScaling: false,
  style: [{ fontFamily: 'Rubik' }],
});

const App: React.FC = () => {
  useSentry();
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <WithFeatureFlag>
          <PurchaseProvider>
            <BottomSheetModalProvider>
              <PersistGate loading={null} persistor={persistor}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ThemeProvider theme={theme}>
                  <StoreUpdate>
                    <TrackPlayerProvider>
                      <CopilotProvider
                        backdropColor="rgba(0, 0, 0, 0.7)"
                        overlay="svg"
                        arrowColor="#513F73"
                        labels={{
                          skip: 'דלג',
                          previous: 'חזור',
                          next: 'הבא',
                          finish: 'סיום',
                        }}
                        tooltipStyle={{
                          borderRadius: 8,
                          padding: 8,
                          backgroundColor: '#513F73',
                        }}>
                        <View style={styles.rootContainer}>
                          <RootNavigator />
                        </View>
                      </CopilotProvider>
                    </TrackPlayerProvider>
                  </StoreUpdate>
                </ThemeProvider>
              </PersistGate>
            </BottomSheetModalProvider>
          </PurchaseProvider>
        </WithFeatureFlag>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default config.isDev ? App : Sentry.wrap(App);
