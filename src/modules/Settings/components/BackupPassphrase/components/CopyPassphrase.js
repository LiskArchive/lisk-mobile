import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import QRCode from 'react-native-qrcode-svg';

import { themes, colors } from 'constants/styleGuide';
import { useTheme } from 'contexts/ThemeContext';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { PrimaryButton } from 'components/shared/toolBox/button';
import CopyPassphraseToClipboard from 'components/shared/CopyPassphraseToClipboard/CopyPassphraseToClipboard';
import { P, A } from 'components/shared/toolBox/typography';
import HeaderBackButton from 'components/navigation/headerBackButton';

import { getCopyPassphraseStyles } from './CopyPassphrase.styles';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.MD;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

export default function CopyPassphrase({ sharedData: data, nextStep }) {
  const [passphraseRevealed, setPassphraseReveal] = useState(false);

  const navigation = useNavigation();

  const { styles, theme } = useTheme({
    styles: getCopyPassphraseStyles(),
  });

  const toggleQRCode = () => {
    setPassphraseReveal(!passphraseRevealed);
  };

  const nextScreen = () => {
    nextStep({ passphrase: data.recoveryPhrase });
  };

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('settings.backupPhrase.title')}
        onPress={navigation.goBack}
      />

      <ScrollView style={styles.body}>
        <CopyPassphraseToClipboard passphrase={data.recoveryPhrase} />

        <View style={styles.row}>
          <P style={[styles.qrText, styles.theme.text]}>{i18next.t('Private use only')}</P>

          <A style={styles.button} onPress={toggleQRCode}>
            {passphraseRevealed ? i18next.t('Hide QR code') : i18next.t('Show QR code')}
          </A>
        </View>

        {passphraseRevealed && (
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
