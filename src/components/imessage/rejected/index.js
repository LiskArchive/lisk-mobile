import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { B } from '../../toolBox/typography';
// import { colors } from '../../../constants/styleGuide';
import styles from './styles';

class Rejected extends Component {
  state = {
    errorMessage: false,
    triggered: false,
  }


  render() {
    const {
      sharedData: { amount },
      status,
    } = this.props;

    return (
      <View
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: status }} style={{ width: 250, height: 250 }} />
          <B style={styles.description}>
            Your request of {amount} LSK has been {status}.
          </B>
        </View>
      </View>
    );
  }
}

export default Rejected;
