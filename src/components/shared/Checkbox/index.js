import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'hooks/useTheme';
import CheckSvg from 'assets/svgs/CheckSvg';
import checkboxStyles from './styles';

const Checkbox = ({ children, selected, onPress }) => {
  const { styles } = useTheme({ styles: checkboxStyles });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.active]}>
        {selected && <CheckSvg strokeWidth={1} />}
      </View>
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default Checkbox;
