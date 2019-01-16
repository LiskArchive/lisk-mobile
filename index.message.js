import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  NativeModules,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

class LiskMessageExtension extends Component {
  onReload = () => {
    NativeModules.DevMenu.reload();
  }

  onSayHello = () => {
    NativeModules.MessagesManager.sayHello();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.instructions} onPress={this.onReload}>
          Reload!
        </Text>

        <Text style={styles.instructions} onPress={this.onSayHello}>
          Say Hello!
        </Text>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('LiskMessageExtension', () => LiskMessageExtension);
