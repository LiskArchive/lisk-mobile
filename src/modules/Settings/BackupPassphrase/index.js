import React from 'react';
import MultiStep from 'components/shared/multiStep';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import { useCurrentAccount, useAccountInfo } from 'modules/Accounts/hooks/useAccounts';
import Confirm from 'modules/Auth/Register/confirm';
import PasswordSetupSuccess from 'modules/Auth/PasswordSetupSuccess';

const BackupPassphrase = ({ navigation }) => {
  const [account] = useCurrentAccount();
  const { summary } = useAccountInfo();

  return (
    <MultiStep showNav={false} currentIndex={0}>
      <DecryptPhrase
        account={summary}
        route={{
          params: {
            address: summary.address,
            title: 'settings.backup_phrase.title',
          },
        }}
        navigation={navigation}
      />
      <PassphraseBackup navigation={navigation} />
      <Confirm navigation={navigation} customHeader={true} />
      <PasswordSetupSuccess encryptedJson={account} onContinue={navigation.goBack} />
    </MultiStep>
  );
};

export default BackupPassphrase;
