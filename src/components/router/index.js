import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
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
import HeaderBackground from './headerBackground';
import HeaderTitle from './headerTitle';
import HomeHeaderTitle from './homeHeaderTitle';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import HeaderBackButton from './headerBackButton';
import TokenSwitcher from './tokenSwitcher';
import TabBarIcon from './tabBarIcon';
import TabBarComponent from './tabBarComponent';
import DynamicHeaderBackground from './dynamicHeaderBackground';
import registerHeaderTitle from './registerHeaderTitle';
import { colors } from '../../constants/styleGuide';

const headerStyle = {
  backgroundColor: 'transparent',
  overflow: 'hidden',
  elevation: 1,
  borderBottomWidth: 0,
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
const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: HomeHeaderTitle,
      headerRight: HeaderPlaceholderButton,
      headerLeft: HeaderPlaceholderButton,
      headerBackground: <DynamicHeaderBackground />,
      tabBarIcon: props => <TabBarIcon name='home' {...props} />, //eslint-disable-line
      tabBarOnPress: ({ defaultHandler, navigation }) => {
        if (navigation.isFocused() && navigation.getParam('scrollToTop')) {
          navigation.state.params.scrollToTop();
        } else {
          defaultHandler(0);
        }
      },
    },
  },
  Request: {
    screen: Request,
    navigationOptions: {
      title: t('Request'),
      tabBarIcon: props => <TabBarIcon name='request' {...props} />, //eslint-disable-line
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      tabBarIcon: props => <TabBarIcon name='send' {...props} />, //eslint-disable-line
    },
  },
  Bookmarks: {
    screen: Bookmark,
    navigationOptions: {
      title: t('Bookmarks'),
      tabBarLabel: 'Bookmarks',
      tabBarIcon: props => <TabBarIcon name='bookmark' {...props} />, //eslint-disable-line
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: t('Settings'),
      tabBarIcon: props => <TabBarIcon name='settings' {...props} />, //eslint-disable-line
    },
  },
}, {
  tabBarComponent: TabBarComponent,
  initialRouteName: 'Home',
  headerMode: 'screen',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: undefined,
    indicatorStyle: undefined,
    inactiveTintColor: undefined,
    showIcon: true,
    showLabel: false,
    upperCaseLabel: false,
    allowFontScaling: false,
  },
});


// eslint-disable-next-line new-cap
const MainStack = createStackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        headerTitle: registerHeaderTitle,
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          color: colors.light.black,
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
      navigationOptions: ({ navigation }) => {
        const isHome = navigation.state.routes[navigation.state.index].routeName === 'Home';
        const title = navigation.state.routes[navigation.state.index].routeName;
        const rest = isHome ?
          {
            headerBackground: <DynamicHeaderBackground />,
            headerTitle: HomeHeaderTitle,
            headerRight: HeaderPlaceholderButton,
          } : {
            headerBackground: <HeaderBackground />,
            headerTitle: HeaderTitle,
            headerRight: <TokenSwitcher navigation={navigation} />,
          };

        return {
          title,
          headerStyle,
          ...rest,
        };
      },
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: {
        title: t('Transaction Details'),
        headerTitle: HeaderTitle,
        headerRight: HeaderPlaceholderButton,
        headerBackground: <HeaderBackground noBorder={true} />,
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
        headerTitle: props => <HomeHeaderTitle {...props} wallet={true} />,  //eslint-disable-line
        headerRight: HeaderPlaceholderButton,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground noBorder={true} />,
      },
    },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        title: t('About Lisk'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
    },
    Terms: {
      screen: Terms,
      navigationOptions: ({ navigation }) => ({
        title: t('Terms of use'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
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
      navigationOptions: ({ navigation }) => ({
        title: t('Manage tokens'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
    },
    LanguageSelection: {
      screen: LanguageSelection,
      navigationOptions: ({ navigation }) => ({
        title: t('Select your language'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
    },
    EnableBioAuth: {
      screen: EnableBioAuth,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
    },
    DisableBioAuth: {
      screen: DisableBioAuth,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
    },
    PassphraseBackup: {
      screen: PassphraseBackup,
      navigationOptions: ({ navigation }) => ({
        title: t('Passphrase backup'),
        headerTitle: HeaderTitle,
        headerRight: <TokenSwitcher navigation={navigation} />,
        headerLeft: HeaderBackButton,
        headerBackground: <HeaderBackground />,
        headerStyle,
      }),
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


export default createStackNavigator({ //eslint-disable-line
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
});
