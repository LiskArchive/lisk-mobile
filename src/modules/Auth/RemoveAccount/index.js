import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MultiStep from 'components/shared/multiStep';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import Confirm from 'modules/Auth/Register/confirm';
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
      <DecryptPhrase
        route={{
          params: {
            title: 'auth.setup.remove_account',
          },
        }}
      />
      <PassphraseBackup />
      <Confirm customHeader />
      <RemoveAccountConfirmation onContinue={deleteAccount} />
    </MultiStep>
  );
};

export default RemoveAccount;
