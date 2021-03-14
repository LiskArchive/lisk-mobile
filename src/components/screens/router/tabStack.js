import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderBackground from './headerBackground';
import HeaderTitle from './headerTitle';
import Send from '../tabs/send';
import Bookmarks from '../bookmarkPage';
import Request from '../tabs/request';
import Settings from '../tabs/settings';
import TabBarIcon from './tabBarIcon';
import Home from '../tabs/home';
// import TabBarComponent from './tabBarComponent';
import DynamicHeaderBackground from './dynamicHeaderBackground';
import HomeHeaderTitle from './homeHeaderTitle';
import { t } from './helper';
import colors from '../../../constants/styleGuide/colors';
import navigationOptions from './navigationOptions';

export const getHeaderOptions = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return navigationOptions[routeName];
};

const getTabBarIcon = name => ({
  tabBarIcon: props => <TabBarIcon name={name} {...props} />,
});

const Tab = createBottomTabNavigator();
const SendStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} options={navigationOptions.HomeStack} />
  </HomeStack.Navigator>
);

const SendNavigator = () => (
  <SendStack.Navigator initialRouteName="Send">
    <SendStack.Screen name="Send" component={Send} options={navigationOptions.SendStack} />
  </SendStack.Navigator>
);

const Tabs = ({ navigation, route }) => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeNavigator} options={getTabBarIcon('home')} />
      <Tab.Screen name="Request" component={Request} options={getTabBarIcon('request')} />
      <Tab.Screen name="Send" component={SendNavigator} options={getTabBarIcon('send')} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={getTabBarIcon('bookmark')} />
      <Tab.Screen name="Settings" component={Settings} options={getTabBarIcon('settings')} />
    </Tab.Navigator>
  );
};

export default Tabs;
