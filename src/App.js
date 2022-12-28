import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Router from 'navigation';
import Alert from 'components/shared/alert';
import StatusBar from 'components/shared/StatusBar';
import reactQueryClient from 'utilities/api/reactQueryClient';
import { ThemeProvider } from './contexts/ThemeContext';
import i18n from '../locales';
import store, { persistedStore } from './store/index';
import { ApplicationsProvider } from './modules/BlockchainApplication/context/ApplicationsContext';
import WalletConnectProvider from '../libs/wcm/context/connectionProvider';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={reactQueryClient}>
        <WalletConnectProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
              <ApplicationsProvider>
                <ThemeProvider>
                  <StatusBar />
                  <Router />
                  <Alert />
                </ThemeProvider>
              </ApplicationsProvider>
            </PersistGate>
          </ReduxProvider>
        </WalletConnectProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
