import React from 'react';
import { View } from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

const Progress = ({ current, total, styles }) => (
  <View style={styles.progressContainer}>
    <View
      style={[styles.progress, {
        width: `${(current / total) * 100}%`,
      }]}
    />
  </View>
);

export default withTheme(Progress, getStyles());
