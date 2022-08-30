import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/useTheme';
import Splash from '../components/splash';
import AccountItem from '../components/AccountItem';
import AccountsManager from '../../Accounts/components/AccountsManager';

import getAccountsManagerScreenStyles from './styles';

export default function AccountsManagerScreen() {
  const { styles } = useTheme({
    styles: getAccountsManagerScreenStyles(),
  });

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Splash animate={false} />

      <AccountsManager
        item={AccountItem}
        style={{ container: styles.container }}
      />
    </SafeAreaView>
  );
}
