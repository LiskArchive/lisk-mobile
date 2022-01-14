import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { translate } from 'react-i18next';
import { P } from '../../shared/toolBox/typography';
import withTheme from '../../shared/withTheme';
import HeaderBackButton from '../router/headerBackButton';
import getStyles from './styles';
import InfoComponent from '../../shared/infoComponent';

const MultiSignature = ({ t, styles, navigation }) => (
  <SafeAreaView style={styles.theme.container}>
    <HeaderBackButton
      noIcon
      title="Multisignature account details"
      onRightPress={navigation.goBack}
      rightIcon={'cross'}
    />
    <View style={[styles.container]}>
      <P style={[styles.copy, styles.theme.copy]}>{t('multisignature.copy1')}</P>
      <P style={[styles.copy, styles.theme.copy]}>{t('multisignature.copy2')}</P>
      <InfoComponent
        text={t('multisignature.info.copy')}
        buttonText={t('multisignature.info.button')}
      />
    </View>
  </SafeAreaView>
);

export default withTheme(translate()(MultiSignature), getStyles());
