import React from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import TxErrorSvg from 'assets/svgs/TxErrorSvg';

import getSendTokenErrorStyles from './styles';

export default function SendTokenError({ onClick }) {
  const { styles } = useTheme({
    styles: getSendTokenErrorStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.body]}>
        <View style={styles.illustrationContainer}>
          <TxErrorSvg />
        </View>

        <Text style={[styles.title, styles.theme.title]}>
          {i18next.t('sendToken.result.error.title')}
        </Text>

        <Text style={[styles.subtitle, styles.theme.subtitle]}>
          {i18next.t('sendToken.result.error.description')}
        </Text>
      </View>

      <View>
        <PrimaryButton
          onClick={onClick}
          title={i18next.t('sendToken.result.error.retryButtonText')}
          style={[styles.tryAgainButton]}
        />

        <Text style={[styles.actionLabel, styles.theme.actionLabel]}>
          {i18next.t('sendToken.result.error.reportErrorLabel')}
        </Text>

        <LabelButton
          onClick={() => console.log('report error via email...')}
          textStyle={{ fontSize: 14, lineHeight: 0, marginBottom: 24 }}
        >
          {i18next.t('sendToken.result.error.reportErrorButtonText')}
        </LabelButton>
      </View>
    </View>
  );
}
