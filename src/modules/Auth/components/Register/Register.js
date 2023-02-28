/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Stepper from 'components/shared/Stepper';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import { useTheme } from 'contexts/ThemeContext';
import { generatePassphrase } from '../../utils';

import PassphraseQuiz from '../PassphraseQuiz/PassphraseQuiz';
import RegisterSuccess from './RegisterSuccess';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import getRegisterStyles from './Register.styles';

export default function Register() {
  const [showNav, setShowNav] = useState(true);

  const route = useRoute();

  const passphrase = useMemo(
    () => route.params?.passphrase ?? generatePassphrase(),
    [route.params?.passphrase]
  );

  const { styles } = useTheme({
    styles: getRegisterStyles(),
  });

  const noNavStyle = showNav ? {} : { paddingBottom: 0 };

  const hideNav = () => setShowNav(false);

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
    <View style={[styles.container, styles.theme.container, noNavStyle]} testID="register-screen">
      <Stepper showProgressBar customProgressLength={3} styles={{ container: { marginTop: 16 } }}>
        <RegisterSafeKeeping title="safekeeping" passphrase={passphrase} route={route} />

        <PassphraseQuiz title="verify" route={route} />

        <RegisterSuccess title="success" hideNav={hideNav} />
      </Stepper>
    </View>
  );
}
