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
import ManageAssets from '../manageAssets';
import LanguageSelection from '../languageSelection';
import Terms from '../terms';
import EnableBioAuth from '../enableBioAuth';
import DisableBioAuth from '../disableBioAuth';
import PassphraseBackup from '../passphraseBackup';
import Intro from '../intro';
import AddBookmark from '../addBookmark';
import Modal from '../modal';
import HeaderBackground from './headerBackground';
import HeaderBackgroundImage from './headerBackgroundImage';
import HeaderTitle from './headerTitle';
import HomeHeaderTitle from './homeHeaderTitle';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import HeaderBackButton from './headerBackButton';
import TokenSwitcher from './tokenSwitcher';
import TabBarIcon from './tabBarIcon';
import TabBarComponent from './tabBarComponent';
import { colors } from '../../constants/styleGuide';

const headerStyle = {
  backgroundColor: 'transparent',
  overflow: 'hidden',
  elevation: 1,
  borderBottomColor: colors.dark.gray5,
};

/**
 * Since react-navigation doesn't support i18n
 * I've created this dummy function to help i18n scanner
 * understand about these titles.
 * We can remove this as soon as react-navigation supports i18n or
 * we change the router to another lib with i18n support.
 *
 * @param {String} str
 * @returns {String} same as the input string
 */
const t = str => str;

// eslint-disable-next-line new-cap
const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: HomeHeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackgroundImage />,
      tabBarIcon: props => <TabBarIcon name='home' {...props} />, //eslint-disable-line
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
      title: t('Request'),
      headerTitle: HeaderTitle,
      headerRight: <TokenSwitcher />,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: props => <TabBarIcon name='request' {...props} />, //eslint-disable-line
    }),
  },
  Send: {
    screen: Send,
    navigationOptions: {
      headerTitle: HeaderTitle,
      headerRight: <TokenSwitcher />,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: props => <TabBarIcon name='send' {...props} />, //eslint-disable-line
    },
  },
  Bookmarks: {
    screen: Bookmark,
    navigationOptions: () => ({
      title: t('Bookmarks'),
      tabBarLabel: 'Bookmarks',
      headerTitle: HeaderTitle,
      headerRight: <TokenSwitcher />,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: props => <TabBarIcon name='bookmark' {...props} />, //eslint-disable-line
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: t('Settings'),
      headerTitle: HeaderTitle,
      headerRight: <TokenSwitcher />,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <HeaderBackground />,
      headerStyle,
      tabBarIcon: props => <TabBarIcon name='settings' {...props} />, //eslint-disable-line
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
        headerTitle: HeaderTitle,
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
        title: t('Transaction Details'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
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
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        title: t('About Lisk'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    Terms: {
      screen: Terms,
      navigationOptions: {
        title: t('Terms of use'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    CurrencySelection: {
      screen: CurrencySelection,
      navigationOptions: {
        title: t('Select your currency'),
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    ManageAssets: {
      screen: ManageAssets,
      navigationOptions: {
        title: t('Manage assets'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    LanguageSelection: {
      screen: LanguageSelection,
      navigationOptions: {
        title: t('Select your language'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    EnableBioAuth: {
      screen: EnableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    DisableBioAuth: {
      screen: DisableBioAuth,
      navigationOptions: {
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      },
    },
    PassphraseBackup: {
      screen: PassphraseBackup,
      navigationOptions: {
        title: t('Passphrase backup'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher />,
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
  Modal: {
    screen: Modal,
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
      headerBackground: <HeaderBackground />,
      headerStyle: {
        overflow: 'hidden',
        elevation: 0,
      },
    },
  },
}, {
  mode: 'modal',
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: ({ scene }) => (scene.route.routeName === 'Modal' ? ({
    transitionSpec: {
      duration: 150,
    },
  }) : ({
    transitionSpec: {
      duration: 350,
    },
  })),
});
