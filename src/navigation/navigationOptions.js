import React from 'react';

import { fonts } from 'constants/styleGuide';
import HeaderBackButton from 'components/navigation/headerBackButton';
import HeaderPlaceholderButton from 'components/navigation/headerPlaceholderButton';

const noShadow = {
  borderBottomWidth: 0,
  elevation: 0,
};

const genericTitle = {
  fontFamily: fonts.family.heading,
  fontSize: 20,
};

const navigationOptions = {};

navigationOptions.Main = {};

navigationOptions.Home = {
  header: () => null,
};

navigationOptions.NoHeader = () => {
  return {
    headerShown: false,
  };
};

navigationOptions.Wallet = {
  header: () => null,
};

navigationOptions.Applications = {
  title: null,
  header: () => null,
};

navigationOptions.Send = {
  title: null,
  header: () => null,
};

navigationOptions.Bookmarks = {
  tabBarLabel: 'Bookmarks',
  headerShown: false,
};

navigationOptions.Settings = {
  title: null,
  header: () => null,
};

navigationOptions.Register = {
  title: 'Account creation',
  headerRight: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.TransactionsHistory = {
  header: () => null,
};

navigationOptions.TransactionDetails = {
  header: () => null,
};

navigationOptions.CurrencySelection = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Select your currency" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.About = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="About Lisk" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.Terms = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Terms of use" {...props} alwaysLight />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.PrivacyPolicy = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Privacy Policy" {...props} alwaysLight />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.EnableBioAuth = {
  title: null,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.DisableBioAuth = {
  title: null,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.PassphraseBackup = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Passphrase backup" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle,
};

navigationOptions.AddBookmark = {
  title: null,
  headerLeft: (props) => <HeaderBackButton {...props} title="New bookmark" />,
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
