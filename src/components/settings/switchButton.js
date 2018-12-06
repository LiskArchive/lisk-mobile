import React from 'react';
import Switch from 'react-native-switch-pro';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { colors, themes } from '../../constants/styleGuide';

const switchButton = ({
  value, height, onSyncPress, style, theme,
}) => {
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
      backgroundActive={theme === themes.light ? colors.light.blue : colors.dark.blue}
      backgroundInactive={colors.dark.gray3}
    />
  );
};

export default switchButton;
