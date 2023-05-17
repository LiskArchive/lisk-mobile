/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';

import { useModal } from 'hooks/useModal';
import { useNavigation } from '@react-navigation/native';

import AccountList from '../components/AccountList';
import EditAccountForm from '../components/EditAccountForm';
import DeleteAccountForm from '../components/DeleteAccountForm';
import { useCurrentAccount } from './useCurrentAccount';

export default function useAccountManagerModal() {
  const [data, setData] = useState(undefined);
  const [activeScreen, setActiveScreen] = useState(undefined);
  const modal = useModal();

  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

  const handleOnDeleteCompleted = () => {
    modal.close();
    setActiveScreen(undefined);

    if (data?.metadata.address === currentAccount?.metadata.address) {
      navigation.navigate('AccountsManagerScreen');
    }
  };

  const handleOnEditCompleted = () => {
    modal.close();
    setActiveScreen(undefined);
  };

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
            onAccountClick={modal.close}
            onEditAccountClick={(account) => changeSelection('EditAccount', account)}
            onDeleteAccountClick={(account) => changeSelection('DeleteAccount', account)}
            navigation={navigation}
          />
        );
        break;

      case 'EditAccount':
        children = (
          <EditAccountForm mode="modal" account={data} onCompleted={handleOnEditCompleted} />
        );
        break;

      case 'DeleteAccount':
        children = (
          <DeleteAccountForm mode="modal" account={data} onCompleted={handleOnDeleteCompleted} />
        );
        break;

      default:
        break;
    }
    return children;
  };

  useEffect(() => {
    if (activeScreen) {
      modal.open(getScreen(activeScreen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen]);

  useEffect(() => {
    if (!modal.isOpen) {
      setActiveScreen(undefined);
    }
  }, [modal.isOpen]);

  return {
    open: () => {
      modal.open(getScreen(activeScreen || 'AccountList'));
    },
  };
}
