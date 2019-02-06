import React, { Component } from 'react';
import {
  View,
  NativeModules,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { B, Small, A } from '../../toolBox/typography';
import styles from './styles';

class SignOut extends Component {
  state = {
    sensorType: '',
  }

  async componentDidMount() {
    let sensorType;
    try {
      sensorType = await FingerprintScanner.isSensorAvailable();
    } catch (error) {
      sensorType = '';
    }
    this.setState({ sensorType });
  }
  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <B style={styles.title}>
            Seems like you’re not signed in
          </B>
          <Small style={styles.description}>
            Please make sure to
            <A
              style={styles.link}
              onPress={() => NativeModules.MessagesManager.openURL('lisk:')}
            > Sign in </A>
            with {this.state.sensorType} before proceeding with the request.
          </Small>
        </View>
      </View>
    );
  }
}

export default SignOut;
