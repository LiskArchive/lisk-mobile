import React from 'react';
import { Switch } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { colors } from 'constants/styleGuide';

const SwitchButton = ({ value, height, onChange, style }) => {
  const onPress = (...params) => {
    ReactNativeHapticFeedback.trigger('selection');
    onChange(...params);
  };

  return (
    <Switch
      value={value}
      height={height || 26}
      style={style}
      width={43}
      onValueChange={onPress}
      trackColor={{ false: colors.light.greenBackground, true: colors.light.ultramarineBlue }}
      thumbColor={colors.light.whiteSmoke}
      ios_backgroundColor={colors.light.greenBackground}
    />
  );
};

export default SwitchButton;
