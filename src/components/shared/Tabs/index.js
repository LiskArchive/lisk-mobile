import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { TabsContext } from './hooks';
import { Tab, TabsPanel } from './components';
import { getTabsStyles } from './styles';

export default function Tabs({ value, onClick, children }) {
  const { styles } = useTheme({
    styles: getTabsStyles(),
  });

  return (
    <TabsContext.Provider value={{ value, onClick }}>
      <View style={[styles.container, styles.theme.container]}>{children}</View>
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;
