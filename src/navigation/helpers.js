import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { colors } from 'constants/styleGuide';
import TabBarIcon from 'components/navigation/tabBarIcon';
import navigationOptions from './navigationOptions';

export function getNavigationHeaderOptions({ route }) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
}

export function getTabBarIcon({ route }) {
  return {
    tabBarIcon: (props) =>
    <TabBarIcon
      {...props}
      name={route.name.toLowerCase()}
      color={colors.light.white}
    />
  };
}
