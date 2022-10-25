import React from 'react';

import HeaderBackButton from 'components/navigation/headerBackButton';
import HeaderPlaceholderButton from 'components/navigation/headerPlaceholderButton';
import { navigationGenericTitleStyle, navigationNoShadowStyle } from './styles';

const navigationOptions = {
  Main: {},
  Home: {
    header: () => null,
  },
  NoHeader: () => {
    return {
      headerShown: false,
    };
  },
  Wallet: {
    header: () => null,
  },
  Applications: {
    title: null,
    header: () => null,
  },
  Send: {
    title: null,
    header: () => null,
  },
  Bookmarks: {
    tabBarLabel: 'Bookmarks',
    headerShown: false,
  },
  Settings: {
    title: null,
    header: () => null,
  },
  Register: {
    title: 'Account creation',
    headerRight: () => <HeaderPlaceholderButton />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  TransactionsHistory: {
    header: () => null,
  },
  TransactionDetails: {
    header: () => null,
  },
  CurrencySelection: {
    title: null,
    headerLeft: (props) => <HeaderBackButton title="Select your currency" {...props} />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  About: {
    title: null,
    headerLeft: (props) => <HeaderBackButton title="About Lisk" {...props} />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  Terms: {
    title: null,
    headerLeft: (props) => <HeaderBackButton title="Terms of use" {...props} alwaysLight />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  PrivacyPolicy: {
    title: null,
    headerLeft: (props) => <HeaderBackButton title="Privacy Policy" {...props} alwaysLight />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  EnableBioAuth: {
    title: null,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  DisableBioAuth: {
    title: null,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  PassphraseBackup: {
    title: null,
    headerLeft: (props) => <HeaderBackButton title="Passphrase backup" {...props} />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  AddBookmark: {
    title: null,
    headerLeft: (props) => <HeaderBackButton {...props} title="New bookmark" />,
    headerStyle: navigationNoShadowStyle,
    headerTitleStyle: navigationGenericTitleStyle,
  },
  SignIn: {
    header: () => null,
  },
  Intro: {
    header: () => null,
  },
};

export default navigationOptions;
