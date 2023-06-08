import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';
import CopySvg from 'assets/svgs/CopySvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';

import { useCopyToClipboard } from './CopyToClipboard.hooks';
import getStyles from './CopyToClipboard.styles';

export default function CopyToClipBoard({
  value,
  type,
  label,
  iconSize = 18,
  iconColor = colors.light.ultramarineBlue,
  style,
  iconStyle,
  labelStyle,
  testID,
}) {
  const [copied, handleCopy] = useCopyToClipboard(value);

  const { styles } = useTheme({ styles: getStyles() });

  const Element = type || Text;

  const text = label || value;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handleCopy} testID={testID}>
      <Element style={[labelStyle]}>{copied ? 'Copied' : text}</Element>

      <TouchableOpacity onPress={handleCopy} style={[styles.icon, iconStyle]}>
        {copied ? (
          <CircleCheckedSvg variant="fill" color={iconColor} height={iconSize} width={iconSize} />
        ) : (
          <CopySvg variant="outline" color={iconColor} height={iconSize} width={iconSize} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
