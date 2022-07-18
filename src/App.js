import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import { colors, themes } from 'constants/styleGuide';
import Router from 'navigation';
import Alert from 'components/shared/alert';
import Modal from 'components/shared/modal';
import ThemeContext from './contexts/theme';
import i18n from '../locales';
import store, { persistedStore } from './store/index';

const ThemedApp = () => {
  const { theme } = useSelector(state => state.settings);

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme === themes.dark
        ? colors.dark.black : colors.light.white
    }} >
      <ThemeContext.Provider value={theme}>
        <I18nextProvider i18n={i18n}>
          <StatusBar
            barStyle={theme === themes.light ? 'dark-content' : 'light-content'}
          />
          <Router />
          <Alert />
          <Modal />
        </I18nextProvider>
      </ThemeContext.Provider>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore} >
        <ThemedApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
