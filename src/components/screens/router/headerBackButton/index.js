import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from '../../../shared/toolBox/button';
import { colors, themes } from '../../../../constants/styleGuide';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { H3 } from '../../../shared/toolBox/typography';

const HeaderBackButton = ({
  theme,
  styles,
  style,
  onPress,
  color,
  icon,
  safeArea,
  title,
  t,
  noIcon
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }

  return (
    <View style={[styles.container, safeArea ? styles.safeArea : null]}>
      {noIcon ? null : (
        <IconButton
          style={[styles.main, styles.theme.main, style]}
          icon={icon || 'back'}
          onClick={onPress}
          color={color}
        />
      )}
      {title && <H3 style={[styles.title, { color }, noIcon && styles.paddingLeft]}>{t(title)}</H3>}
    </View>
  );
};

export default withTheme(translate()(HeaderBackButton), getStyles());
