import React from 'react';
import Switch from 'react-native-switch-pro';
import { colors } from '../../constants/styleGuide';

const switchButton = ({ value, height, onSyncPress }) => <Switch
  value={value}
  height={height || 26}
  width={43}
  onSyncPress={onSyncPress}
  backgroundActive={colors.primary5}
  backgroundInactive={colors.grayScale3}
/>;

export default switchButton;
