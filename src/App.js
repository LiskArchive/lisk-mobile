import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ApplicationsProvider } from 'modules/BlockchainApplication/context/ApplicationsContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import { ModalProvider } from 'contexts/ModalContext';
import Navigator from 'navigation';
import Alert from 'components/shared/alert';
import StatusBar from 'components/shared/StatusBar';
import reactQueryClient from 'utilities/api/reactQueryClient';
import store, { persistedStore } from 'store/index';
import BootstrapApp from './BootstrapApp';
import i18n from '../locales';
import WalletConnectProvider from '../libs/wcm/context/connectionProvider';

// lisk://wallet?recipientAccountAddress=lsk9twjxynbm5fbgmgw7ykffyw3t2qzr68me5h4ru&amount=1.002&recipientApplicationChainID=04000000&tokenID=0400000000000000

export default function App() {
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
                      <BootstrapApp>
                        <Navigator>
                          <StatusBar />
                          <Alert />
                        </Navigator>
                      </BootstrapApp>
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
