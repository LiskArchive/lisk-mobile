import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler } from 'react-native';

import Stepper from 'components/shared/Stepper';
import SecureView from 'components/shared/SecureView';
import { generatePassphrase } from '../utils';

import RegisterConfirm from './RegisterConfirm';
import RegisterSuccess from './RegisterSuccess';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import RegisterIntro from './RegisterIntro';
import styles from './styles';

export default function Register({ route }) {
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

  return (
    <SecureView style={[styles.container, noNavStyle]}>
      <Stepper showProgressBar customProgressLength={3} styles={{ container: { marginTop: 16 } }}>
        <RegisterIntro title="create" passphrase={passphrase} route={route} />

        <RegisterSafeKeeping title="safekeeping" passphrase={passphrase} route={route} />

        <RegisterConfirm title="verify" passphrase={passphrase} route={route} />

        <RegisterSuccess title="success" hideNav={hideNav} />
      </Stepper>
    </SecureView>
  );
}
