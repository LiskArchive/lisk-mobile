import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './src/components/landing';
import { Provider } from 'react-redux';
import store from './src/store/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Landing />
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
