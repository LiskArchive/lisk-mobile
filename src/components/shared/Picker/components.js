/* eslint-disable max-statements */
/* eslint-disable complexity */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import CaretSvg from 'assets/svgs/CaretSvg';
import { themes, colors } from 'constants/styleGuide';

import { usePicker } from './hooks';
import { getPickerStyles } from './styles';
import BottomModal from '../BottomModal';

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

  let valueToRender = children;

  if (!valueToRender) {
    if (value) {
      valueToRender = (
        <Text
          style={[
            styles.toggleText,
            styles.theme.toggleText,
            baseStyle?.toggleText
          ]}
        >
          {value}
        </Text>
      );
    } else if (typeof placeholder === 'string') {
      valueToRender = (
        <Text
          style={[
            styles.togglePlaceholder,
            styles.theme.togglePlaceholder,
            baseStyle?.toggleText
          ]}
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
        onPress={() => setShowMenu(true)}
        disabled={disabled}
        style={[
          styles.toggleContainer,
          styles.theme.toggleContainer,
          baseStyle?.container
        ]}
      >
        {valueToRender}

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

  const { styles } = useTheme({
    styles: getPickerStyles(),
  });

  return (
    <BottomModal
      show={showMenu}
      toggleShow={() => setShowMenu(false)}
      style={{
        container: styles.menuModalContainer
      }}
    >
      <View style={[styles.menuContainer, baseStyle?.container]}>
        {children}
      </View>
    </BottomModal>
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
