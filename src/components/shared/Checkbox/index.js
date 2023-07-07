import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'contexts/ThemeContext';
import CheckSvg from 'assets/svgs/CheckSvg';
import checkboxStyles from './styles';

export default function Checkbox({ children, selected, onPress, style }) {
  const { styles } = useTheme({ styles: checkboxStyles });
  return (
    <TouchableOpacity style={[styles.container, style?.container]} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.active, style?.checkbox]}>
        {selected && <CheckSvg strokeWidth={1} />}
      </View>

      <View style={[style?.children]}>{children}</View>
    </TouchableOpacity>
  );
}
