import React from 'react';
import { t } from './helper';
import HeaderBackButton from './headerBackButton';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import { deviceType } from '../../../utilities/device';
import { fonts } from '../../../constants/styleGuide';

const noShadow = {
  borderBottomWidth: 0,
  elevation: 0
};

const genericTitle = {
  fontFamily: fonts.family.heading,
  fontSize: 20
};

const noTitle = {
  opacity: 0
};

const navigationOptions = {};

navigationOptions.Main = {};

navigationOptions.Send = {
  header: () => null
};

navigationOptions.SendStack = () => {
  const os = deviceType();
  let headerStyle = {
    height: os === 'iOSx' ? 90 : 64
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
    title: t('Recipient'),
    headerLeft: () => <HeaderPlaceholderButton />
  };
};

navigationOptions.Home = {
  header: () => null
};

navigationOptions.NoHeader = () => {
  return {
    headerShown: false
  };
};

navigationOptions.Wallet = {
  header: () => null
};

navigationOptions.Request = {
  title: null,
  headerLeft: () => <HeaderBackButton title="Request" noIcon />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.Bookmarks = {
  tabBarLabel: 'Bookmarks',
  headerShown: false
};

navigationOptions.Settings = {
  title: null,
  headerLeft: () => <HeaderBackButton title="Settings" noIcon />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.Register = {
  title: 'Account creation',
  headerRight: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.TxDetail = {
  title: null,
  headerLeft: (props) => <HeaderBackButton {...props} title="Transaction details" />,
  headerRight: () => <HeaderPlaceholderButton />,
  headerStyle: noShadow,
  headerTitleStyle: noTitle
};

navigationOptions.CurrencySelection = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Select your currency" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.About = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="About Lisk" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.Terms = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Terms of use" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.EnableBioAuth = {
  title: null,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.DisableBioAuth = {
  title: null,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.PassphraseBackup = {
  title: null,
  headerLeft: (props) => <HeaderBackButton title="Passphrase backup" {...props} />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.AddBookmark = {
  title: null,
  headerLeft: (props) => <HeaderBackButton {...props} title="New bookmark" />,
  headerStyle: noShadow,
  headerTitleStyle: genericTitle
};

navigationOptions.SignIn = {
  header: () => null
};

navigationOptions.Intro = {
  header: () => null
};

export default navigationOptions;
