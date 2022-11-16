import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Switch from 'react-native-switch-pro';
import { useNavigation } from '@react-navigation/native';

import { B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { colors } from 'constants/styleGuide';

import styles from './styles';

export default function RegisterSafeKeeping({ passphrase, prevStep, nextStep }) {
  const navigation = useNavigation();

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={prevStep} />,
      title: i18next.t('Your passphrase'),
    });
  }, [navigation, prevStep]);

  const handleConfirm = (status) => setConfirmed(status);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.passphraseContainer}>
            <P style={styles.passphraseTitle}>{i18next.t('Store your passphrase carefully')}</P>

            <Text style={styles.passphrase} testID="passphraseText">
              {passphrase.replace(/\s+/g, '  ')}
            </Text>

            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={styles.copy}
              iconStyle={styles.copy}
              label={i18next.t('Copy to clipboard')}
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
              {i18next.t('I understand that it’s my responsibility to keep my passphrase safe.')}
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
              {i18next.t('I wrote it down')}
            </PrimaryButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
