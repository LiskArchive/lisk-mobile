import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';

import getCopyPassphraseToClipboardStyles from './CopyPassphraseToClipboard.styles';

export default function CopyPassphraseToClipboard({ passphrase }) {
  const { styles } = useTheme({
    styles: getCopyPassphraseToClipboardStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <P style={styles.theme.passphraseTitle}>{i18next.t('settings.backupPhrase.storePhrase')}</P>

      <P style={[styles.passphrase, styles.theme.passphrase]}>{passphrase}</P>

      <CopyToClipboard
        style={styles.copyContainer}
        labelStyle={[styles.copy, styles.theme.copy]}
        iconStyle={styles.theme.copy}
        label={i18next.t('commons.copyToClipboard')}
        showIcon={true}
        iconSize={14}
        value={passphrase}
        type={P}
      />
    </View>
  );
}
