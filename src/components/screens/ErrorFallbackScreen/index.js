/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, SafeAreaView } from 'react-native';

import { useEmailReport } from 'hooks/useEmailReport';
import { useTheme } from 'contexts/ThemeContext';
import Splash from 'modules/Auth/components/splash';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';

import { getErrorFallbackScreenStyles, errorFallbackSplashStyles } from './styles';

/**
 * Renders an Error UI as fallback screen when a provided error occurs.
 * @param {Error} props.error - Error instance to handle with this component.
 * @param {Function} props.onRetry - Callback to trigger when user retries the error
 * triggering action.
 */
export default function ErrorFallbackScreen({ error, onRetry }) {
  const errorMessage = error?.message || 'Error running app';

  const emailReport = useEmailReport({ error, errorMessage });

  const { styles } = useTheme({ styles: getErrorFallbackScreenStyles() });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <Splash animate={false} showSimplifiedView={true} style={errorFallbackSplashStyles} />

      <View style={[styles.body]}>
        <View style={[styles.illustration]}>
          <ErrorIllustrationSvg />
        </View>

        <P style={[styles.description, styles.theme.description]}>{errorMessage}</P>

        <P style={[styles.description, styles.theme.description]}>
          You can restart the app or if you still can't sign in please report the error via mail.
        </P>

        <PrimaryButton
          noTheme
          style={[styles.submitButton]}
          onClick={onRetry}
          // disabled={disabled}
        >
          Retry
        </PrimaryButton>

        {emailReport.error && (
          <>
            <P style={[styles.label]}>Is the problem persisting?</P>

            <LabelButton onClick={emailReport.handleSend} disabled={emailReport.isLoading}>
              Report the error via email
            </LabelButton>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
