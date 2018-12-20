import React from 'react';
import { IconButton } from '../toolBox/button';
import { colors, themes } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

const AddButton = ({
  theme, styles, onPress, color,
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }

  return (
    <IconButton
      style={[styles.headerButton]}
      icon='cross'
      onPress={onPress}
      color={color}
      iconSize={25}
    />
  );
};

export default withTheme(AddButton, getStyles());
