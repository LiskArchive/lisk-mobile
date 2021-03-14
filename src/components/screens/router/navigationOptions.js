import React from 'react';

import DynamicHeaderBackground from './dynamicHeaderBackground';
import HomeHeaderTitle from './homeHeaderTitle';
import { t } from './helper';
import HeaderBackButton from './headerBackButton';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import TokenSwitcher from './tokenSwitcher';
import { deviceType } from '../../../utilities/device';

const navigationOptions = {};

navigationOptions.Main = {
  // header: () => null,
};

navigationOptions.Send = {
  header: () => null,
};

navigationOptions.SendStack = () => {
  const type = deviceType();
  return {
    headerStyle: {
      height: type === 'iOSx' ? 90 : 64,
    },
    headerTitleStyle: {
      marginTop: type === 'iOSx' ? 48 : 18,
    },
    title: t('Recipient'),
    headerLeft: () => <HeaderPlaceholderButton />,
    headerRight: () => <TokenSwitcher safeArea={true} />,
  };
};

navigationOptions.Home = {
  header: () => null,
};

navigationOptions.HomeStack = () => {
  const type = deviceType();
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
    headerStyle: {
      height: type === 'iOSx' ? 90 : 64,
    },
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
};

navigationOptions.Bookmarks = {
  title: t('Bookmarks'),
  tabBarLabel: 'Bookmarks',
  headerRight: () => <TokenSwitcher />,
};

navigationOptions.Settings = {
  title: t('Settings'),
  headerRight: () => <TokenSwitcher />,
};

navigationOptions.Register = {
  title: 'Account creation',
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.TxDetail = {
  title: 'Transaction details',
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.ManageAssets = {
  title: 'Manage tokens',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.CurrencySelection = {
  title: 'Select your currency',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.About = {
  title: 'About Lisk',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.Terms = {
  title: 'Terms of use',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.EnableBioAuth = {
  title: 'Enable Bio Auth',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.DisableBioAuth = {
  title: 'Btop Auth',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.PassphraseBackup = {
  title: 'Passphrase backup',
  headerRight: () => <TokenSwitcher />,
  headerLeft: props => <HeaderBackButton {...props} />,
};

navigationOptions.AddBookmark = {
  title: 'New bookmark',
};

navigationOptions.SignIn = {
  header: () => null,
};

navigationOptions.Intro = {
  header: () => null,
};

export default navigationOptions;
