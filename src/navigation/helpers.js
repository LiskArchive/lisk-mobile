import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import TabBarIcon from './components/TabBarIcon';
import navigationOptions from './options';

export function getNavigationHeaderOptions({ route }) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
}

export function getTabBarIcon({ route }) {
  return {
    tabBarIcon: (props) => {
      return <TabBarIcon focused={props.focused} name={route.name} />;
    },
  };
}
