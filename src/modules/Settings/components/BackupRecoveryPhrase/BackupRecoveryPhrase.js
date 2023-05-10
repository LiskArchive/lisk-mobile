import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import PasswordSetupSuccess from 'modules/Auth/components/PasswordSetupSuccess';
import DecryptRecoveryPhrase from 'modules/Auth/components/DecryptRecoveryPhrase/DecryptRecoveryPhrase';
import RecoveryPhraseQuiz from 'modules/Auth/components/RecoveryPhraseQuiz/RecoveryPhraseQuiz';
import Stepper from 'components/shared/Stepper';

import getStyles from './BackupRecoveryPhrase.styles';
import CopyRecoveryPhrase from './components/CopyRecoveryPhrase';

export default function BackupRecoveryPhrase() {
  const navigation = useNavigation();

  const route = useRoute();

  const { account } = route.params;

  const { styles } = useTheme({ styles: getStyles() });

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Stepper currentIndex={0}>
        <DecryptRecoveryPhrase
          account={account}
          route={{
            params: {
              address: account.metadata.address,
              title: 'settings.backupPhrase.title',
            },
          }}
          navigation={navigation}
        />
        <CopyRecoveryPhrase />
        <RecoveryPhraseQuiz customHeader />
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
