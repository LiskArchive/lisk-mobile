/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, SafeAreaView } from 'react-native';

import { useEmailReport } from 'hooks/useEmailReport';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import Splash from 'modules/Auth/components/splash';

import getStyles from './styles';

export default function ApplicationErrorScreen({ error }) {
  const emailReport = useEmailReport({ error, errorMessage: 'Error initializing account' });

  const { styles } = useTheme({ styles: getStyles() });

  const handleRestartAppClick = () => {
    console.log('restarting...');
  };

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <Splash animate={false} showSimplifiedView={true} style={{ container: { marginTop: 40 } }} />

      <View style={[styles.body]}>
        <View style={[styles.illustration]}>
          <ErrorIllustrationSvg />
        </View>

        <P style={[styles.description, styles.theme.description]}>
          We can't sign in to your account at the moment. You can restart the app or if you still
          can't sign in please report the error via mail.
        </P>

        <PrimaryButton
          noTheme
          style={[styles.submitButton]}
          onClick={handleRestartAppClick}
          // disabled={disabled}
        >
          Restart app
        </PrimaryButton>

        <P style={[styles.label]}>Is the problem persisting?</P>

        <LabelButton
          onClick={emailReport.handleSend}
          disabled={emailReport.isLoading || emailReport.error}
        >
          Report the error via email
        </LabelButton>
      </View>
    </SafeAreaView>
  );
}
