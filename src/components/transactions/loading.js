import React from 'react';
import { View, Image } from 'react-native';
import noActivity from '../../assets/images/loadingWallet.png';
import { P } from '../toolBox/typography';
import styles from './styles';

const LoadingState = () =>
  <View style={styles.emptyState}>
    <Image source={noActivity} style={styles.noActivity} />
    <P style={styles.noTxTitle}>Loading account info...</P>
  </View>;

export default LoadingState;
