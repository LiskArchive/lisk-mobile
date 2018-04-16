import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Landing from './landing';
import Login from './login';
import TxDetail from './txDetail';
import Send from './send';
import Explore from './explore';
import Wallet from './wallet';
import OwnWallet from './ownWallet';
import styles from './styles';

export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: {
      title: 'Wallet',
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      title: 'Send',
      tabBarLabel: 'Send',
      tabBarIcon: ({ tintColor }) => <Icon name="send" size={35} color={tintColor} />
    },
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      title: 'Explore',
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    style: {
      paddingTop: 5,
      marginBottom: 0,
    },
  },
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
        headerBackTitle: 'Back',
        headerTintColor: styles.white,
        headerLeft: null,
        headerStyle: {
          backgroundColor: styles.headerColor,
          borderBottomColor: styles.headerColor,
          borderBottomWidth: 3
        }
      }
    },
    Wallet: {
      screen: Wallet,
      navigationOptions:  {
        title: 'Wallet',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          borderBottomColor: styles.headerColor,
          borderBottomWidth: 3
        }
      }
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions:  {
        title: 'Details',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          borderBottomColor: styles.headerColor,
          borderBottomWidth: 3
        }
      }
    }
  },
  {
    initialRouteName: 'Landing',
  },
);
