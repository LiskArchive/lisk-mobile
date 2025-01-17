import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import Navigator from 'navigation/components/Navigator/Navigator';
import { ApplicationsProvider } from 'modules/BlockchainApplication/context/ApplicationsContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import { ModalProvider } from 'contexts/ModalContext';

import { toastConfig } from 'components/shared/Toast/Toast.config';
import StatusBar from 'components/shared/StatusBar';
import reactQueryClient from 'utilities/api/reactQueryClient';
import store, { persistedStore } from 'store/index';
import i18n from '../locales';
import WalletConnectProvider from '../libs/wcm/context/connectionProvider';
import { useRegisterAndroidModules } from './hooks/useRegisterAndroidModules';
import { useNotifications } from './notifications/hooks/useNotifications';

export default function App() {
  useRegisterAndroidModules();
  useNotifications();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={reactQueryClient}>
          <WalletConnectProvider>
            <ReduxProvider store={store}>
              <PersistGate loading={null} persistor={persistedStore}>
                <ApplicationsProvider>
                  <ThemeProvider>
                    <ModalProvider>
                      <Navigator>
                        <StatusBar />
                        <Toast config={toastConfig} />
                      </Navigator>
                    </ModalProvider>
                  </ThemeProvider>
                </ApplicationsProvider>
              </PersistGate>
            </ReduxProvider>
          </WalletConnectProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}
