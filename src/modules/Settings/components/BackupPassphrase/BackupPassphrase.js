import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import PasswordSetupSuccess from 'modules/Auth/components/PasswordSetupSuccess';
import DecryptPassphrase from 'modules/Auth/components/DecryptPassphrase/DecryptPassphrase';
import PassphraseQuiz from 'modules/Auth/components/PassphraseQuiz/PassphraseQuiz';
import Stepper from 'components/shared/Stepper';

import getStyles from './BackupPassphrase.styles';
import CopyPassphrase from './components/CopyPassphrase';

export default function BackupPassphrase() {
  const navigation = useNavigation();

  const route = useRoute();

  const { account } = route.params;

  const { styles } = useTheme({ styles: getStyles() });

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Stepper currentIndex={0}>
        <DecryptPassphrase
          account={account}
          route={{
            params: {
              address: account.metadata.address,
              title: 'settings.backupPhrase.title',
            },
          }}
        />

        <CopyPassphrase />

        <PassphraseQuiz customHeader />

        <PasswordSetupSuccess
          route={{
            params: {
              encryptedAccount: account,
              onContinue: () => navigation.navigate('AccountHome'),
            },
          }}
        />
      </Stepper>
    </SafeAreaView>
  );
}
