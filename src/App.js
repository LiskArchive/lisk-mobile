import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';
import ThemeContext from './contexts/theme';
import { themes } from './constants/styleGuide';

class App extends React.Component {
  state = {
    theme: themes.light,
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={this.state.theme}>
          <Fragment>
            <StatusBar barStyle="light-content" />
            <Loading />
            <Router />
          </Fragment>
       </ThemeContext.Provider>
      </Provider>
    );
  }
}

export default App;
