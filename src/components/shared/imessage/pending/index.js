import React from 'react';
import { View, Image } from 'react-native';
import { B } from '../../toolBox/typography';
import styles from './styles';

const Pending = ({ sharedData: { amount } }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Image source={{ uri: 'requested' }} style={styles.image} />
      <B style={styles.description}>Your request of {amount} LSK is still pending.</B>
    </View>
  </View>
);

export default Pending;
