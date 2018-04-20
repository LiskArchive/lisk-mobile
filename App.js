import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Router from './src/components/router';
import { Provider } from 'react-redux';
import store from './src/store/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
