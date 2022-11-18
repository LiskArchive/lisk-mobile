import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import i18next from 'i18next';
import Switch from 'react-native-switch-pro';
import { useNavigation } from '@react-navigation/native';

import { H4, B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { colors } from 'constants/styleGuide';

import styles from './styles';

export default function RegisterSafeKeeping({
  passphrase,
  prevStep,
  nextStep,
  setShowProgressBar,
}) {
  const navigation = useNavigation();

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={prevStep} title={i18next.t('auth.register.title')} />
      ),
      title: null,
    });

    setShowProgressBar(true);
  }, [navigation, prevStep, setShowProgressBar]);

  const handleConfirm = (status) => setConfirmed(status);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.body}>
        <H4 style={styles.title}>{i18next.t('auth.register.safeKeeping.title')}</H4>

        <P style={styles.passphraseTitle}>{i18next.t('auth.register.safeKeeping.description')}</P>

        <View style={styles.passphraseContainer}>
          <Text style={styles.passphrase} testID="passphraseText">
            {passphrase.replace(/\s+/g, '  ')}
          </Text>

          <CopyToClipboard
            style={styles.copyContainer}
            labelStyle={styles.copy}
            iconStyle={styles.copy}
            label={i18next.t('commons.copyToClipboard')}
            showIcon={true}
            iconSize={14}
            value={passphrase}
            type={B}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.switchContainer}>
          <Switch
            testID="understandResponsibilitySwitch"
            height={26}
            width={43}
            onSyncPress={handleConfirm}
            backgroundActive={colors.light.ultramarineBlue}
            backgroundInactive={colors.light.platinum}
          />

          <P style={styles.confirmText}>
            {i18next.t('auth.register.safeKeeping.understandResponsibilityDescription')}
          </P>
        </View>

        <View>
          <PrimaryButton
            disabled={!confirmed}
            testID="safeKeepingButton"
            style={styles.button}
            noTheme={true}
            onClick={nextStep}
          >
            {i18next.t('auth.register.safeKeeping.continueButtonText')}
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
