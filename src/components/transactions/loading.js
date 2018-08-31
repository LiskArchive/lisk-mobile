import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import noActivity from '../../assets/images/loadingWallet.svg';
import { P } from '../toolBox/typography';
import styles from './styles';

const LoadingState = () =>
  <View style={styles.emptyState}>
    <SvgUri
      style={styles.noActivity}
      source={noActivity} />
    <P style={styles.noTxTitle}>Loading account info...</P>
  </View>;

export default LoadingState;
