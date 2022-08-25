import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from 'constants/styleGuide';

import Settings from 'modules/Settings';
import SendToken from 'modules/SendToken';
import Home from 'modules/Accounts';
import Bookmarks from 'modules/Bookmark';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import ApplicationsSvg from 'assets/svgs/ApplicationsSvg';
import { getTabBarIcon } from '../../helpers';
import { navigationTabBarStyle } from '../../styles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      lazy
      screenOptions={{ unmountOnBlur: false }}
      tabBarOptions={{
        showLabel: false,
        style: navigationTabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={getTabBarIcon}
        listeners={({ route, navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            const { history } = navigation.getState();
            if (history[history.length - 1].key === route.key) {
              if (route.params?.scrollToTop) {
                route.params.scrollToTop();
              }
            }
            navigation.navigate('Home');
          },
        })}
      />
      <Tab.Screen
        name="Applications"
        component={BlockchainApplicationsExplorer}
        options={{
          tabBarIcon: ({ focused, ...props }) =>
            <ApplicationsSvg
              {...props}
              color={colors.light.white}
              variant={focused ? 'fill' : 'outline'}
            />
        }}
      />
      <Tab.Screen name="Send" component={SendToken} options={getTabBarIcon} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={getTabBarIcon} />
      <Tab.Screen name="Settings" component={Settings} options={getTabBarIcon} />
    </Tab.Navigator>
  );
}
