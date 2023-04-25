/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'contexts/ThemeContext';

import Stepper from 'components/shared/Stepper';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import { generatePassphrase } from '../../utils';
import PassphraseQuiz from '../PassphraseQuiz/PassphraseQuiz';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import PasswordSetupForm from '../PasswordSetupForm';

import getRegisterStyles from './Register.styles';

export default function Register() {
  const route = useRoute();

  const passphrase = useMemo(
    () => route.params?.passphrase ?? generatePassphrase(),
    [route.params?.passphrase]
  );

  const { styles } = useTheme({
    styles: getRegisterStyles(),
  });

  const onBackButtonPressedAndroid = useCallback(() => {
    const action = route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  }, [route.params?.action]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressedAndroid);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressedAndroid);
  }, [onBackButtonPressedAndroid]);

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <Stepper
        showProgressBar={false}
        customProgressLength={3}
        styles={{ container: { flex: 1, marginTop: 16 } }}
      >
        <RegisterSafeKeeping showHeader passphrase={passphrase} />

        <PassphraseQuiz showHeader />

        <PasswordSetupForm hideNav />
      </Stepper>
    </SafeAreaView>
  );
}
