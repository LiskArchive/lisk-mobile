/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'contexts/useModal';
import CaretSvg from 'assets/svgs/CaretSvg';
import { themes, colors } from 'constants/styleGuide';

import { usePicker } from './hooks';
import { getPickerStyles } from './styles';

export function PickerLabel({ children, style: baseStyle }) {
  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return <Text style={[styles.label, styles.theme.label, baseStyle]}>{children}</Text>;
}

export function PickerToggle({ children, placeholder, disabled, style: baseStyle, openMenu }) {
  const { value, error } = usePicker();

  const { styles, theme } = useTheme({
    styles: getPickerStyles(error),
  });

  let valueToRender = children;

  if (!valueToRender) {
    if (value) {
      valueToRender = (
        <Text style={[styles.toggleText, styles.theme.toggleText, baseStyle?.toggleText]}>
          {value}
        </Text>
      );
    } else if (typeof placeholder === 'string') {
      valueToRender = (
        <Text
          style={[styles.togglePlaceholder, styles.theme.togglePlaceholder, baseStyle?.toggleText]}
        >
          {placeholder}
        </Text>
      );
    } else {
      valueToRender = placeholder;
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => openMenu()}
        disabled={disabled}
        style={[styles.toggleContainer, styles.theme.toggleContainer, baseStyle?.container]}
      >
        {valueToRender}

        {!disabled && (
          <CaretSvg
            color={theme === themes.dark ? colors.dark.volcanicSand : colors.light.silverGrey}
            direction="right"
          />
        )}
      </TouchableOpacity>

      {error && <Text style={[styles.errorText]}>{error}</Text>}
    </>
  );
}

export function usePickerMenu(children) {
  const { showMenu } = usePicker();
  const modal = useModal();
  const openModal = () => modal.open(children);

  useEffect(() => {
    if (showMenu) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu]);

  return { showOptions: openModal };
}

export function PickerItem({ value, children, onChange, style: baseStyle }) {
  const modal = useModal();

  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onChange(value);
        modal.toggle(false);
      }}
      style={[styles.itemContainer, styles.theme.itemContainer, baseStyle]}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
}
