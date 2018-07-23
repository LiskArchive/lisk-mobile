import React from 'react';
import { View, Image } from 'react-native';
import noActivity from '../../assets/images/noActivity.png';
import { P } from '../toolBox/typography';
import styles from './styles';

const EmptyState = () =>
  <View style={styles.emptyState}>
    <Image
      style={styles.noActivity}
      source={noActivity} />
    <P style={styles.noTxTitle}>You do not have a any recent activity.</P>
  </View>;

export default EmptyState;
