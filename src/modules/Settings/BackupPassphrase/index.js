import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MultiStep from 'components/shared/multiStep';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import { useCurrentAccount, useAccountInfo } from 'modules/Accounts/hooks/useAccounts';
import Confirm from 'modules/Auth/Register/confirm';
import PasswordSetupSuccess from 'modules/Auth/PasswordSetupSuccess';
import { SafeAreaView } from 'react-native-safe-area-context';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const BackupPassphrase = ({ styles }) => {
  const [account] = useCurrentAccount();
  const { summary } = useAccountInfo();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} >
    <MultiStep currentIndex={0}>
      <DecryptPhrase
        account={summary}
        route={{
          params: {
            address: summary.address,
            title: 'settings.backup_phrase.title',
          },
        }}
      />
      <PassphraseBackup />
      <Confirm customHeader />
      <PasswordSetupSuccess encryptedJson={account} onContinue={navigation.goBack} />
    </MultiStep>
    </SafeAreaView>
  );
};

export default withTheme(BackupPassphrase, getStyles());
