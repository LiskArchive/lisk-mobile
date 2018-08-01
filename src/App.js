import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Router from './components/router';
import Loading from './components/loading';
import store from './store/index';


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

let navigator;
const stateChange = (prevState, currentState) => {
  const account = store.getState().accounts.active;
  const currentScreen = getActiveRouteName(currentState);
  if (!account && (currentScreen !== 'Login' && currentScreen !== 'Landing')) {
    navigator.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }
  if (account && (currentScreen === 'Login' || currentScreen === 'Landing')) {
    navigator.dispatch(NavigationActions.navigate({ routeName: 'OwnWallet' }));
  }
};

const App = () => (
  <Provider store={store}>
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Loading />
      <Router
      ref={(navigatorRef) => { navigator = navigatorRef; }}
      onNavigationStateChange={stateChange}/>
    </Fragment>
  </Provider>
);

export default App;
