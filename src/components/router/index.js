import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SignIn from '../signIn';
import TxDetail from '../txDetail';
import Send from '../send';
import Bookmark from '../bookmarkPage';
import Register from '../register';
import Wallet from '../wallet';
import Request from '../request';
import Home from '../home';
import Settings from '../settings';
import About from '../about';
import CurrencySelection from '../currencySelection';
import Terms from '../terms';
import EnableBioAuth from '../enableBioAuth';
import DisableBioAuth from '../disableBioAuth';
import PassphraseBackup from '../passphraseBackup';
import Intro from '../intro';
import AddBookmark from '../addBookmark';
import HeaderBackground from './headerBackground';
import HeaderBackgroundImage from './headerBackgroundImage';
import HeaderTitle from './headerTitle';
import HomeHeaderTitle from './homeHeaderTitle';
import HeaderLogo from './headerLogo';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import HeaderBackButton from './headerBackButton';
import TabBarIcon from './tabBarIcon';
import TabBarComponent from './tabBarComponent';
import { colors } from '../../constants/styleGuide';

const headerStyle = {
  backgroundColor: 'transparent',
  overflow: 'hidden',
  elevation: 1,
  borderBottomColor: colors.dark.gray5,
};

// eslint-disable-next-line new-cap
const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: HomeHeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackgroundImage />,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='home' tintColor={tintColor} />, //eslint-disable-line
      tabBarOnPress: ({ defaultHandler, scene }) => {
        if (scene.focused && scene.route.params && scene.route.params.scrollToTop) {
          scene.route.params.scrollToTop();
        } else {
          defaultHandler(0);
        }
      },
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
      headerStyle,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='request' tintColor={tintColor} />, //eslint-disable-line
    }),
  },
  Send: {
    screen: Send,
    navigationOptions: {
      headerTitle: HeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='send' tintColor={tintColor} />, //eslint-disable-line
    },
  },
  Bookmarks: {
    screen: Bookmark,
    navigationOptions: () => ({
      title: 'Bookmarks',
      tabBarLabel: 'Bookmarks',
      headerTitle: HeaderTitle,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='bookmark' tintColor={tintColor} />, //eslint-disable-line
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      headerTitle: HeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: ({ tintColor }) => <TabBarIcon name='settings' tintColor={tintColor} />, //eslint-disable-line
    },
  },
}, {
  tabBarComponent: TabBarComponent,
  tabBarPosition: 'bottom',
  initialRouteName: 'Home',
  headerMode: 'screen',
  swipeEnabled: false,
});


// eslint-disable-next-line new-cap
const MainStack = StackNavigator(
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
      },
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: {
        title: 'Transaction Details',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
          borderBottomWidth: 0,
          elevation: 0,
        },
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        headerTitle: HomeHeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        title: 'About Lisk',
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
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
        headerStyle,
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
        headerStyle,
      },
    },
    EnableBioAuth: {
      screen: EnableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    DisableBioAuth: {
      screen: DisableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
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
        headerStyle,
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


export default StackNavigator({ //eslint-disable-line
  Home: {
    screen: MainStack,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
    },
  },
  AddBookmark: {
    screen: AddBookmark,
    navigationOptions: {
      headerTitle: props => <HeaderTitle {...props} />, //eslint-disable-line
      headerRight: HeaderPlaceholderButton,
      // headerLeft: props => <HeaderBackButton {...props} icon='cross' />, //eslint-disable-line
      headerBackground: <HeaderBackground />,
      headerStyle: {
        overflow: 'hidden',
        elevation: 0,
      },
    },
  },
}, {
  mode: 'modal',
});
