import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'hooks/useTheme';

import { useTabs } from './hooks';
import { getTabStyles } from './styles';

export function Tab({ value, children }) {
  const { value: selectedValue, onClick } = useTabs();

  const active = selectedValue === value;

  const { styles } = useTheme({
    styles: getTabStyles(active),
  });

  return (
    <TouchableOpacity active={active} onPress={() => onClick(value)} style={[styles.container]}>
      {children}
    </TouchableOpacity>
  );
}

export function TabsPanel({ value, index, children }) {
  if (value !== index) return null;

  return children;
}
