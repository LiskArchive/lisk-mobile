import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import AddBookmark from '../addBookmark';
import SignIn from '../signIn';
import TxDetail from '../txDetail';
import Register from '../register';
import Wallet from '../wallet';
import About from '../about';
import CurrencySelection from '../currencySelection';
import Terms from '../terms';
import EnableBioAuth from '../enableBioAuth';
import DisableBioAuth from '../disableBioAuth';
import PassphraseBackup from '../passphraseBackup';
import Intro from '../intro';
import Tabs, { getHeaderOptions } from './tabStack';
import { colors } from '../../../constants/styleGuide';

import navigationOptions from './navigationOptions';

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
        <MainStack.Navigator initialRouteName="SignIn">
          <MainStack.Screen
            name="Register"
            component={Register}
            options={navigationOptions.Register}
          />
          <MainStack.Screen name="SignIn" component={SignIn} options={navigationOptions.SignIn} />
          <MainStack.Screen name="Intro" component={Intro} options={navigationOptions.Intro} />
          <MainStack.Screen name="Main" component={Tabs} options={navigationOptions.NoHeader} />
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
            component={TxDetail}
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
            options={navigationOptions.PassphraseBackup}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
