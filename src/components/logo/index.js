import React from 'react';
import { View } from 'react-native';
import Icon from '../shared/toolBox/icon';
import { colors } from '../../constants/styleGuide';
import withTheme from '../shared/withTheme';
import getStyles from './styles';

const Logo = ({
  color, size, styles, style,
}) =>
  <View style={[styles.image, style]}>
    <Icon name='lisk' color={color || colors.light.black} size={size || 100} />
  </View>;

export default withTheme(Logo, getStyles());
