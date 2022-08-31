import React, { useEffect, useRef, useState } from 'react';
import { Text, Clipboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import Icon from '../toolBox/icon';

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
}) {
  const [copied, setCopied] = useState(false);

  let timeout = useRef();

  const { styles } = useTheme({ styles: getStyles() });

  function handleCopy() {
    setCopied(prevState => !prevState);

    Clipboard.setString(value);

    timeout = setTimeout(() => {
      setCopied(prevState => !prevState);
    }, 4000);
  }

  useEffect(() => () => clearTimeout(timeout), []);

  const Element = type || Text;

  const text = label || value;

  const color = iconColor || colors.light.blueGray;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handleCopy}>
      <Element style={[labelStyle]}>
        {text}
      </Element>

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
