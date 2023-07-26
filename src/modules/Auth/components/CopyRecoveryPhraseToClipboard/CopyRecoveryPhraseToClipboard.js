import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
// import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P, B, A } from 'components/shared/toolBox/typography';
import DropDownHolder from 'utilities/alert';
import { colors } from 'constants/styleGuide';
import URLs from 'constants/URLs';
import CopySvg from 'assets/svgs/CopySvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';

import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
import getStyles from './CopyRecoveryPhraseToClipboard.styles';

export default function CopyRecoveryPhraseToClipboard({ recoveryPhrase }) {
  const [copied, handleCopy] = useCopyToClipboard(recoveryPhrase, { autoCleanup: true });

  const { styles } = useTheme({ styles: getStyles() });

  const handleOpenSecurityLink = () =>
    Linking.openURL(URLs.recoveryPhraseSecurityDocs).catch(() =>
      DropDownHolder.error('Error', 'Error opening link. Please try again later.')
    );

  return (
    <View style={[styles.container, styles.theme.container]}>
      <P style={[styles.description, styles.theme.description]}>
        Writing it down is more{' '}
        <A onPress={handleOpenSecurityLink} style={[styles.link, styles.theme.link]}>
          secure
        </A>{' '}
        than copying.
      </P>

      <TouchableOpacity style={[styles.copyTextContainer]} onPress={handleCopy}>
        <B style={[styles.copyText]}>{copied ? 'Copied' : 'Copy'}</B>

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
