import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Landing from '../landing';
import Login from '../login';
import TxDetail from '../txDetail';
import Send from '../send';
// import Explore from '../explore';
import Wallet from '../wallet';
import OwnWallet from '../ownWallet';
import styles from '../styles';
import LogoutButton from '../logoutButton';
import MenuIcon from './menuIcon';
import Bg from '../headerBackground';
import tabBarOptions from './tabBarOptions';
import homeInactiveIcon from '../../assets/images/icons/homeInactive.svg';
import homeActiveIcon from '../../assets/images/icons/homeActive.svg';
import sendActiveIcon from '../../assets/images/icons/sendActive.svg';
import sendInactiveIcon from '../../assets/images/icons/sendInactive.svg';

// eslint-disable-next-line new-cap
export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: {
      title: 'Wallet',
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ focused }) => <MenuIcon active={homeActiveIcon} inactive={homeInactiveIcon} focused={focused} />, //eslint-disable-line
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      title: 'Send',
      tabBarLabel: 'Send',
      tabBarIcon: ({ focused }) => <MenuIcon active={sendActiveIcon} inactive={sendInactiveIcon} focused={focused} />, //eslint-disable-line
    },
  },
  // Explore: {
  //   screen: Explore,
  //   navigationOptions: {
  //     title: 'Explore',
  //     tabBarLabel: 'Explore',
  //     tabBarIcon: ({ focused }) => <MenuIcon icon='search'
  // focused={focused} />, //eslint-disable-line
  //   },
  // },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions,
  headerMode: 'screen',
});

// eslint-disable-next-line new-cap
export default StackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: Tabs,
      navigationOptions: {
        headerBackground: <Bg />,
        headerRight: <LogoutButton />,
        headerBackTitle: 'Back',
        headerTintColor: styles.white,
        headerLeft: null,
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        headerBackground: <Bg />,
        headerRight: <LogoutButton />,
        title: 'Wallet',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      },
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: {
        headerBackground: <Bg />,
        headerRight: <LogoutButton />,
        title: 'Details',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      },
    },
  },
  {
    initialRouteName: 'Landing',
  },
);
