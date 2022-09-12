import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { translate } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import { themes, colors } from 'constants/styleGuide';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { PrimaryButton } from 'components/shared/toolBox/button';
import PassphraseCopy from 'components/shared/passphraseCopy';
import withTheme from 'components/shared/withTheme';
import { P, A } from 'components/shared/toolBox/typography';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useNavigation } from '@react-navigation/native';
import getStyles from './styles';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.MD;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

const PassphraseBackup = ({ styles, t, theme, sharedData: data, nextStep }) => {
  const [passphraseRevealed, setPassphraseReveal] = useState(false);
  const navigation = useNavigation();

  const toggleQRCode = () => {
    setPassphraseReveal(!passphraseRevealed);
  };

  const nextScreen = () => {
    nextStep({ passphrase: data.recoveryPhrase });
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title={'settings.backup_phrase.title'} onPress={navigation.goBack} />
      <ScrollView style={styles.container}>
        <PassphraseCopy passphrase={data.recoveryPhrase} />
        <View style={styles.row}>
          <P style={[styles.QRText, styles.theme.text]}>{t('Private use only')}</P>
          <A style={styles.button} onPress={toggleQRCode}>
            {passphraseRevealed ? t('Hide QR code') : t('Show QR code')}
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
      <View style={styles.container}>
        <PrimaryButton noTheme title={t('settings.backup_phrase.continue')} onPress={nextScreen} />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(translate()(PassphraseBackup), getStyles());
