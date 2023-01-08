import React from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';

import { useEmailReport } from 'hooks/useEmailReport';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import TxErrorSvg from 'assets/svgs/TxErrorSvg';

import { getSignTransactionErrorStyles } from './styles';

export default function SignTransactionError({ onClick, error, actionButton }) {
  const emailReport = useEmailReport({ error, errorMessage: 'Error sending token' });

  const { styles } = useTheme({
    styles: getSignTransactionErrorStyles(),
  });

  const errorMessage = error instanceof Error && error.message;

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={styles.illustrationContainer}>
        <TxErrorSvg />
      </View>

      <Text style={[styles.title, styles.theme.title]}>
        {i18next.t('sendToken.result.error.title')}
      </Text>

      {errorMessage ? (
        <Text style={[styles.description, styles.theme.description]}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={[styles.description, styles.theme.description]}>
            {i18next.t('sendToken.result.error.description1')}
          </Text>

          <Text style={[styles.description, styles.theme.description]}>
            {i18next.t('sendToken.result.error.description2')}
          </Text>
        </>
      )}

      {actionButton || (
        <PrimaryButton
          onClick={onClick}
          title={i18next.t('sendToken.result.error.retryButtonText')}
          style={[styles.tryAgainButton]}
        />
      )}

      <Text style={[styles.actionLabel, styles.theme.actionLabel]}>
        {i18next.t('sendToken.result.error.reportErrorLabel')}
      </Text>

      <LabelButton
        onClick={emailReport.handleSend}
        disabled={emailReport.isLoading || emailReport.error}
      >
        {i18next.t('sendToken.result.error.reportErrorButtonText')}
      </LabelButton>
    </View>
  );
}
