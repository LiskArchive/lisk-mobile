import React, { useState } from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';

import getAccountsManagerStyles from './styles';
import { AccountsList, DeleteAccountConfirmation } from './components';

export default function AccountsManager({
  mode = 'screen',
  onAccountPress,
  style
}) {
  const [activeSection,
    setActiveSection] = useState({ id: 'accountsList', data: undefined });

  const { accounts } = useAccounts();

  const { styles } = useTheme({ styles: getAccountsManagerStyles() });

  let children = null;

  switch (activeSection.id) {
    case 'accountsList':
      children = (
        <AccountsList
          mode={mode}
          accounts={accounts}
          onAccountPress={onAccountPress}
          onDeleteAccountPress={(account) =>
            setActiveSection({ id: 'deleteAccountConfirmation', data: account })}
          style={style}
        />
      );
      break;

    case 'deleteAccountConfirmation':
      children = (
        <DeleteAccountConfirmation
          style={style}
          account={activeSection.data}
          onCancel = {() => setActiveSection({ id: 'accountsList', data: undefined })}
        />
      );
      break;

    default:
      break;
  }

  return (
    <View
      style={[
        styles.container,
        styles.theme.container,
        style?.container
      ]}
    >
      {children}
    </View>
  );
}
