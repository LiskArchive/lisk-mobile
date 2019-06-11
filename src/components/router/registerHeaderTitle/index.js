import React from 'react';
import { Animated } from 'react-native';
import { translate } from 'react-i18next';
import withTheme from '../../withTheme';
import getStyles from './styles';

const HeaderTitle = ({
  styles, t, children,
}) => (
  <Animated.Text
    numberOfLines={1}
    style={styles.main}
    accessibilityTraits="header"
    allowFontScaling={false}>
    {t(children)}
  </Animated.Text>
);

export default withTheme(translate()(HeaderTitle), getStyles());
