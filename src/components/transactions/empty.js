import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import noActivity from '../../assets/images/noActivity.svg';
import { P } from '../toolBox/typography';
import styles from './styles';

const EmptyState = () =>
  <View style={styles.emptyState}>
    <SvgUri
      style={styles.noActivity}
      source={noActivity} />
    <P style={styles.noTxTitle}>You do not have any recent activity.</P>
  </View>;

export default EmptyState;
