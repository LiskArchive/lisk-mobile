import React from 'react';
import { View, Image } from 'react-native';
import noActivity from '../../assets/images/loading3x.png';
import withTheme from '../withTheme';
import getStyles from './styles';

const LoadingState = ({ styles }) =>
  <View style={styles.emptyState}>
    <Image source={noActivity} style={styles.loading} />
  </View>;

export default withTheme(LoadingState, getStyles());
