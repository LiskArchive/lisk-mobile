import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Register from 'modules/Auth/Register';
import AddBookmark from 'modules/Bookmark/AddBookmark';
import TransactionDetails from 'modules/Transactions/components/TransactionDetails';
import AccountDetailsScreen from 'modules/Accounts/components/AccountDetailsScreen/AccountDetailsScreen';
import About from 'components/screens/about';
import CurrencySelection from 'components/screens/currencySelection';
import Terms from 'components/screens/terms';
import PrivacyPolicy from 'components/screens/PrivacyPolicy';
import EnableBioAuth from 'components/screens/enableBioAuth';
import DisableBioAuth from 'components/screens/disableBioAuth';
import IntroScreen from 'components/screens/IntroScreen/IntroScreen';
import BottomModal from 'components/shared/BottomModal';

import PassphraseBackup from 'modules/Settings/BackupPassphrase';
import AuthMethod from 'modules/Auth/AuthMethod';
import SecretRecoveryPhrase from 'modules/Auth/SecretRecoveryPhrase';
import PasswordSetupForm from 'modules/Auth/PasswordSetupForm';
import PasswordSetupSuccess from 'modules/Auth/PasswordSetupSuccess';
import AccountsManagerScreen from 'modules/Auth/AccountsManagerScreen';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import AddApplication from 'modules/BlockchainApplication/components/AddApplication';
import AddApplicationSuccess from 'modules/BlockchainApplication/components/AddApplicationSuccess';
import ApplicationDetails from 'modules/BlockchainApplication/components/ApplicationDetails/ApplicationDetails';
import SendToken from 'modules/SendToken/SendToken';
import RequestToken from 'modules/RequestToken';
import TokensScreen from 'modules/Accounts/components/TokensScreen';
import TransactionsHistory from 'modules/Transactions/components/TransactionsHistory';
import EditAccountScreen from 'modules/Accounts/components/EditAccountScreen';
import DeleteAccountScreen from 'modules/Accounts/components/DeleteAccountScreen';
import AppNavigator from './components/AppNavigator';

import navigationOptions from './options';
import navigationLinking from './linking';
import { navigationDarkTabsStyle, navigationLightTabsStyle } from './styles';

const StackNavigator = createStackNavigator();

export default function Navigator({ children }) {
  const { theme } = useSelector((state) => state.settings);

  const themeColors = {
    dark: theme === 'light',
    colors: theme === 'light' ? navigationDarkTabsStyle : navigationLightTabsStyle,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={navigationLinking} theme={themeColors}>
        <StackNavigator.Navigator initialRouteName="AuthMethod">
          <StackNavigator.Screen
            name="Register"
            component={Register}
            options={navigationOptions.Register}
          />
          <StackNavigator.Screen
            name="AuthMethod"
            component={AuthMethod}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="DecryptPhrase"
            component={DecryptPhrase}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="AccountsManagerScreen"
            component={AccountsManagerScreen}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="SecretRecoveryPhrase"
            component={SecretRecoveryPhrase}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="PasswordSetupForm"
            component={PasswordSetupForm}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="PasswordSetupSuccess"
            component={PasswordSetupSuccess}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="Intro"
            component={IntroScreen}
            options={navigationOptions.Intro}
          />
          <StackNavigator.Screen
            name="Main"
            component={AppNavigator}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="AddBookmark"
            component={AddBookmark}
            options={navigationOptions.AddBookmark}
          />
          <StackNavigator.Screen
            name="AddApplication"
            component={AddApplication}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="ApplicationDetails"
            component={ApplicationDetails}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="AddApplicationSuccess"
            component={AddApplicationSuccess}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen name="About" component={About} options={navigationOptions.About} />
          <StackNavigator.Screen
            name="CurrencySelection"
            component={CurrencySelection}
            options={navigationOptions.CurrencySelection}
          />
          <StackNavigator.Screen name="Terms" component={Terms} options={navigationOptions.Terms} />
          <StackNavigator.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={navigationOptions.PrivacyPolicy}
          />
          <StackNavigator.Screen
            name="TransactionsHistory"
            component={TransactionsHistory}
            options={navigationOptions.TransactionsHistory}
          />
          <StackNavigator.Screen
            name="TransactionDetails"
            component={TransactionDetails}
            options={navigationOptions.TransactionDetails}
          />
          <StackNavigator.Screen
            name="AccountDetails"
            component={AccountDetailsScreen}
            options={navigationOptions.AccountDetails}
          />
          <StackNavigator.Screen
            name="EnableBioAuth"
            component={EnableBioAuth}
            options={navigationOptions.EnableBioAuth}
          />
          <StackNavigator.Screen
            name="DisableBioAuth"
            component={DisableBioAuth}
            options={navigationOptions.DisableBioAuth}
          />
          <StackNavigator.Screen
            name="PassphraseBackup"
            component={PassphraseBackup}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="Send"
            component={SendToken}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="Request"
            component={RequestToken}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="Tokens"
            component={TokensScreen}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="EditAccount"
            component={EditAccountScreen}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="DeleteAccount"
            component={DeleteAccountScreen}
            options={navigationOptions.NoHeader}
          />
        </StackNavigator.Navigator>
        {children}
        <BottomModal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
