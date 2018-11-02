import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';
import { backgroundTaskInit } from './utilities/backgroundTask';


const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

backgroundTaskInit();

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
