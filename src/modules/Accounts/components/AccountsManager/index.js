import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import DeleteAccountConfirmation from '../DeleteAccountConfirmation';
import AccountList from '../AccountList';

import getAccountsManagerStyles from './styles';

export default function AccountsManager({ mode = 'screen', onAccountPress, style }) {
  const [activeSection, setActiveSection] = useState({ id: 'accountsList', data: undefined });

  const { accounts } = useAccounts();

  const { styles } = useTheme({ styles: getAccountsManagerStyles() });

  function handleResetSection() {
    setActiveSection({ id: 'accountsList', data: undefined });
  }

  let children = null;

  switch (activeSection.id) {
    case 'accountsList':
      children = (
        <AccountList
          mode={mode}
          accounts={accounts}
          onAccountPress={onAccountPress}
          onDeleteAccountPress={(account) =>
            setActiveSection({ id: 'deleteAccountConfirmation', data: account })
          }
          onEditAccountPress={(account) =>
            setActiveSection({ id: 'editAccountConfirmation', data: account })
          }
          style={style}
        />
      );
      break;

    case 'deleteAccountConfirmation':
      children = (
        <DeleteAccountConfirmation
          account={activeSection.data}
          onReset={handleResetSection}
          style={style}
        />
      );
      break;

    case 'editAccountConfirmation':
      children = (
        <View>
          <Text>Edit account</Text>
        </View>
      );
      break;

    default:
      break;
  }

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>{children}</View>
  );
}
