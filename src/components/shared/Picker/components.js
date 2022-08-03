import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ModalBox from 'react-native-modalbox';

import { useTheme } from 'hooks/useTheme';

// eslint-disable-next-line import/no-cycle
import { usePicker } from './hooks';
import { getPickerStyles } from './styles';
import CaretSvg from '../../../assets/svgs/CaretSvg';

export function PickerLabel({ children, style: baseStyle }) {
  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <Text style={[styles.label, styles.theme.label, baseStyle]}>
      {children}
    </Text>
  );
}

export function PickerToggle({ children, placeholder, style: baseStyle }) {
  const { value, setShowMenu } = usePicker();

  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <TouchableOpacity
      style={[styles.toggleContainer, styles.theme.toggleContainer, baseStyle?.container]}
      onPress={() => setShowMenu(true)}
    >
      {children || (
        <View style={[styles.toggleTextContainer]}>
          <Text style={[
            styles[value ? 'toggleText' : 'togglePlaceholder'],
            styles.theme[value ? 'toggleText' : 'togglePlaceholder'],
            baseStyle?.toggleText
          ]}>
            {value || placeholder}
          </Text>

          <CaretSvg direction='right'/>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function PickerMenu({ children, style: baseStyle }) {
  const { showMenu, setShowMenu } = usePicker();

  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <ModalBox
      position="bottom"
      style={[styles.menuContainer, baseStyle]}
      isOpen={showMenu}
      onClosed={() => setShowMenu(false)}
      coverScreen
    >
      {children}
    </ModalBox>
  );
}

export function PickerItem({ value, children, style: baseStyle }) {
  const { setShowMenu, onChange } = usePicker();

  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onChange(value);
        setShowMenu(false);
      }}
      style={[styles.itemContainer, baseStyle]}
    >
     {children || <Text>{value}</Text>}
    </TouchableOpacity>
  );
}
