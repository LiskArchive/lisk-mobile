import React from 'react';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from '../../../shared/toolBox/button';
import { colors, themes } from '../../../../constants/styleGuide';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';

const HeaderBackButton = ({
  theme, styles, style, onPress, color, icon, safeArea, title, t
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }

  return (
    <View style={styles.container} >
      <IconButton
        style={[styles.main, styles.theme.main, style, safeArea ? styles.safeArea : null]}
        icon={icon || 'back'}
        onPress={onPress}
        color={color}
      />
      {title && <Text style={styles.title} >{t(title)}</Text>}
    </View>
  );
};

export default withTheme(translate()(HeaderBackButton), getStyles());
