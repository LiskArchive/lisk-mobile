import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Transactions from './src/components/transactions';
import { Provider } from 'react-redux';
import store from './src/store/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Transactions />
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
