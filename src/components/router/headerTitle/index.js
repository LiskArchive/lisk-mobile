import React from 'react';
import { Animated } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

const HeaderTitle = ({ styles, style, ...rest }) => (
  <Animated.Text
    {...rest}
    numberOfLines={1}
    style={[styles.main, styles.theme.main, style]}
    accessibilityTraits="header"
    allowFontScaling={false}
  />
);

export default withTheme(HeaderTitle, getStyles());
