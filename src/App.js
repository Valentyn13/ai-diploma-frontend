// import codePush from 'react-native-code-push';
import StoreUpdate from '@common/storeUpdate';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import useSyncUserData from '@services/hooks/useSyncUserData';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled, { ThemeProvider } from 'styled-components';

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
console.log('initializing app');
const RootView = styled(SafeAreaView).attrs({
  backgroundColor: colors.bgColor,
})`
  flex: 1;
  align-self: stretch;
`;

const SyncedRootNavigator = () => {
  useSyncUserData();
  return <RootNavigator />;
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <NavigationContainer>
      <Provider {...{ store }}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <ThemeProvider {...{ theme }}>
            <StoreUpdate>
              <RootView>
                <SyncedRootNavigator />
              </RootView>
            </StoreUpdate>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
// App = codePush(codePushOptions)(App);
export default App;
