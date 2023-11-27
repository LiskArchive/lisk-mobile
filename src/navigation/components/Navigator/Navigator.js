/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import RNShake from 'react-native-shake';

import RegisterForm from 'modules/Auth/components/RegisterForm/RegisterForm';
import AddBookmark from 'modules/Bookmark/AddBookmark';
import TransactionDetails from 'modules/Transactions/components/TransactionDetails';
import AccountDetailsScreen from 'modules/Accounts/components/AccountDetailsScreen/AccountDetailsScreen';
import AboutScreen from 'components/screens/AboutScreen/AboutScreen';
import CurrencySelection from 'components/screens/currencySelection';
import Terms from 'components/screens/terms';
import PrivacyPolicy from 'components/screens/PrivacyPolicy';
import IntroScreen from 'components/screens/IntroScreen/IntroScreen';
import BottomModal from 'components/shared/BottomModal';
import ErrorScreen from 'components/screens/ErrorFallbackScreen';
import NotFoundScreen from 'components/screens/NotFoundScreen/NotFoundScreen';

import BackupRecoveryPhrase from 'modules/Settings/components/BackupRecoveryPhrase/BackupRecoveryPhrase';
import AuthMethod from 'modules/Auth/components/AuthMethod';
import RecoveryPhraseScreen from 'modules/Auth/components/RecoveryPhraseScreen/RecoveryPhraseScreen';
import PasswordSetupForm from 'modules/Auth/components/PasswordSetupForm';
import PasswordSetupSuccess from 'modules/Auth/components/PasswordSetupSuccess';
import AccountsManagerScreen from 'modules/Auth/components/AccountsManagerScreen';
import DecryptRecoveryPhraseScreen from 'modules/Auth/components/DecryptRecoveryPhraseScreen/DecryptRecoveryPhraseScreen';
import AddApplicationScreen from 'modules/BlockchainApplication/components/AddApplicationScreen/AddApplicationScreen';
import ApplicationDetails from 'modules/BlockchainApplication/components/ApplicationDetails/ApplicationDetails';
import RequestToken from 'modules/RequestToken';
import TokensScreen from 'modules/Accounts/components/TokensScreen';
import TransactionsHistory from 'modules/Transactions/components/TransactionsHistory';
import EditAccountScreen from 'modules/Accounts/components/EditAccountScreen';
import DeleteAccountScreen from 'modules/Accounts/components/DeleteAccountScreen';
import SecurityScreen from 'modules/Settings/components/SecurityScreen/SecurityScreen';
import ScanDeviceScreen from 'modules/Settings/components/ScanDeviceScreen/ScanDeviceScreen';

import { settingsUpdated } from 'modules/Settings/store/actions';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';

import AppNavigator from '../AppNavigator';

import navigationOptions from '../../navigation.options';
import navigationLinking from '../../navigation.linking';
import { navigationDarkTabsStyle, navigationLightTabsStyle } from './Navigator.styles';
import ExternalApplicationDetailsScreen from '../../../modules/BlockchainApplication/components/ExternalApplicationDetailsScreen/ExternalApplicationDetailsScreen';
import SendTokenContainer from '../../../modules/SendToken/SendTokenContainer';

const StackNavigator = createStackNavigator();

export default function Navigator({ children }) {
  const { theme, enableShakePhone } = useSelector((state) => state.settings);
  const discrete = useSelector((state) => state.settings.discrete);
  const dispatch = useDispatch();
  const { accounts } = useAccounts();

  useEffect(() => {
    if (enableShakePhone) {
      RNShake.addListener(() => {
        if (accounts.length) {
          dispatch(
            settingsUpdated({
              discrete: !discrete,
            })
          );
        }
      });
    }
    return () => RNShake.removeAllListeners();
  }, [discrete, enableShakePhone]);

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
            component={RegisterForm}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="Error"
            component={ErrorScreen}
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
            name="RecoveryPhrase"
            component={RecoveryPhraseScreen}
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
            component={AddApplicationScreen}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="ApplicationDetails"
            component={ApplicationDetails}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="ExternalApplicationDetails"
            component={ExternalApplicationDetailsScreen}
            options={navigationOptions.SignIn}
          />
          <StackNavigator.Screen
            name="About"
            component={AboutScreen}
            options={navigationOptions.About}
          />
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
            component={SendTokenContainer}
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
          <StackNavigator.Screen
            name="SecurityScreen"
            component={SecurityScreen}
            options={navigationOptions.NoHeader}
          />
          <StackNavigator.Screen
            name="ScanDeviceScreen"
            component={ScanDeviceScreen}
            options={navigationOptions.NoHeader}
          />
        </StackNavigator.Navigator>
        {children}
        <BottomModal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
