import React, { useState } from 'react';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import EditAccountForm from '../EditAccountForm';
import DeleteAccountConfirmation from '../DeleteAccountConfirmation';
import AccountList from '../AccountList';

export default function AccountsManager({ mode = 'screen', onAccountPress, style }) {
  const [activeSection, setActiveSection] = useState({ id: 'accountsList', data: undefined });

  const { accounts } = useAccounts();

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
          onEditAccountPress={(account) =>
            setActiveSection({ id: 'editAccountForm', data: account })
          }
          onDeleteAccountPress={(account) =>
            setActiveSection({ id: 'deleteAccountConfirmation', data: account })
          }
          style={style?.list}
        />
      );
      break;

    case 'editAccountForm':
      children = (
        <EditAccountForm
          account={activeSection.data}
          onReset={handleResetSection}
          style={style?.editAccount}
        />
      );
      break;

    case 'deleteAccountConfirmation':
      children = (
        <DeleteAccountConfirmation
          account={activeSection.data}
          onReset={handleResetSection}
          style={style?.deleteAccount}
        />
      );
      break;

    default:
      break;
  }

  return children;
}
