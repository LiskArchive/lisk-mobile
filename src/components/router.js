import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import Landing from './landing';
import Login from './login';
import TxDetail from './txDetail';
import Send from './send';
import Explore from './explore';
import Wallet from './wallet';
import OwnWallet from './ownWallet';
import styles from './styles';
import LogoutButton from './logoutButton';
import Icon from './toolBox/icons';
import Src from '../assets/images/strapes.png';

const MenuIcon = ({ focused, icon }) => {
  const color = focused ? '#1F55A0' : '#000';
  return <Icon name={icon} style={{ marginBottom: 0 }} tintColor={color} />;
};

// eslint-disable-next-line new-cap
export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: {
      title: 'Wallet',
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ focused }) => <MenuIcon icon='list' focused={focused} />, //eslint-disable-line
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      title: 'Send',
      tabBarLabel: 'Send',
      tabBarIcon: ({ focused }) => <MenuIcon icon='send' focused={focused} />, //eslint-disable-line
    },
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      title: 'Explore',
      tabBarLabel: 'Explore',
      tabBarIcon: ({ focused }) => <MenuIcon icon='search' focused={focused} />, //eslint-disable-line
    },
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#1F55A0',
    inactiveTintColor: '#525252',
    showIcon: true,
    style: {
      backgroundColor: '#fff',
      borderColor: ' #F2F2F2',
      borderTopWidth: 1,
      height: 65,
      zIndex: 99,
      paddingTop: 2,
    },
    labelStyle: {
      fontSize: 14,
    },
  },
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
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
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
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
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
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
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
