import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';
import Icon from '../toolBox/icon';

import { useCopyToClipboard } from './hooks';
import getStyles from './styles';

export default function CopyToClipBoard({
  value,
  type,
  label,
  iconSize,
  style,
  iconStyle,
  labelStyle,
  iconColor,
  testID,
}) {
  const [copied, handleCopy] = useCopyToClipboard(value);

  const { styles } = useTheme({ styles: getStyles() });

  const Element = type || Text;

  const text = label || value;

  const color = iconColor || colors.light.blueGray;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handleCopy} testID={testID}>
      <Element style={[labelStyle]}>{text}</Element>

      <TouchableOpacity onPress={handleCopy}>
        <Icon
          name={copied ? 'checkmark' : 'copy'}
          color={copied ? colors.light.ufoGreen : color}
          size={iconSize || 16}
          style={[styles.copyIcon, iconStyle]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
