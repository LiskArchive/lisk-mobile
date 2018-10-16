import React from 'react';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
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
import EnableBioAuth from '../enableBioAuth';
import DisableBioAuth from '../disableBioAuth';
import styles from './styles';
import MenuIcon from './menuIcon';
import Bg from '../headerBackground';
import tabBarOptions from './tabBarOptions';
import { colors } from '../../constants/styleGuide';
import { IconButton } from '../toolBox/button';
import Logo from './logo';

const SettingButton = ({ navigation }) =>
  <IconButton
    icon='settings'
    iconSize={20}
    onPress={() => navigation.navigate({ routeName: 'Settings' })}
    style={styles.settings}
    color={colors.white} />;

const placeHolderButton = <IconButton color='transparent' icon='back'/>;
// eslint-disable-next-line new-cap
const Tabs = createBottomTabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      headerLeft: placeHolderButton,
      headerTitle: <Logo />,
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ focused }) => <MenuIcon name='home' focused={focused} />, //eslint-disable-line
    }),
  },
  Send: {
    screen: Send,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      headerTitle: <Logo />,
      tabBarLabel: 'Send',
      tabBarIcon: ({ focused }) => <MenuIcon name='send' focused={focused} />, //eslint-disable-line
    }),
  },
  Request: {
    screen: Request,
    navigationOptions: ({ navigation }) => ({
      headerRight: <SettingButton navigation={navigation} />,
      headerLeft: placeHolderButton,
      headerTitle: <Logo />,
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
  tabBarOptions,
  initialRouteName: 'OwnWallet',
});


// eslint-disable-next-line new-cap
export default StackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        headerTitle: <Logo color={colors.grayScale1} />,
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
      navigationOptions: ({ navigation }) => ({
        headerBackground: <Bg />,
        headerTitle: <Logo />,
        headerRight: <SettingButton navigation={navigation} />,
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
        headerTitle: <Logo />,
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
        headerTitle: <Logo />,
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
        headerTitle: <Logo />,
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
        headerTitle: <Logo />,
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
        headerRight: <SettingButton navigation={navigation} />,
        headerBackground: <Bg />,
        headerTitle: <Logo />,
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
    EnableBioAuth: {
      screen: EnableBioAuth,
      navigationOptions: ({ navigation }) => ({
        headerRight: <SettingButton navigation={navigation} />,
        headerBackground: <Bg />,
        headerTitle: <Logo />,
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
    DisableBioAuth: {
      screen: DisableBioAuth,
      navigationOptions: ({ navigation }) => ({
        headerRight: <SettingButton navigation={navigation} />,
        headerBackground: <Bg />,
        headerTitle: <Logo />,
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
    initialRouteName: 'Login',
    headerLayoutPreset: 'center',
  },
);
