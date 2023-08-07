import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import io from 'socket.io-client';

// import { QueryClientProvider } from '@tanstack/react-query';
// import { I18nextProvider } from 'react-i18next';
// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import Navigator from 'navigation/components/Navigator/Navigator';
// import { ApplicationsProvider } from 'modules/BlockchainApplication/context/ApplicationsContext';
// import { ThemeProvider } from 'contexts/ThemeContext';
// import { ModalProvider } from 'contexts/ModalContext';

// import Alert from 'components/shared/alert';
// import StatusBar from 'components/shared/StatusBar';
// import reactQueryClient from 'utilities/api/reactQueryClient';
// import store, { persistedStore } from 'store/index';
// import BootstrapApp from './BootstrapApp';
// import i18n from '../locales';
// import WalletConnectProvider from '../libs/wcm/context/connectionProvider';
// import { useRegisterAndroidModules } from './hooks/useRegisterAndroidModules';

export default function App() {
  useEffect(() => {
    const socket = io('wss://betanet-service.lisk.com/blockchain', {
      transports: ['websocket'],
    });

    socket.on('connect_error', (error) => {
      console.log('Connection Error: ', error);
      console.log('Error msg: ', error.message);
    });

    socket.on('connect', () => {
      console.log('WebSocket client connected');
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('WebSocket client disconnected:', reason);
    });

    socket.on('message', (data) => {
      console.log('WebSocket message:', data);
    });
  }, []);

  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
  // useRegisterAndroidModules();

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <I18nextProvider i18n={i18n}>
  //       <QueryClientProvider client={reactQueryClient}>
  //         <WalletConnectProvider>
  //           <ReduxProvider store={store}>
  //             <PersistGate loading={null} persistor={persistedStore}>
  //               <ApplicationsProvider>
  //                 <ThemeProvider>
  //                   <ModalProvider>
  //                     <BootstrapApp>
  //                       <Navigator>
  //                         <StatusBar />
  //                         <Alert />
  //                       </Navigator>
  //                     </BootstrapApp>
  //                   </ModalProvider>
  //                 </ThemeProvider>
  //               </ApplicationsProvider>
  //             </PersistGate>
  //           </ReduxProvider>
  //         </WalletConnectProvider>
  //       </QueryClientProvider>
  //     </I18nextProvider>
  //   </GestureHandlerRootView>
  // );
}
