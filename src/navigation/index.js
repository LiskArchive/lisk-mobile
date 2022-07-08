import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { colors } from 'constants/styleGuide';
import Register from 'modules/Auth/Register';
import AddBookmark from 'modules/Bookmark/AddBookmark';
import { TransactionDetails } from 'modules/Accounts/components/TransactionDetails';
import Wallet from 'modules/Wallet';
import About from 'components/screens/about';
import CurrencySelection from 'components/screens/currencySelection';
import Terms from 'components/screens/terms';
import EnableBioAuth from 'components/screens/enableBioAuth';
import DisableBioAuth from 'components/screens/disableBioAuth';
import Intro from 'components/screens/intro';

import PassphraseBackup from 'modules/Settings/BackupPassphrase';
import AuthMethod from 'modules/Auth/AuthMethod';
import SignIn from 'modules/Auth/SignIn';
import SecretRecoveryPhrase from 'modules/Auth/SecretRecoveryPhrase';
import PasswordSetupForm from 'modules/Auth/PasswordSetupForm';
import ManageAccount from 'modules/Auth/ManageAccount';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import SwitchAccount from 'modules/Auth/SwitchAccount';
import navigationOptions from './navigationOptions';
import AppNavigator from './appNavigator';

const MainStack = createStackNavigator();

const darkTabs = {
  ...DarkTheme,
  primary: colors.dark.ultramarineBlue,
  background: colors.light.white,
  card: colors.light.white,
  text: colors.light.tabBarText,
  border: 'transparent'
};

const lightTabs = {
  ...DefaultTheme,
  primary: colors.light.ultramarineBlue,
  background: colors.dark.white,
  card: colors.dark.black,
  text: colors.dark.tabBarText,
  border: 'transparent'
};

const MainNavigator = () => {
  const { theme } = useSelector((state) => state.settings);
  const themeColors = {
    dark: theme === 'light',
    colors: theme === 'light' ? darkTabs : lightTabs
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={themeColors}>
        <MainStack.Navigator initialRouteName="AuthMethod">
          <MainStack.Screen
            name="Register"
            component={Register}
            options={navigationOptions.Register}
          />
          <MainStack.Screen name="AuthMethod" component={AuthMethod} options={navigationOptions.SignIn} />
          <MainStack.Screen name="SwitchAccount" component={SwitchAccount} options={navigationOptions.SignIn} />
          <MainStack.Screen name="DecryptPhrase" component={DecryptPhrase} options={navigationOptions.SignIn} />
          <MainStack.Screen name="ManageAccount" component={ManageAccount} options={navigationOptions.SignIn} />
          <MainStack.Screen name="SecretRecoveryPhrase" component={SecretRecoveryPhrase} options={navigationOptions.SignIn} />
          <MainStack.Screen name="PasswordSetupForm" component={PasswordSetupForm} options={navigationOptions.SignIn} />
          <MainStack.Screen name="SignIn" component={SignIn} options={navigationOptions.SignIn} />
          <MainStack.Screen name="Intro" component={Intro} options={navigationOptions.Intro} />
          <MainStack.Screen name="Main" component={AppNavigator} options={navigationOptions.NoHeader} />
          <MainStack.Screen
            name="AddBookmark"
            component={AddBookmark}
            options={navigationOptions.AddBookmark}
          />
          <MainStack.Screen name="About" component={About} options={navigationOptions.About} />
          <MainStack.Screen
            name="CurrencySelection"
            component={CurrencySelection}
            options={navigationOptions.CurrencySelection}
          />
          <MainStack.Screen name="Terms" component={Terms} options={navigationOptions.Terms} />
          <MainStack.Screen
            name="TxDetail"
            component={TransactionDetails}
            options={navigationOptions.TxDetail}
          />
          <MainStack.Screen name="Wallet" component={Wallet} options={navigationOptions.Wallet} />
          <MainStack.Screen
            name="EnableBioAuth"
            component={EnableBioAuth}
            options={navigationOptions.EnableBioAuth}
          />
          <MainStack.Screen
            name="DisableBioAuth"
            component={DisableBioAuth}
            options={navigationOptions.DisableBioAuth}
          />
          <MainStack.Screen
            name="PassphraseBackup"
            component={PassphraseBackup}
            options={navigationOptions.NoHeader}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
