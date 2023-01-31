import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import BottomModal from 'components/shared/BottomModal';

import getAccountsManagerModalStyles from './styles';
import AccountList from '../AccountList';
import EditAccountForm from '../EditAccountForm';
import DeleteAccountForm from '../DeleteAccountForm';

export default function AccountsManagerModal({ show, setShow }) {
  const [activeSection, setActiveSection] = useState({ id: 'AccountList', data: undefined });

  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getAccountsManagerModalStyles() });

  let children = null;

  function handleCompleted() {
    navigation.navigate('Main');
    setActiveSection({ id: 'AccountList', data: undefined });
    setShow(false);
  }

  useEffect(() => {
    setActiveSection({ id: 'AccountList', data: undefined });
  }, [show]);

  switch (activeSection.id) {
    case 'AccountList':
      children = (
        <AccountList
          mode="modal"
          onAccountClick={() => setShow(false)}
          onEditAccountClick={(account) => setActiveSection({ id: 'EditAccount', data: account })}
          onDeleteAccountClick={(account) =>
            setActiveSection({ id: 'DeleteAccount', data: account })
          }
        />
      );
      break;

    case 'EditAccount':
      children = (
        <EditAccountForm mode="modal" account={activeSection.data} onCompleted={handleCompleted} />
      );
      break;

    case 'DeleteAccount':
      children = (
        <DeleteAccountForm
          mode="modal"
          account={activeSection.data}
          onCompleted={handleCompleted}
        />
      );
      break;

    default:
      break;
  }

  return (
    <BottomModal show={show} toggleShow={setShow} style={{ children: styles.container }}>
      {children}
    </BottomModal>
  );
}
