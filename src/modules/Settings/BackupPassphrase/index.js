import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Stepper from 'components/shared/Stepper';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccountInfo';
import RegisterConfirm from 'modules/Auth/Register/RegisterConfirm';
import PasswordSetupSuccess from 'modules/Auth/PasswordSetupSuccess';
import { SafeAreaView } from 'react-native-safe-area-context';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';
import SecureView from '../../../components/shared/SecureView';

const BackupPassphrase = ({ styles }) => {
  const [account] = useCurrentAccount();
  const { summary } = useAccountInfo();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <SecureView>
        <Stepper currentIndex={0}>
          <DecryptPhrase
            account={account}
            route={{
              params: {
                address: summary.address,
                title: 'settings.backup_phrase.title',
              },
            }}
          />
          <PassphraseBackup />
          <RegisterConfirm customHeader />
          <PasswordSetupSuccess encryptedJson={account} onContinue={navigation.goBack} />
        </Stepper>
      </SecureView>
    </SafeAreaView>
  );
};

export default withTheme(BackupPassphrase, getStyles());
