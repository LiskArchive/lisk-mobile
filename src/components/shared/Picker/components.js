import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ModalBox from 'react-native-modalbox';

import { useTheme } from 'hooks/useTheme';
import CaretSvg from 'assets/svgs/CaretSvg';
import { themes, colors } from 'constants/styleGuide';

import { usePicker } from './hooks';
import { getPickerStyles } from './styles';

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

export function PickerToggle({
  children,
  placeholder,
  disabled,
  style: baseStyle
}) {
  const { value, setShowMenu, error } = usePicker();

  const { styles, theme } = useTheme({
    styles: getPickerStyles(error),
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowMenu(true)}
        disabled={disabled}
        style={[
          styles.toggleContainer,
          styles.theme.toggleContainer,
          baseStyle?.container
        ]}
      >
        {children || (
          <Text
            style={[
              styles[value ? 'toggleText' : 'togglePlaceholder'],
              styles.theme[value ? 'toggleText' : 'togglePlaceholder'],
              baseStyle?.toggleText
            ]}
          >
            {value || placeholder}
          </Text>
        )}

        {!disabled && (
          <CaretSvg
            color={theme === themes.dark ? colors.dark.volcanicSand : colors.light.silverGrey}
            direction='right'
          />
        )}
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText]}>
          {error}
        </Text>
      )}
    </>
  );
}

export function PickerMenu({ children, style: baseStyle }) {
  const { showMenu, setShowMenu } = usePicker();

  const { styles, theme } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <ModalBox
      position="bottom"
      style={[styles.menuContainer, styles.theme.menuContainer, baseStyle]}
      isOpen={showMenu}
      backdropColor={theme === themes.dark ? colors.dark.volcanicSand : colors.light.white }
      onClosed={() => setShowMenu(false)}
      coverScreen
    >
      {children}
    </ModalBox>
  );
}

export function PickerItem({
  value, children, style: baseStyle
}) {
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
      style={[styles.itemContainer, styles.theme.itemContainer, baseStyle]}
    >
     {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
}
