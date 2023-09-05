import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { B } from 'components/shared/toolBox/typography';
import { colors } from 'constants/styleGuide';
import CopySvg from 'assets/svgs/CopySvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';

import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
import getStyles from './CopyRecoveryPhraseToClipboard.styles';

export default function CopyRecoveryPhraseToClipboard({ recoveryPhrase }) {
  const [copied, handleCopy] = useCopyToClipboard(recoveryPhrase, { autoCleanup: true });

  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.copyTextContainer]} onPress={handleCopy}>
        <B style={[styles.copyText]}>
          {copied ? i18next.t('commons.copied') : i18next.t('commons.copy')}
        </B>

        <TouchableOpacity onPress={handleCopy} style={[styles.icon]}>
          {copied ? (
            <CircleCheckedSvg
              variant="fill"
              color={colors.light.ultramarineBlue}
              height={12}
              width={12}
            />
          ) : (
            <CopySvg
              variant="outline"
              color={colors.light.ultramarineBlue}
              height={12}
              width={12}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
