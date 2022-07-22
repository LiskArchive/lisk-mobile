import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { colors, themes } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import MultiSignature from 'components/screens/multiSignature';
import TabBarIcon from 'components/navigation/tabBarIcon';

import Settings from 'modules/Settings';
import Send from 'modules/Transactions';
import Home from 'modules/Accounts';
import { LockedBalanceDetails } from 'modules/Accounts/components';
import Bookmarks from 'modules/Bookmark';
import ApplicationsSvg from '../assets/svgs/ApplicationsSvg';
import BlockchainApplicationsExplorer from '../modules/BlockchainApplication/components/BlockchainApplicationsExplorer';

import navigationOptions from './navigationOptions';

export const getHeaderOptions = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
};

const getIcon = ({ route }) => ({
  tabBarIcon: (props) => <TabBarIcon name={route.name.toLowerCase()} {...props} />,
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = ({ theme }) => (
  <Tab.Navigator
    initialRouteName="Home"
    lazy
    screenOptions={{ unmountOnBlur: false }}
    tabBarOptions={{
      style: {
        backgroundColor: theme === themes.light ? colors.light.athensWhite : colors.dark.footerBg,
        borderTopColor: theme === themes.light ? colors.light.platinumGray : colors.dark.footerBg,
        borderTopWidth: 1,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={getIcon}
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
      options={{ tabBarIcon: (props) => <ApplicationsSvg {...props} /> }}
    />
    <Tab.Screen name="Send" component={Send} options={getIcon} />
    <Tab.Screen name="Bookmarks" component={Bookmarks} options={getIcon} />
    <Tab.Screen name="Settings" component={Settings} options={getIcon} />
  </Tab.Navigator>
);

const ThemedTabs = withTheme(Tabs, {});

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" mode="modal">
    <Stack.Screen name="Home" component={ThemedTabs} options={getHeaderOptions} />
    <Stack.Screen
      name="LockedBalance"
      component={LockedBalanceDetails}
      options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    />
    <Stack.Screen
      name="Multisignature"
      component={MultiSignature}
      options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
