import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { Small } from '../../../../toolBox/typography';
import { PrimaryButton } from '../../../../toolBox/button';
import Icon from '../../../../toolBox/icon';
import withTheme from '../../../../withTheme';
import getStyles from './styles';
import { tokenMap } from '../../../../../constants/tokens';
import { colors } from '../../../../../constants/styleGuide';

const IntroModal = ({
  close, styles, t, theme,
}) => (
  <View style={styles.container}>
    <View style={[styles.tokenLogoWrapper, styles.theme.tokenLogoWrapper]}>
      <Icon
        style={styles.logo}
        name={tokenMap.BTC.icon}
        size={30}
        color={colors[theme].white}
      />
    </View>
    <Small style={[styles.text, styles.theme.text]}>
      {t('Lisk Mobile now supports Bitcoin (BTC).')}
    </Small>
    <PrimaryButton
      style={styles.actionButton}
      onClick={close}
      title={t('Got it!')}
    />
  </View>
);

export default withTheme(translate()(IntroModal), getStyles());
