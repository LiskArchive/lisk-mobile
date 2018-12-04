import React from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

const HeaderBackground = ({ styles }) => (
  <View style={[styles.main, styles.theme.main]}></View>
);

export default withTheme(HeaderBackground, getStyles());
