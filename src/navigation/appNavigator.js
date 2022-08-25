import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from 'constants/styleGuide';
import MultiSignature from 'components/screens/multiSignature';
import TabBarIcon from 'components/navigation/tabBarIcon';

import Settings from 'modules/Settings';
import SendToken from 'modules/SendToken';
import Home from 'modules/Accounts';
import { LockedBalanceDetails } from 'modules/Accounts/components';
import Bookmarks from 'modules/Bookmark';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import ApplicationsSvg from 'assets/svgs/ApplicationsSvg';

import navigationOptions from './navigationOptions';

export const getHeaderOptions = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
};

const getIcon = ({ route }) => ({
  tabBarIcon: (props) =>
    <TabBarIcon
      {...props}
      name={route.name.toLowerCase()}
      color={colors.light.white}
    />,
});

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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    lazy
    screenOptions={{ unmountOnBlur: false }}
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: colors.light.ultramarineBlue,
        width: '90%',
        bottom: 24,
        borderRadius: 64,
        minWidth: 300,
        height: 72,
        paddingTop: 24,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
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
      options={{
        tabBarIcon: ({ focused, ...props }) =>
          <ApplicationsSvg
            {...props}
            color={colors.light.white}
            variant={focused ? 'fill' : 'outline'}
          />
      }}
    />
    <Tab.Screen name="Send" component={SendToken} options={getIcon} />
    <Tab.Screen name="Bookmarks" component={Bookmarks} options={getIcon} />
    <Tab.Screen name="Settings" component={Settings} options={getIcon} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" mode="modal">
    <Stack.Screen name="Home" component={Tabs} options={getHeaderOptions} />
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
