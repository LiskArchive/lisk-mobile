import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import Landing from '../landing';
import Login from '../login';
import TxDetail from '../txDetail';
import Send from '../send';
import Register from '../register';
// import Explore from '../explore';
import Wallet from '../wallet';
import Request from '../request';
import OwnWallet from '../ownWallet';
import Settings from '../settings';
import About from '../about';
import Terms from '../terms';
import styles from './styles';
import MenuIcon from './menuIcon';
import Bg from '../headerBackground';
import tabBarOptions from './tabBarOptions';
import { colors } from '../../constants/styleGuide';
import { IconButton } from '../toolBox/button';
import Logo from './logo';

const resetNavigationStack = (navigation, routeName) => {
  navigation
    .dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    }));
};

const SettingButton = ({ navigation }) =>
  <IconButton
    icon='settings'
    iconSize={20}
    onPress={() => navigation.navigate({ routeName: 'Settings' })}
    style={styles.settings}
    color={colors.white} />;

const placeHolderButton = <IconButton color='transparent' icon='back'/>;
// eslint-disable-next-line new-cap
export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      headerLeft: placeHolderButton,
      title: <Logo />,
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ focused }) => <MenuIcon name='home' focused={focused} />, //eslint-disable-line
    }),
  },
  Send: {
    screen: Send,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      title: <Logo />,
      tabBarLabel: 'Send',
      tabBarIcon: ({ focused }) => <MenuIcon name='send' focused={focused} />, //eslint-disable-line
    }),
  },
  Request: {
    screen: Request,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      headerLeft: placeHolderButton,
      title: <Logo />,
      tabBarLabel: 'Request',
      tabBarIcon: ({ focused }) => <MenuIcon name='request' focused={focused} />, //eslint-disable-line
    }),
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
    Register: {
      screen: Register,
      navigationOptions: {
        title: <Logo color={colors.grayScale1} />,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        headerRight: placeHolderButton,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => resetNavigationStack(navigation, 'Landing')}
          style={styles.back}
          iconButtonTitle={styles.backTitle}
          color={colors.primary9} />,
        headerStyle: {
          backgroundColor: colors.white,
          borderBottomColor: colors.white,
          elevation: 0,
        },
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        },
        title: <Logo color={colors.primary9} />,
      }),
    },
    Main: {
      screen: Tabs,
      navigationOptions: () => ({
        headerBackground: <Bg />,
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      }),
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: () => ({
        headerBackground: <Bg />,
        title: <Logo />,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary5,
          overflow: 'hidden',
        },
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        title: <Logo />,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => navigation.pop()}
          style={styles.back}
          iconButtonTitle={styles.backTitle}
          color={colors.white} />,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: colors.primary5,
          overflow: 'hidden',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      }),
    },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        title: <Logo />,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => navigation.pop()}
          style={styles.back}
          iconButtonTitle={styles.backTitle}
          color={colors.white} />,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: colors.primary5,
          overflow: 'hidden',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      }),
    },
    Terms: {
      screen: Terms,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        title: <Logo />,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => navigation.pop()}
          style={styles.back}
          iconButtonTitle={styles.backTitle}
          color={colors.white} />,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: colors.primary5,
          overflow: 'hidden',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      }),
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        title: <Logo />,
        headerLeft: <IconButton
          icon='back'
          title=''
          onPress={() => navigation.pop()}
          style={styles.back}
          iconButtonTitle={styles.backTitle}
          color={colors.white} />,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: colors.primary5,
          overflow: 'hidden',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      }),
    },
  },
  {
    initialRouteName: 'Landing',
  },
);
