import React from 'react';

import DynamicHeaderBackground from './dynamicHeaderBackground';
import HomeHeaderTitle from './homeHeaderTitle';
import { t } from './helper';
import HeaderBackButton from './headerBackButton';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import TokenSwitcher from './tokenSwitcher';
import { deviceType } from '../../../utilities/device';
import { fonts } from '../../../constants/styleGuide';

const noShadow = {
  borderBottomWidth: 0,
  elevation: 0,
};

const genericTitle = {
  fontFamily: fonts.family.heading,
  fontSize: 18,
  textAlign: 'center',
};

const navigationOptions = {};

navigationOptions.Main = {};

navigationOptions.Send = {
  header: () => null,
};

navigationOptions.SendStack = () => {
  const os = deviceType();
  let headerStyle = {
    height: os === 'iOSx' ? 90 : 64,
  };
  let headerTitleStyle = {
    marginTop: os === 'iOSx' ? 48 : 18,
  };
  if (os === 'android') {
    headerStyle = {
      height: 56,
    };
    headerTitleStyle = {
      marginTop: 0,
      fontFamily: fonts.family.heading,
      fontSize: 18,
      textAlign: 'center',
    };
  }
  return {
    headerStyle,
    headerTitleStyle,
    title: t('Recipient'),
    headerLeft: () => <HeaderPlaceholderButton />,
    headerRight: () => <TokenSwitcher safeArea={true} />,
  };
};

navigationOptions.Home = {
  header: () => null,
};

navigationOptions.HomeStack = () => {
  const os = deviceType();
  let headerStyle = {
    height: os === 'iOSx' ? 90 : 64,
  };
  if (os === 'android') {
    headerStyle = {
      height: 56,
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
    headerStyle,
  };
};

navigationOptions.Wallet = () => {
  const type = deviceType();
  return {
    headerTitle: () => <HomeHeaderTitle type="wallet" />,
    headerLeft: props => <HeaderBackButton {...props} />,
    headerStyle: {
      height: type === 'iOSx' ? 90 : 64,
    },
  };
};

navigationOptions.Request = {
  title: t('Request'),
  headerRight: () => <TokenSwitcher />,
  headerLeft: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.Bookmarks = {
  title: t('Bookmarks'),
  tabBarLabel: 'Bookmarks',
  headerRight: () => <TokenSwitcher />,
  headerLeft: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.Settings = {
  title: t('Settings'),
  headerRight: () => <TokenSwitcher />,
  headerLeft: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.Register = {
  title: 'Account creation',
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.TxDetail = {
  title: 'Transaction details',
  headerLeft: props => <HeaderBackButton {...props} />,
  headerRight: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.ManageAssets = {
  title: 'Manage tokens',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.CurrencySelection = {
  title: 'Select your currency',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.About = {
  title: 'About Lisk',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.Terms = {
  title: 'Terms of use',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.EnableBioAuth = {
  title: 'Enable Bio Auth',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.DisableBioAuth = {
  title: 'Btop Auth',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.PassphraseBackup = {
  title: 'Passphrase backup',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.AddBookmark = {
  title: 'New bookmark',
  headerLeft: props => <HeaderBackButton {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.SignIn = {
  header: () => null,
};

navigationOptions.Intro = {
  header: () => null,
};

export default navigationOptions;
