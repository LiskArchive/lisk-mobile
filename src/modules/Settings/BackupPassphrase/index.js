import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Stepper from 'components/shared/Stepper';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import RegisterConfirm from 'modules/Auth/Register/RegisterConfirm';
import PasswordSetupSuccess from 'modules/Auth/PasswordSetupSuccess';
import { SafeAreaView } from 'react-native-safe-area-context';
import withTheme from 'components/shared/withTheme';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import getStyles from './styles';

const BackupPassphrase = ({ styles, route }) => {
  useScreenshotPrevent();
  const navigation = useNavigation();

  const { account } = route.params;

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Stepper currentIndex={0}>
        <DecryptPhrase
          account={account}
          route={{
            params: {
              address: account.metadata.address,
              title: 'settings.backup_phrase.title',
            },
          }}
        />
        <PassphraseBackup />
        <RegisterConfirm customHeader />
        <PasswordSetupSuccess encryptedJson={account} onContinue={navigation.goBack} />
      </Stepper>
    </SafeAreaView>
  );
};

export default withTheme(BackupPassphrase, getStyles());
