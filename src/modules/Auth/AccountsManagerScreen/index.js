import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import AccountList from 'modules/Accounts/components/AccountList';
import HeaderLogo from 'components/shared/HeaderLogo/HeaderLogo';

import getAccountsManagerScreenStyles from './styles';

export default function AccountsManagerScreen() {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getAccountsManagerScreenStyles(),
  });

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderLogo style={{ container: { marginBottom: 40 } }} />

      <AccountList
        mode="screen"
        onEditAccountClick={(account) =>
          navigation.navigate({ name: 'EditAccount', params: account })
        }
        onDeleteAccountClick={(account) =>
          navigation.navigate({ name: 'DeleteAccount', params: account })
        }
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
