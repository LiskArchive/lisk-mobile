import React from 'react';
import { StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import Router from './components/screens/router';
import Loading from './components/shared/loading';
import store from './store/index';
import ThemeContext from './contexts/theme';
import { themes } from './constants/styleGuide';
import i18n from '../locales';
import Alert from './components/shared/alert';
import Modal from './components/shared/modal';

const ThemedApp = () => {
  const { theme } = useSelector(state => state.settings);

  return (
    <ThemeContext.Provider value={theme}>
      <I18nextProvider i18n={i18n}>
        <StatusBar
          barStyle={theme === themes.light ? 'dark-content' : 'light-content'}
        />
        <Loading />
        <Router />
        <Alert />
        <Modal />
      </I18nextProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line no-undef
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
};

export default App;
