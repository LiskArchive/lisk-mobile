import React, { useEffect, useState } from 'react';

import { useModal } from 'contexts/useModal';
import { useNavigation } from '@react-navigation/native';

import AccountList from '../components/AccountList';
import EditAccountForm from '../components/EditAccountForm';
import DeleteAccountForm from '../components/DeleteAccountForm';

export default function useAccountManagerModal() {
  const [data, setData] = useState(undefined);
  const [activeScreen, setActiveScreen] = useState(undefined);
  const { showModal, closeModal, isOpen } = useModal();

  const navigation = useNavigation();

  function handleCompleted() {
    navigation.navigate('Main');
    closeModal();
    setActiveScreen(undefined);
  }

  const changeSelection = (selection, account) => {
    setData(account);
    setActiveScreen(selection);
  };

  const getScreen = (screen) => {
    let children = null;

    switch (screen || activeScreen) {
      case 'AccountList':
        children = (
          <AccountList
            mode="modal"
            onAccountClick={() => closeModal()}
            onEditAccountClick={(account) => changeSelection('EditAccount', account)}
            onDeleteAccountClick={(account) => changeSelection('DeleteAccount', account)}
            navigation={navigation}
          />
        );
        break;

      case 'EditAccount':
        children = <EditAccountForm mode="modal" account={data} onCompleted={handleCompleted} />;
        break;

      case 'DeleteAccount':
        children = <DeleteAccountForm mode="modal" account={data} onCompleted={handleCompleted} />;
        break;

      default:
        break;
    }
    return children;
  };

  useEffect(() => {
    if (activeScreen) {
      showModal(getScreen(activeScreen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveScreen(undefined);
    }
  }, [isOpen]);

  return {
    openModal: () => {
      showModal(getScreen(activeScreen || 'AccountList'));
    },
  };
}
