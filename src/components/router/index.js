import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SignIn from '../signIn';
import TxDetail from '../txDetail';
import Send from '../send';
import Register from '../register';
import Wallet from '../wallet';
import Request from '../request';
import OwnWallet from '../ownWallet';
import Settings from '../settings';
import About from '../about';
import CurrencySelection from '../currencySelection';
import Terms from '../terms';
import EnableBioAuth from '../enableBioAuth';
import DisableBioAuth from '../disableBioAuth';
import PassphraseBackup from '../passphraseBackup';
import Intro from '../intro';
import HeaderBackground from './headerBackground';
import HeaderBackgroundImage from './headerBackgroundImage';
import HeaderTitle from './headerTitle';
import HeaderLogo from './headerLogo';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import HeaderBackButton from './headerBackButton';
import TabBarIcon from './tabBarIcon';
import TabBarComponent from './tabBarComponent';
import { colors } from '../../constants/styleGuide';

// eslint-disable-next-line new-cap
const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: () => ({
      title: 'Your wallet',
      headerTitle: props => <HeaderTitle {...props} style={{ color: colors.light.white }} />, //eslint-disable-line
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackgroundImage />,
      headerStyle: {
        overflow: 'hidden',
      },
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='home' tintColor={tintColor} />, //eslint-disable-line
      tabBarOnPress: ({ defaultHandler, scene }) => {
        if (scene.focused && scene.route.params && scene.route.params.scrollToTop) {
          scene.route.params.scrollToTop();
        } else {
          defaultHandler(0);
        }
      },
    }),
  },
  Send: {
    screen: Send,
    navigationOptions: {
      headerTitle: HeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='send' tintColor={tintColor} />, //eslint-disable-line
    },
  },
  Request: {
    screen: Request,
    navigationOptions: () => ({
      title: 'Request',
      headerTitle: HeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='request' tintColor={tintColor} />, //eslint-disable-line
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings',
      headerTitle: HeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='settings' tintColor={tintColor} />, //eslint-disable-line
    }),
  },
}, {
  tabBarComponent: TabBarComponent,
  tabBarPosition: 'bottom',
  initialRouteName: 'OwnWallet',
  headerMode: 'screen',
});

// eslint-disable-next-line new-cap
export default StackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        title: <HeaderLogo color={colors.light.gray1} />,
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      },
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: Tabs,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
      },
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: {
        title: 'Transaction Details',
        headerTitle: props => <HeaderTitle {...props} style={{ color: colors.light.white }} />, //eslint-disable-line
        headerRight: HeaderPlaceholderButton,
        headerLeft: props => <HeaderBackButton {...props} color={colors.light.white} />, //eslint-disable-line
        headerBackground: <HeaderBackgroundImage />,
        headerStyle: {
          overflow: 'hidden',
        },
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: () => ({
        title: 'Wallet',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      }),
    },
    About: {
      screen: About,
      navigationOptions: {
        title: 'About Lisk',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    Terms: {
      screen: Terms,
      navigationOptions: {
        title: 'Terms of use',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    CurrencySelection: {
      screen: CurrencySelection,
      navigationOptions: {
        title: 'Select your currency',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    EnableBioAuth: {
      screen: EnableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    DisableBioAuth: {
      screen: DisableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    PassphraseBackup: {
      screen: PassphraseBackup,
      navigationOptions: {
        title: 'Passphrase backup',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    Intro: {
      screen: Intro,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
    headerLayoutPreset: 'center',
    transitionConfig: ({ scene }) => (scene.routeName === 'SignIn' ? ({
      transitionSpec: {
        duration: 0,
      },
    }) : ({
      transitionSpec: {
        duration: 300,
      },
    })),
  },
);
