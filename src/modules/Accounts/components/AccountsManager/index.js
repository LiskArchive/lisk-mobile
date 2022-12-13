import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import EditAccountForm from '../EditAccountForm';
import DeleteAccountConfirmation from '../DeleteAccountConfirmation';
import AccountList from '../AccountList';

export default function AccountsManager({ mode = 'screen', onAccountClick, style }) {
  const [activeSection, setActiveSection] = useState({ id: 'AccountList', data: undefined });

  const navigation = useNavigation();

  const { accounts } = useAccounts();

  function handleActionClick({ id, data }) {
    if (mode === 'screen') {
      return navigation.navigate({ name: id, params: data });
    }

    return setActiveSection({ id, data });
  }

  function handleResetSection() {
    setActiveSection({ id: 'AccountList', data: undefined });
  }

  let children = null;

  switch (activeSection.id) {
    case 'AccountList':
      children = (
        <AccountList
          mode={mode}
          accounts={accounts}
          onAccountClick={onAccountClick}
          onEditAccountClick={(account) => handleActionClick({ id: 'EditAccount', data: account })}
          onDeleteAccountClick={(account) =>
            handleActionClick({ id: 'DeleteAccount', data: account })
          }
          style={style?.list}
        />
      );
      break;

    case 'EditAccount':
      children = (
        <EditAccountForm
          mode="modal"
          account={activeSection.data}
          onReset={handleResetSection}
          style={style?.editAccount}
        />
      );
      break;

    case 'DeleteAccount':
      children = (
        <DeleteAccountConfirmation
          mode="modal"
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
