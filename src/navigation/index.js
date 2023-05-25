import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Register from 'modules/Auth/components/Register/Register';
import AddBookmark from 'modules/Bookmark/AddBookmark';
import TransactionDetails from 'modules/Transactions/components/TransactionDetails';
import AccountDetailsScreen from 'modules/Accounts/components/AccountDetailsScreen/AccountDetailsScreen';
import About from 'components/screens/about';
import CurrencySelection from 'components/screens/currencySelection';
import Terms from 'components/screens/terms';
import PrivacyPolicy from 'components/screens/PrivacyPolicy';
import IntroScreen from 'components/screens/IntroScreen/IntroScreen';
import BottomModal from 'components/shared/BottomModal';
import NotFound from 'components/navigation/NotFound';

import BackupRecoveryPhrase from 'modules/Settings/components/BackupRecoveryPhrase/BackupRecoveryPhrase';
import AuthMethod from 'modules/Auth/components/AuthMethod';
import SecretRecoveryPhrase from 'modules/Auth/components/SecretRecoveryPhrase';
import PasswordSetupForm from 'modules/Auth/components/PasswordSetupForm';
import PasswordSetupSuccess from 'modules/Auth/components/PasswordSetupSuccess';
import AccountsManagerScreen from 'modules/Auth/components/AccountsManagerScreen';
import DecryptRecoveryPhraseScreen from 'modules/Auth/components/DecryptRecoveryPhraseScreen/DecryptRecoveryPhraseScreen';
import AddApplication from 'modules/BlockchainApplication/components/AddApplication';
import AddApplicationSuccessScreen from 'modules/BlockchainApplication/components/AddApplicationSuccessScreen/AddApplicationSuccessScreen';
import AddApplicationErrorScreen from 'modules/BlockchainApplication/components/AddApplicationErrorScreen/AddApplicationErrorScreen';
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
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="NotFound"
            component={NotFound}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="AuthMethod"
            component={AuthMethod}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="DecryptRecoveryPhraseScreen"
            component={DecryptRecoveryPhraseScreen}
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
            name="AddApplicationSuccessScreen"
            component={AddApplicationSuccessScreen}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="AddApplicationErrorScreen"
            component={AddApplicationErrorScreen}
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
            name="BackupRecoveryPhrase"
            component={BackupRecoveryPhrase}
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
