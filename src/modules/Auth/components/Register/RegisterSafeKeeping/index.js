import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { H4, B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import SwitchButton from 'components/shared/toolBox/switchButton';

import getRegisterSafeKeepingStyles from './styles';

export default function RegisterSafeKeeping({
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
          <Text
            style={[styles.recoveryPhraseText, styles.theme.recoveryPhraseText]}
            testID="recoveryPhraseText"
          >
            {recoveryPhrase.replace(/\s+/g, '  ')}
          </Text>

          <CopyToClipboard
            style={styles.copyContainer}
            labelStyle={styles.copy}
            iconStyle={styles.copy}
            label={i18next.t('commons.copyToClipboard')}
            showIcon={true}
            iconSize={14}
            value={recoveryPhrase}
            type={B}
          />
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
