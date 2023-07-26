import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import CopyToClipboard from 'components/shared/CopyToClipboard/CopyToClipboard';
import { B } from 'components/shared/toolBox/typography';

import getStyles from './CopyRecoveryPhraseToClipboard.styles';

export default function CopyRecoveryPhraseToClipboard({ recoveryPhrase }) {
  const { styles } = useTheme({
    styles: getStyles(),
  });

  return (
    <View>
      <CopyToClipboard
        label={i18next.t('commons.copyToClipboard')}
        value={recoveryPhrase}
        type={B}
        style={styles.copyTextContainer}
        labelStyle={styles.copyText}
        autoCleanup
      />
    </View>
  );
}
