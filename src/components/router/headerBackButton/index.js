import React from 'react';
import { IconButton } from '../../toolBox/button';
import { colors, themes } from '../../../constants/styleGuide';
import withTheme from '../../withTheme';
import getStyles from './styles';

const HeaderBackButton = ({
  theme, styles, style, onPress, color, icon,
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }

  return (
    <IconButton
      style={[styles.main, styles.theme.main, style]}
      icon={icon || 'back'}
      onPress={onPress}
      color={color}
    />
  );
};

export default withTheme(HeaderBackButton, getStyles());
