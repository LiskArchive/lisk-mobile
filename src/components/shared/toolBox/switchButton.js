import React from 'react';
import Switch from 'react-native-switch-pro';
import { useTheme } from 'contexts/ThemeContext';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { colors, themes } from 'constants/styleGuide';

const SwitchButton = ({ value, height, onSyncPress, style }) => {
  const { theme } = useTheme({});
  const onPress = (...params) => {
    ReactNativeHapticFeedback.trigger('selection');
    onSyncPress(...params);
  };

  return (
    <Switch
      value={value}
      height={height || 26}
      style={style}
      width={43}
      onSyncPress={onPress}
      backgroundActive={
        theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue
      }
      backgroundInactive={theme === themes.light ? colors.light.platinum : colors.dark.slateGray}
    />
  );
};

export default SwitchButton;
