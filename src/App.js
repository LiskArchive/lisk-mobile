import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { StatusBar, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { colors, themes } from 'constants/styleGuide';
import Router from 'navigation';
import Alert from 'components/shared/alert';
import Modal from 'components/shared/modal';
import reactQueryClient from 'utilities/api/reactQueryClient';
import ThemeContext from './contexts/theme';
import i18n from '../locales';
import ConnectionProvider from '../libs/wcm/context/connectionProvider'
import store, { persistedStore } from './store/index';

const ThemedApp = () => {
  const { theme } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === themes.dark ? colors.dark.black : colors.light.white,
      }}
    >
      <ConnectionProvider>
        <ThemeContext.Provider value={theme}>
          <I18nextProvider i18n={i18n}>
            <StatusBar barStyle={theme === themes.light ? 'dark-content' : 'light-content'} />
            <Router />
            <Alert />
            <Modal />
          </I18nextProvider>
        </ThemeContext.Provider>
      </ConnectionProvider>
    </View>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
