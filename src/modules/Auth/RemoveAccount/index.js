import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MultiStep from 'components/shared/__MultiStep';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import DeleteAccount from '../DeleteAccount';
import RemoveAccountConfirmation from '../RemoveAccountConfirmation';

const RemoveAccount = () => {
  const { deleteAccountByAddress } = useAccounts();
  const navigation = useNavigation();

  const deleteAccount = (acc) => {
    deleteAccountByAddress(acc.metadata.address);
    navigation.goBack();
  };

  return (
    <MultiStep currentIndex={0}>
      <DeleteAccount />
      <RemoveAccountConfirmation onContinue={deleteAccount} />
    </MultiStep>
  );
};

export default RemoveAccount;
