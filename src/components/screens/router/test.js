import React, { useContext } from 'react';

import DynamicHeaderBackground from './dynamicHeaderBackground';
import HomeHeaderTitle from './homeHeaderTitle';
import { t } from './helper';
import HeaderBackButton from './headerBackButton';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import { deviceType } from '../../../utilities/device';
import { fonts } from '../../../constants/styleGuide';
import ThemeContext from '../../../contexts/theme';

const noShadow = {
  borderBottomWidth: 0,
  elevation: 0
};

const genericTitle = {
  fontFamily: fonts.family.heading,
  fontSize: 20
};

export const useNavigationOptions = () => {
  const theme = useContext(ThemeContext);
  return {
    Main: {},
    Send: {
      header: () => null
    },
    SendStack: () => {
      const os = deviceType();
      let headerStyle = {
        height: os === 'iOSx' ? 90 : 64,
      };
      let headerTitleStyle = {
        marginTop: os === 'iOSx' ? 48 : 18
      };
      if (os === 'android') {
        headerStyle = {
          height: 56
        };
        headerTitleStyle = {
          marginTop: 0,
          fontFamily: fonts.family.heading,
          fontSize: 18,
          textAlign: 'center'
        };
      }
      return {
        headerStyle,
        headerTitleStyle,
        headerLeft: (props) => <HeaderBackButton {...props} title="Send LSK" />
      };
    },
    Home: {
      header: () => null
    },
    HomeStack: () => {
      const os = deviceType();
      let headerStyle = {
        height: os === 'iOSx' ? 90 : 64
      };
      if (os === 'android') {
        headerStyle = {
          height: 56
        };
      }
      // tabBarOnPress: ({ defaultHandler, navigation }) => {
      //   if (navigation.isFocused() && navigation.getParam('scrollToTop')) {
      //     navigation.state.params.scrollToTop();
      //   } else {
      //     defaultHandler(0);
      //   }
      // },
      return {
        headerTitle: () => <HomeHeaderTitle type="home" />,
        headerBackground: () => <DynamicHeaderBackground />,
        headerStyle
      };
    },
    Wallet: () => {
      const type = deviceType();
      return {
        headerTitle: () => <HomeHeaderTitle type="wallet" />,
        headerLeft: (props) => <HeaderBackButton {...props} />,
        headerRight: () => <HeaderPlaceholderButton />,
        headerStyle: {
          height: type === 'iOSx' ? 90 : 64,
          ...noShadow
        },
        headerTitleStyle: genericTitle
      };
    },
    Request: {
      title: t('Request'),

      headerLeft: () => <HeaderPlaceholderButton />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    Bookmarks: {
      title: t('Bookmarks'),
      tabBarLabel: 'Bookmarks',
      headerLeft: () => <HeaderPlaceholderButton />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    Settings: {
      title: t('Settings'),
      headerLeft: () => <HeaderPlaceholderButton />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    Register: {
      title: 'Account creation',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerRight: () => <HeaderPlaceholderButton />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    TxDetail: {
      title: null,
      headerLeft: (props) => <HeaderBackButton {...props} title="Transaction details" />,
      headerRight: () => <HeaderPlaceholderButton />,
      headerStyle: noShadow
    },

    CurrencySelection: {
      title: 'Select your currency',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    About: {
      title: 'About Lisk',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    Terms: {
      title: 'Terms of use',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    EnableBioAuth: {
      title: 'Enable Bio Auth',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    DisableBioAuth: {
      title: 'Btop Auth',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    PassphraseBackup: {
      title: 'Passphrase backup',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    AddBookmark: {
      title: 'New bookmark',
      headerLeft: (props) => <HeaderBackButton {...props} />,
      headerStyle: noShadow,
      headerTitleStyle: genericTitle
    },

    SignIn: {
      header: () => null
    },

    Intro: {
      header: () => null
    }
  };
};

export default useNavigationOptions;
