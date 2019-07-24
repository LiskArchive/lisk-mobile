import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

const PassphraseCopy = ({ styles, passphrase, t }) => (
  <View style={[styles.wrapper, styles.theme.wrapper]}>
    <P style={styles.theme.passphraseTitle}>
      {t('Store your passphrase:')}
    </P>

    <P style={[styles.passphrase, styles.theme.passphrase]}>
      {passphrase}
    </P>

    <CopyToClipboard
      style={styles.copyContainer}
      labelStyle={[styles.copy, styles.theme.copy]}
      iconStyle={styles.theme.copy}
      label={t('Copy to clipboard')}
      showIcon={true}
      iconSize={14}
      value={passphrase}
      type={P}
    />
  </View>
);

export default withTheme(translate()(PassphraseCopy), getStyles());
