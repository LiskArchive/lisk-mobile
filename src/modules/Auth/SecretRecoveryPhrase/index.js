/* eslint-disable max-lines */
/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Keyboard,
  SafeAreaView,
  View
} from 'react-native';
import { translate } from 'react-i18next';
import withTheme from 'components/shared/withTheme';
import Scanner from 'components/shared/scanner';
import { deviceHeight } from 'utilities/device';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import getStyles from './styles';
import Form from '../components/form';

// eslint-disable-next-line max-statements
const SecretRecoveryPhrase = ({
  styles,
  route,
  navigation,
  t,
}) => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const signOut = route.params?.signOut;
  const scanner = useRef();

  const onFormSubmission = (passphrase) => {
    console.log(passphrase);
    navigation.navigate('PasswordSetupForm');
  };

  const showSimplifiedView = () => {
    if (Platform.OS === 'android') {
      return keyboardHeight / deviceHeight() > 0.35 && keyboardIsOpen;
    }
    return false;
  };

  const addKeyboardListeners = () => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardIsOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));
  };

  const onQRCodeRead = value => {
    onFormSubmission(value);
  };

  useEffect(() => {
    addKeyboardListeners();
    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  const scanQrCode = () => {
    scanner.current.toggleCamera();
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="auth.setup.add_account"
        onPress={navigation.goBack}
        containerStyle={styles.header}
      />
      <Scanner
        ref={scanner}
        containerStyles={{
          cameraRoll: styles.cameraRoll,
          cameraOverlay: styles.cameraOverlay,
        }}
        fullScreen={true}
        navigation={navigation}
        readFromCameraRoll={false}
        onQRCodeRead={onQRCodeRead}
        permissionDialogTitle={t('Permission to use camera')}
        permissionDialogMessage={t('Lisk needs to connect to your camera')}
      />
      <View style={styles.container} >
        <P style={[styles.description, styles.theme.description]} >{t('auth.setup.add_account_description')}</P>
        <Form
          animate={!signOut}
          navigation={navigation}
          showBackButton={false}
          signIn={onFormSubmission}
          showSimplifiedView={showSimplifiedView()}
          scanQrCode={scanQrCode}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(SecretRecoveryPhrase),
  getStyles()
);
