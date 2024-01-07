import { PurchaseProvider } from '@common/context/PurchaseContext';
import StoreUpdate from '@common/storeUpdate';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
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

Sentry.init({
  dsn: 'https://7cbd351b42844e4f925dd289d1781977@o4504887076978688.ingest.sentry.io/4504887078223872',
});

const { store, persistor } = configureStore();
Settings.initializeSDK();

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.bgColor,
  },
});

const App: React.FC = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  useEffect(() => {
    const init = async () => {
      // trackPlayerInit();
    };

    init();
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
              <PersistGate loading={null} persistor={persistor}>
                <StatusBar hidden />
                <ThemeProvider theme={theme}>
                  <StoreUpdate>
                    <View style={styles.rootContainer}>
                      <RootNavigator />
                    </View>
                  </StoreUpdate>
                </ThemeProvider>
              </PersistGate>
            </BottomSheetModalProvider>
          </PurchaseProvider>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

// App = codePush(codePushOptions)(App);
export default App;
