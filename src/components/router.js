import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Landing from './landing';
import Login from './login';
import Transactions from './transactions';
import TxDetail from './txDetail';
import Send from './send';

export const Tabs = TabNavigator({
  Transactions: {
    screen: Transactions,
    navigationOptions: {
      tabBarLabel: 'Transactions',
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
        title: 'Lisk Nano',
        headerBackTitle: 'Back',
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#3868B5',
          borderBottomColor: '#3868B5',
          color: '#FFFFFF',
          borderBottomWidth: 3
        }
      }
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions:  {
        title: 'Lisk Nano',
        headerBackTitleStyle: {
          color: '#000',
        },
        headerStyle: {
          backgroundColor: '#3868B5',
          borderBottomColor: '#3868B5',
          color: '#FFFFFF',
          borderBottomWidth: 3
        }
      }
      // navigationOptions: ({ navigation }) => ({
      //   title: `${navigation.state.params.tx.id}'s Profile'`,
      //   headerLeft: null,
      //   headerStyle: {
      //     backgroundColor: '#3868B5',
      //     borderBottomColor: '#3868B5',
      //     color: '#FFFFFF',
      //     borderBottomWidth: 3
      //   }
      // }),
    }
  },
  {
    initialRouteName: 'Landing',
    mode: 'modal',
  },
);
