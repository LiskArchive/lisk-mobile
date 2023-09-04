import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { H4, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import SwitchButton from 'components/shared/toolBox/switchButton';
import CopyRecoveryPhraseToClipboard from 'components/shared/CopyRecoveryPhraseToClipboard/CopyRecoveryPhraseToClipboard';

import getRegisterSafeKeepingStyles from './RecoveryPhraseSafeKeepingScreen.styles';
import RecoveryPhraseSecurityAdviceCard from '../../RecoveryPhraseSecurityAdviceCard/RecoveryPhraseSecurityAdviceCard';

export default function RecoveryPhraseSafeKeepingScreen({
  recoveryPhrase,
  prevStep,
  nextStep,
  showHeader,
  currentIndex,
  length,
}) {
  const [confirmed, setConfirmed] = useState(false);

  const { styles } = useTheme({
    styles: getRegisterSafeKeepingStyles(),
  });

  const handleConfirm = (status) => setConfirmed(status);

  const handleContinuePress = () => nextStep({ recoveryPhrase });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      {showHeader && (
        <HeaderBackButton
          title={'auth.register.title'}
          onPress={prevStep}
          withProgressBar
          currentIndex={currentIndex}
          length={length}
        />
      )}
      <View style={[styles.body]}>
        <H4 style={[styles.title, styles.theme.title]}>
          {i18next.t('auth.register.safeKeeping.title')}
        </H4>

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.register.safeKeeping.description')}
        </P>

        <View style={styles.recoveryPhraseContainer}>
          <RecoveryPhraseSecurityAdviceCard style={{ container: styles.securityAdviceCard }} />

          <P
            style={[styles.recoveryPhraseText, styles.theme.recoveryPhraseText]}
            testID="recoveryPhraseText"
          >
            {recoveryPhrase.replace(/\s+/g, '  ')}
          </P>

          <CopyRecoveryPhraseToClipboard recoveryPhrase={recoveryPhrase} />
        </View>
      </View>

      <View style={[styles.footer]}>
        <View style={[styles.switchContainer]}>
          <SwitchButton
            testID="understandResponsibilitySwitch"
            height={26}
            width={43}
            onChange={handleConfirm}
            value={confirmed}
          />
          <P style={[styles.confirmText]}>
            {i18next.t('auth.register.safeKeeping.understandResponsibilityDescription')}
          </P>
        </View>

        <View>
          <PrimaryButton
            disabled={!confirmed}
            testID="safeKeepingButton"
            style={styles.button}
            onPress={handleContinuePress}
          >
            {i18next.t('auth.register.safeKeeping.continueButtonText')}
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
