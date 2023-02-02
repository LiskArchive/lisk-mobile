/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Stepper from 'components/shared/Stepper';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';

import { generatePassphrase } from '../utils';

import RegisterConfirm from './RegisterConfirm';
import RegisterSuccess from './RegisterSuccess';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import styles from './styles';

export default function Register({ route }) {
  const navigation = useNavigation();

  const settings = useSelector((state) => state.settings);

  const [showNav, setShowNav] = useState(true);

  const passphrase = useMemo(
    () => route.params?.passphrase ?? generatePassphrase(),
    [route.params?.passphrase]
  );

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

  useEffect(() => {
    if (!settings.showedRegisterIntro) {
      navigation.navigate('RegisterIntro');
    }
  }, [navigation, settings.showedRegisterIntro]);

  useScreenshotPrevent();

  return (
    <View style={[styles.container, noNavStyle]} testID="register-screen">
      <Stepper showProgressBar customProgressLength={3} styles={{ container: { marginTop: 16 } }}>
        <RegisterSafeKeeping title="safekeeping" passphrase={passphrase} route={route} />

        <RegisterConfirm title="verify" route={route} />

        <RegisterSuccess title="success" hideNav={hideNav} />
      </Stepper>
    </View>
  );
}
