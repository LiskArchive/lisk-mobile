import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { useTabs } from './hooks';
import { getTabStyles } from './styles';

export function Tab({ value, children, style }) {
  const { value: selectedValue, onClick } = useTabs();

  const active = selectedValue === value;

  const { styles } = useTheme({
    styles: getTabStyles(active),
  });

  return (
    <TouchableOpacity
      onPress={() => onClick(value)}
      style={[styles.container, styles.theme.container, style?.container]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, styles.theme.text, style?.text]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

export function TabsPanel({ value, index, children }) {
  if (value !== index) return null;

  return children;
}
