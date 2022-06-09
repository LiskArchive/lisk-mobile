/* eslint-disable max-lines */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  View,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { translate } from 'react-i18next';
import withTheme from 'components/shared/withTheme';
import { deviceHeight } from 'utilities/device';
import getStyles from './styles';
import Splash from '../components/splash';
import Form from '../components/form';

// eslint-disable-next-line max-statements
const SecretRecoveryPhrase = ({
  styles,
  route,
  navigation,
}) => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const signOut = route.params?.signOut;
  const onFormSubmission = (passphrase) => {
    console.log(passphrase);
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

  useEffect(() => {
    addKeyboardListeners();
    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <Form
          animate={!signOut}
          navigation={navigation}
          toggleView={() => { }}
          showBackButton={false}
          signIn={onFormSubmission}
          showSimplifiedView={showSimplifiedView()}
        />
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(SecretRecoveryPhrase),
  getStyles()
);
