import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';

import { getRecoveryPhraseSecurityAdviceCardStyles } from './RecoveryPhraseSecurityAdviceCard.styles';

export default function RecoveryPhraseSecurityAdviceCard({ style }) {
  const { styles } = useTheme({
    styles: getRecoveryPhraseSecurityAdviceCardStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>
      <P style={[styles.description, styles.theme.description, style?.description]}>
        {i18next.t('commons.recoveryPhrase.writeDownInstructions')}
      </P>
    </View>
  );
}
