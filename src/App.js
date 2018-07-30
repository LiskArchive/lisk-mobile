import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Loading />
      <Router />
    </Fragment>
  </Provider>
);

export default App;
