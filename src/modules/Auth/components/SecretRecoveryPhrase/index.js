import React, { useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import Scanner from 'components/shared/scanner';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import { useSelector } from 'react-redux';
import SecretRecoveryPhraseForm from '../SecretRecoveryPhraseForm';

import getStyles from './styles';

export default function SecretRecoveryPhrase() {
  useScreenshotPrevent();
  const navigation = useNavigation();
  const settings = useSelector((state) => state.settings);

  const scannerRef = useRef();

  const { styles } = useTheme({ styles: getStyles() });

  const handleFormSubmission = (recoveryPhrase, derivationPath) =>
    navigation.navigate('PasswordSetupForm', { recoveryPhrase, derivationPath });

  const handleQRCodeRead = (value) => handleFormSubmission(value);

  const handleScanQrCode = () => scannerRef.current.toggleCamera();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title="auth.setup.addAccountTitle" onPress={navigation.goBack} />

      <Scanner
        ref={scannerRef}
        containerStyles={{
          cameraRoll: styles.cameraRoll,
          cameraOverlay: styles.cameraOverlay,
        }}
        fullScreen={true}
        navigation={navigation}
        readFromCameraRoll={false}
        onQRCodeRead={handleQRCodeRead}
        permissionDialogTitle={i18next.t('Permission to use camera')}
        permissionDialogMessage={i18next.t('Lisk needs to connect to your camera')}
      />

      <ScrollView contentContainerStyle={styles.container} testID="secret-recovery-screen">
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.setup.addAccountDescription')}
        </P>

        <SecretRecoveryPhraseForm
          useDerivationPath={settings.useDerivationPath}
          onSubmit={handleFormSubmission}
          onScanQrCode={handleScanQrCode}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
