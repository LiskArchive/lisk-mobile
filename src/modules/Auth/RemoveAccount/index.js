import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Stepper from 'components/shared/Stepper';
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
    <Stepper currentIndex={0}>
      <DeleteAccount />
      <RemoveAccountConfirmation onContinue={deleteAccount} />
    </Stepper>
  );
};

export default RemoveAccount;
