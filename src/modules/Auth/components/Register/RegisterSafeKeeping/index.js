import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import i18next from 'i18next';
import Switch from 'react-native-switch-pro';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { H4, B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { colors } from 'constants/styleGuide';

import getRegisterSafeKeepingStyles from './styles';

export default function RegisterSafeKeeping({ passphrase, nextStep, setShowProgressBar }) {
  const navigation = useNavigation();

  const [confirmed, setConfirmed] = useState(false);

  const { styles } = useTheme({
    styles: getRegisterSafeKeepingStyles(),
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={navigation.goBack}
          title={i18next.t('auth.register.title')}
        />
      ),
      title: null,
    });

    setShowProgressBar(true);
  }, [navigation, setShowProgressBar]);

  const handleConfirm = (status) => setConfirmed(status);

  const onContinue = () => nextStep({ passphrase });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.body]}>
        <H4 style={[styles.title, styles.theme.title]}>
          {i18next.t('auth.register.safeKeeping.title')}
        </H4>

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.register.safeKeeping.description')}
        </P>

        <View style={styles.passphraseContainer}>
          <Text
            style={[styles.passphraseText, styles.theme.passphraseText]}
            testID="passphraseText"
          >
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

      <View style={[styles.footer]}>
        <View style={[styles.switchContainer]}>
          <Switch
            testID="understandResponsibilitySwitch"
            height={26}
            width={43}
            onSyncPress={handleConfirm}
            backgroundActive={colors.light.ultramarineBlue}
            backgroundInactive={colors.light.platinum}
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
            noTheme={true}
            onClick={onContinue}
          >
            {i18next.t('auth.register.safeKeeping.continueButtonText')}
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
