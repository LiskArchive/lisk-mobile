import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Send from '../tabs/send';
import Bookmarks from '../bookmarkPage';
import Request from '../tabs/request';
import Settings from '../tabs/settings';
import TabBarIcon from './tabBarIcon';
import Home from '../tabs/home';
import navigationOptions from './navigationOptions';
import LockedBalanceDetails from '../tabs/home/lockedBalanceDetails';

export const getHeaderOptions = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
};

const getIcon = ({ route }) => ({
  tabBarIcon: (props) => <TabBarIcon name={route.name.toLowerCase()} {...props} />
});

const Tab = createBottomTabNavigator();
const SendStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();

/**
 * We needed to wrap Home and Send screens in a dedicated navigator
 * so they can modify to the header based on the component state.
 *
 * Components under Tabs navigator can't control the header of the Main navigator
 */
const HomeNavigator = ({ route }) => (
  <HomeStack.Navigator initialRouteName="Home" mode="modal">
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={navigationOptions.NoHeader}
      initialParams={route.params}
    />
  </HomeStack.Navigator>
);

const SendNavigator = ({ route }) => (
  <SendStack.Navigator initialRouteName="Send">
    <SendStack.Screen
      name="Send"
      component={Send}
      options={navigationOptions.SendStack}
      initialParams={route.params}
    />
  </SendStack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeNavigator} options={getIcon} />
    <Tab.Screen name="Request" component={Request} options={getIcon} />
    <Tab.Screen name="Send" component={SendNavigator} options={getIcon} />
    <Tab.Screen name="Bookmarks" component={Bookmarks} options={getIcon} />
    <Tab.Screen name="Settings" component={Settings} options={getIcon} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" mode="modal" >
    <Stack.Screen name="Home" component={Tabs} options={getHeaderOptions} />
    <Stack.Screen
      name="LockedBalance"
      component={LockedBalanceDetails}
      options={navigationOptions.NoHeader}
    />
  </Stack.Navigator>
);

export default AppNavigator;
