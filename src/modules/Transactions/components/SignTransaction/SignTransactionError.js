import React from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';

import { useEmailReport } from 'hooks/useEmailReport';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import { H3, P } from 'components/shared/toolBox/typography';
import TxErrorSvg from 'assets/svgs/TxErrorSvg';

import { getSignTransactionErrorStyles } from './styles';

export default function SignTransactionError({
  onClick,
  error,
  title,
  description,
  actionButton,
  secondaryButton,
}) {
  const emailReport = useEmailReport({ error, errorMessage: 'Error sending token' });

  const { styles } = useTheme({
    styles: getSignTransactionErrorStyles(),
  });

  const errorMessage = error instanceof Error && error.message;

  const renderDescription = () => {
    if (description) {
      return <P style={[styles.description, styles.theme.description]}>{description}</P>;
    }

    if (errorMessage) {
      return <P style={[styles.description, styles.theme.description]}>{errorMessage}</P>;
    }

    return (
      <>
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('sendToken.result.error.description1')}
        </P>

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('sendToken.result.error.description2')}
        </P>
      </>
    );
  };

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={styles.illustrationContainer}>
        <TxErrorSvg />
      </View>

      <H3 style={[styles.title, styles.theme.title]}>
        {title || i18next.t('sendToken.result.error.title')}
      </H3>

      {renderDescription()}

      {actionButton || (
        <PrimaryButton
          onClick={onClick}
          title={i18next.t('sendToken.result.error.retryButtonText')}
          style={[styles.tryAgainButton]}
        />
      )}

      {secondaryButton}

      <Text style={[styles.actionLabel, styles.theme.actionLabel]}>
        {i18next.t('sendToken.result.error.reportErrorLabel')}
      </Text>

      <LabelButton
        onClick={emailReport.handleSend}
        disabled={emailReport.isLoading || emailReport.error}
        isLoading={emailReport.isLoading}
      >
        {i18next.t('sendToken.result.error.reportErrorButtonText')}
      </LabelButton>
    </View>
  );
}
