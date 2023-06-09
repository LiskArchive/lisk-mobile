import React from 'react';
import { Switch } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

const SwitchButton = ({ value, height, onChange, style }) => {
  const { theme } = useTheme();

  const handlePress = (...params) => {
    ReactNativeHapticFeedback.trigger('selection');
    onChange(...params);
  };

  const iosBackgroundColor =
    theme === themes.light ? colors.light.greenBackground : colors.dark.satinDeepBlack;

  return (
    <Switch
      value={value}
      height={height || 26}
      style={style}
      width={43}
      onValueChange={handlePress}
      trackColor={{ false: colors.light.greenBackground, true: colors.light.ultramarineBlue }}
      thumbColor={colors.light.whiteSmoke}
      ios_backgroundColor={iosBackgroundColor}
    />
  );
};

export default SwitchButton;
