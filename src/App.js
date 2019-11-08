import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import connect from 'redux-connect-decorator';
import Router from './components/screens/router';
import Loading from './components/shared/loading';
import store from './store/index';
import ThemeContext from './contexts/theme';
import { themes } from './constants/styleGuide';
import i18n from '../locales';
import Alert from './components/shared/alert';
import Modal from './components/shared/modal';

@connect(
  state => ({
    settings: state.settings,
  }),
  {}
)
class ThemedApp extends React.Component {
  render() {
    const { theme } = this.props.settings;
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
  }
}

const App = () => (
  <Provider store={store}>
    <ThemedApp />
  </Provider>
);

export default App;
