import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';

import getCopyRecoveryPhraseToClipboardStyles from './CopyCryptoToClipboard.styles';

export default function CopyCryptoToClipboard({ crypto }) {
  const { styles } = useTheme({
    styles: getCopyRecoveryPhraseToClipboardStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <P style={styles.theme.recoveryPhraseTitle}>
        {i18next.t('settings.backupPhrase.storePhrase')}
      </P>

      <P style={[styles.crypto, styles.theme.crypto]}>{crypto}</P>

      <CopyToClipboard
        style={styles.copyContainer}
        labelStyle={[styles.copy, styles.theme.copy]}
        iconStyle={styles.theme.copy}
        label={i18next.t('commons.copyToClipboard')}
        showIcon={true}
        iconSize={14}
        value={crypto}
        type={P}
      />
    </View>
  );
}
