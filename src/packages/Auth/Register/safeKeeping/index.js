import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Switch from 'react-native-switch-pro';
import { B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'navigation/headerBackButton';
import { colors } from 'constants/styleGuide';
import styles from './styles';

const SafeKeeping = ({
  t,
  sharedData: { passphrase }, navigation, prevStep, nextStep
}) => {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const { setOptions } = navigation;
    setOptions({
      headerLeft: props => <HeaderBackButton {...props} onPress={prevStep} />,
      title: t('Your passphrase'),
    });
  }, []);

  const confirm = status => {
    setConfirmed(status);
  };

  const forward = () => {
    nextStep({
      passphrase,
    });
  };

  return <SafeAreaView style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.passphraseContainer}>
          <P style={styles.passphraseTitle}>
            {t('Store your passphrase carefully')}
          </P>
          <Text style={styles.passphrase} testID="passphraseText">
            {passphrase.replace(/\s+/g, '  ')}
          </Text>
          <CopyToClipboard
            style={styles.copyContainer}
            labelStyle={styles.copy}
            iconStyle={styles.copy}
            label={t('Copy to clipboard')}
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
            onSyncPress={confirm}
            backgroundActive={colors.light.ultramarineBlue}
            backgroundInactive={colors.light.platinum}
          />
          <P style={styles.confirmText}>
            {t(
              'I understand that it’s my responsibility to keep my passphrase safe.'
            )}
          </P>
        </View>
        <View>
          <PrimaryButton
            disabled={!confirmed}
            testID="safeKeepingButton"
            style={styles.button}
            noTheme={true}
            onClick={forward}
            title={t('I wrote it down')}
          />
        </View>
      </View>
    </View>
  </SafeAreaView>;
};

export default translate()(SafeKeeping);
