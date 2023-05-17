import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import DecryptRecoveryPhrase from '../DecryptRecoveryPhrase/DecryptRecoveryPhrase';

import getStyles from './DecryptRecoveryPhraseScreen.styles';

/**
 * Renders an decrypt recoveryPhrase screen details screen given an encryptedData.
 */
export default function DecryptRecoveryPhraseScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: getStyles() });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <DecryptRecoveryPhrase route={route} navigation={navigation} style={{ form: styles.form }} />
    </SafeAreaView>
  );
}
