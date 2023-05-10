import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import QRCode from 'react-native-qrcode-svg';

import { themes, colors } from 'constants/styleGuide';
import { useTheme } from 'contexts/ThemeContext';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { PrimaryButton } from 'components/shared/toolBox/button';
import CopyRecoveryPhraseToClipboard from 'components/shared/CopyRecoveryPhraseToClipboard/CopyRecoveryPhraseToClipboard';
import { P, A } from 'components/shared/toolBox/typography';
import HeaderBackButton from 'components/navigation/headerBackButton';

import { getCopyRecoveryPhraseStyles } from './CopyRecoveryPhrase.styles';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.MD;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

export default function CopyRecoveryPhrase({ sharedData: data, nextStep }) {
  const [recoveryPhraseRevealed, setRecoveryPhraseRevealed] = useState(false);

  const navigation = useNavigation();

  const { styles, theme } = useTheme({
    styles: getCopyRecoveryPhraseStyles(),
  });

  const toggleQRCode = () => {
    setRecoveryPhraseRevealed(!recoveryPhraseRevealed);
  };

  const nextScreen = () => {
    nextStep({ recoveryPhrase: data.recoveryPhrase });
  };

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('settings.backupPhrase.title')}
        onPress={navigation.goBack}
      />

      <ScrollView style={styles.body}>
        <CopyRecoveryPhraseToClipboard recoveryPhrase={data.recoveryPhrase} />

        <View style={styles.row}>
          <P style={[styles.qrText, styles.theme.text]}>{i18next.t('Private use only')}</P>

          <A style={styles.button} onPress={toggleQRCode}>
            {recoveryPhraseRevealed ? i18next.t('Hide QR code') : i18next.t('Show QR code')}
          </A>
        </View>

        {recoveryPhraseRevealed && (
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={data.recoveryPhrase}
              size={qrCodeSize}
              color={theme === themes.light ? colors.light.black : colors.dark.white}
              backgroundColor={
                theme === themes.light ? colors.light.white : colors.dark.maastrichtBlue
              }
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton onClick={nextScreen} noTheme>
          {i18next.t('settings.backupPhrase.continue')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
