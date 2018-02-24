import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/login';
import { Provider } from 'react-redux';
import store from './src/store/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Login />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
