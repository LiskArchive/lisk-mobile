import React from 'react';
import { View, Image } from 'react-native';
import noActivity from '../../assets/images/loading3x.png';
import styles from './styles';

const LoadingState = () =>
  <View style={styles.emptyState}>
    <Image source={noActivity} style={styles.loading} />
  </View>;

export default LoadingState;
