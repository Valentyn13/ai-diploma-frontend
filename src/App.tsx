import { LDProvider } from '@common/context/LDContext';
import { PurchaseProvider } from '@common/context/PurchaseContext';
import { TrackPlayerProvider } from '@common/context/TrackPlayerContext';
import StoreUpdate from '@common/storeUpdate';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import useSentry from '@services/hooks/useSentry';
import React, { useEffect } from 'react';
import { LogBox, StatusBar, StyleSheet, View } from 'react-native';
import { CopilotProvider } from 'react-native-copilot';
import { Settings } from 'react-native-fbsdk-next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

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
    backgroundColor: colors.bgColor,
  },
});

LogBox.ignoreLogs([]);

const App: React.FC = () => {
  useSentry();
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  const linking = {
    prefixes: ['rega://'],
    config: {
      screens: {
        Home: 'home',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <GestureHandlerRootView className="flex-1">
        <Provider store={store}>
          <PurchaseProvider>
            <BottomSheetModalProvider>
              <LDProvider>
                <PersistGate loading={null} persistor={persistor}>
                  <StatusBar hidden />
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
              </LDProvider>
            </BottomSheetModalProvider>
          </PurchaseProvider>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
