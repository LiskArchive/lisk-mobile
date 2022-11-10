import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { StatusBar, View } from 'react-native';
import Router from 'navigation';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@walletconnect/react-native-compat';

import { colors, themes } from 'constants/styleGuide';
import Alert from 'components/shared/alert';
import reactQueryClient from 'utilities/api/reactQueryClient';
import ThemeContext from './contexts/theme';
import i18n from '../locales';
import store, { persistedStore } from './store/index';
import ConnectionProvider from '../libs/wcm/context/connectionProvider';
import { ApplicationsProvider } from './modules/BlockchainApplication/context/ApplicationsContext';
// import { server } from '../services/msw/server';

// server.listen({});

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={reactQueryClient}>
        <ConnectionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
              <ApplicationsProvider>
                <ThemedApp />
              </ApplicationsProvider>
            </PersistGate>
          </Provider>
        </ConnectionProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

function ThemedApp() {
  const { theme } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === themes.dark ? colors.dark.black : colors.light.white,
      }}
    >
      <ThemeContext.Provider value={theme}>
        <StatusBar barStyle={theme === themes.light ? 'dark-content' : 'light-content'} />
        <Router />
        <Alert />
      </ThemeContext.Provider>
    </View>
  );
}
