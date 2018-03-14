import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Landing from './landing';
import Login from './login';
import Transactions from './transactions';
import Send from './send';

export const Tabs = TabNavigator({
  Transactions: {
    screen: Transactions,
    navigationOptions: {
      tabBarLabel: 'Send',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      tabBarLabel: 'Send',
      tabBarIcon: ({ tintColor }) => <Icon name="launch" size={35} color={tintColor} />
    },
  },
}, {
  headerMode: 'screen',
});

export default StackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      },
    },
    Main: {
      screen: Tabs,
      navigationOptions:  {
        title: 'Balance: 12233 LISK',
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#3868B5',
          borderBottomWidth: 3
        }
      }
    }
  },
  {
    initialRouteName: 'Landing',
    mode: 'modal',
  },
);
