import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';

import getCopyRecoveryPhraseToClipboardStyles from './CopyRecoveryPhraseToClipboard.styles';

export default function CopyRecoveryPhraseToClipboard({ recoveryPhrase }) {
  const { styles } = useTheme({
    styles: getCopyRecoveryPhraseToClipboardStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <P style={styles.theme.recoveryPhraseTitle}>
        {i18next.t('settings.backupPhrase.storePhrase')}
      </P>

      <P style={[styles.recoveryPhrase, styles.theme.recoveryPhrase]}>{recoveryPhrase}</P>

      <CopyToClipboard
        style={styles.copyContainer}
        labelStyle={[styles.copy, styles.theme.copy]}
        iconStyle={styles.theme.copy}
        label={i18next.t('commons.copyToClipboard')}
        showIcon={true}
        iconSize={14}
        value={recoveryPhrase}
        type={P}
      />
    </View>
  );
}
