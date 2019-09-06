import React from 'react';
import { Animated } from 'react-native';
import { translate } from 'react-i18next';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';

const HeaderTitle = ({ styles, t, children, ...rest }) => (
  <Animated.Text
    {...rest}
    numberOfLines={1}
    style={[styles.main, styles.theme.main]}
    accessibilityTraits="header"
    allowFontScaling={false}
  >
    {t(children)}
  </Animated.Text>
);

export default withTheme(translate()(HeaderTitle), getStyles());
