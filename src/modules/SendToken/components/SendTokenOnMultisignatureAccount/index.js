import React from 'react';
import {
  View, TouchableOpacity, Linking
} from 'react-native';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { B, P } from 'components/shared/toolBox/typography';
import SendLSKIllustrationSvg from 'assets/svgs/SendLSKIllustrationSvg';

import { getSendTokenOnMultisignatureAccountStyles } from './styles';

function SendTokenOnMultisignatureAccount({ t }) {
  const { styles } = useTheme({
    styles: getSendTokenOnMultisignatureAccountStyles(),
  });

  return (
    <View style={[styles.container]}>
      <SendLSKIllustrationSvg style={{ marginBottom: 16 }}/>

      <P style={styles.theme.copy}>{t('multisignature.send.description')}</P>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Linking.openURL('https://lisk.com/wallet')}
      >
        <B style={[styles.button, styles.theme.button]}>
          {t('multisignature.send.button')}
        </B>
      </TouchableOpacity>
  </View>
  );
}

export default translate()(SendTokenOnMultisignatureAccount);
