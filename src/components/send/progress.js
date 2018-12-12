import React from 'react';
import { View } from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

const Progress = ({ current, total, styles }) => (
  <View style={[styles.progressContainer, styles.theme.progressContainer]}>
    <View
      style={[styles.progress, styles.theme.progress, {
        width: `${(current / total) * 100}%`,
      }]}
    />
  </View>
);

export default withTheme(Progress, getStyles());
