import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from '../components/login';
import Transactions from '../components/transactions';
import Send from '../components/send';

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
    initialRouteName: 'Login',
    mode: 'modal',
  },
);