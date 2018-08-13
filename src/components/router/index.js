import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
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
import colors from '../../constants/styleGuide/colors';
import { IconButton } from '../toolBox/button';
import Logo from './logo';

const resetNavigationStack = (navigation, routeName) => {
  navigation
    .dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    }));
};

// eslint-disable-next-line new-cap
export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: {
      title: <Logo color={colors.white}/>,
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ focused }) => <MenuIcon name='home' focused={focused} />, //eslint-disable-line
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      title: <Logo color={colors.white}/>,
      tabBarLabel: 'Send',
      tabBarIcon: ({ focused }) => <MenuIcon name='send' focused={focused} />, //eslint-disable-line
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
      navigationOptions: ({ navigation }) => ({
        headerRight: null,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => resetNavigationStack(navigation, 'Landing')}
          style={styles.iconButton}
          color={colors.primary9} />,
        headerStyle: {
          backgroundColor: colors.white,
          borderBottomColor: colors.white,
          borderBottomWidth: 0,
        },
        title: <Logo color={colors.primary9} />,
      }),
    },
    Main: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        headerRight: <LogoutButton navigation={navigation} />,
        headerLeft: null,
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
      }),
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        headerRight: <LogoutButton navigation={navigation} />,
        title: <Logo color={colors.white}/>,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      }),
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        headerRight: <LogoutButton navigation={navigation} />,
        title: <Logo color={colors.white}/>,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => navigation.pop()}
          style={styles.iconButton}
          color={colors.white} />,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      }),
    },
  },
  {
    initialRouteName: 'Landing',
  },
);
