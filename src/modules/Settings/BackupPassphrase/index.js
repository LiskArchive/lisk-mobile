import React from 'react';
import { useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import Stepper from 'components/shared/Stepper';
import PassphraseBackup from 'components/screens/passphraseBackup';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import RegisterConfirm from 'modules/Auth/Register/RegisterConfirm';
import { SafeAreaView } from 'react-native-safe-area-context';

import getStyles from './styles';

export default function BackupPassphrase() {
  const route = useRoute();

  const { account } = route.params;

  const { styles } = useTheme({
    styles: getStyles(),
  });

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Stepper currentIndex={0}>
        <DecryptPhrase
          account={account}
          route={{
            params: {
              address: account.metadata.address,
              title: 'settings.backupPhrase.title',
            },
          }}
        />

        <PassphraseBackup />

        <RegisterConfirm account={account} customHeader />
      </Stepper>
    </SafeAreaView>
  );
}
