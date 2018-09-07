import React from 'react';
import { View, Image } from 'react-native';
import noActivity from '../../assets/images/noActivity/noActivity2x.png';
import { P } from '../toolBox/typography';
import styles from './styles';

const EmptyState = () =>
  <View style={styles.emptyState}>
    <View style={styles.noActivity}>
      <Image style={styles.image} source={noActivity} />
    </View>
    <P style={styles.noTxTitle}>You do not have any recent activity.</P>
  </View>;

export default EmptyState;
