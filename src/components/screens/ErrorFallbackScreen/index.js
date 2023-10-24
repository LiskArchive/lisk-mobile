/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import i18next from 'i18next';

import { useEmailReport } from 'hooks/useEmailReport';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import { H4, P } from 'components/shared/toolBox/typography';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';

import { getErrorFallbackScreenStyles } from './styles';

/**
 * Renders an Error UI as fallback screen when a provided error occurs.
 * @param {Error} props.error - Error instance to handle with this component.
 * @param {Function} props.onRetry - Callback to trigger when user retries the error
 * triggering action.
 * @param {String} props.title - Optional text to display as title. If it's
 * not provided, a default title will be rendered.
 * @param {String} props.description - Optional text to display as description. If it's
 * not provided, a default description will be rendered.
 */
export default function ErrorScreen(props) {
  const { styles } = useTheme({ styles: getErrorFallbackScreenStyles() });

  const title = props.title || i18next.t('fallbackScreens.error.title');
  const description =
    typeof props.error === 'string'
      ? props.error
      : props.description || i18next.t('fallbackScreens.error.description');

  const handleRetryClick = props.onRetry;

  const emailReport = useEmailReport({ error: props.error, errorMessage: description });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.body]}>
        <View style={[styles.illustration]}>
          <ErrorIllustrationSvg />
        </View>

        <H4 style={[styles.title, styles.theme.title]}>{title}</H4>

        <P style={[styles.description, styles.theme.description]}>{description}</P>

        {handleRetryClick && (
          <PrimaryButton noTheme style={[styles.submitButton]} onClick={handleRetryClick}>
            {i18next.t('fallbackScreens.error.retryButton')}
          </PrimaryButton>
        )}

        {!emailReport.isLoading && !emailReport.error && (
          <>
            <P style={[styles.label]}>{i18next.t('fallbackScreens.error.emailReportLabel')}</P>

            <LabelButton onClick={emailReport.handleSend}>
              {i18next.t('fallbackScreens.error.emailReportButton')}
            </LabelButton>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
