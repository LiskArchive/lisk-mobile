import React from 'react';
import Switch from 'react-native-switch-pro';
import { colors } from '../../constants/styleGuide';

const switchButton = ({
  value, height, onSyncPress, style,
}) => <Switch
  value={value}
  height={height || 26}
  style={style}
  width={43}
  onSyncPress={onSyncPress}
  backgroundActive={colors.dark.blue}
  backgroundInactive={colors.dark.gray3}
/>;

export default switchButton;
