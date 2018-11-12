import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import connect from 'redux-connect-decorator';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';
import ThemeContext from './contexts/theme';

@connect(state => ({
  settings: state.settings,
}), {})
class ThemedApp extends React.Component {
  render() {
    return (<ThemeContext.Provider value={this.props.settings.theme}>
      <Fragment>
        <StatusBar barStyle="light-content" />
        <Loading />
        <Router />
      </Fragment>
    </ThemeContext.Provider>);
  }
}

const App = () => (
  <Provider store={store}>
    <ThemedApp />
  </Provider>);

export default App;
