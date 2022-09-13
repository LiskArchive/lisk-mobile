import React, { useCallback, useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import Stepper from 'components/shared/Stepper';
import i18next from 'i18next';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import styles from './styles';

const Register = ({ route }) => {
  const [showNav, setShowNav] = useState(true);

  const noNavStyle = showNav ? {} : { paddingBottom: 0 };

  const hideNav = () => setShowNav(false);

  const onBackButtonPressedAndroid = useCallback(() => {
    const action = route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressedAndroid);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressedAndroid);
  }, [onBackButtonPressedAndroid]);

  return (
    <View style={[styles.container, noNavStyle]}>
      <Stepper showProgressBar customProgressLength={3}>
        <Intro title="create" group={i18next.t('1. Creating your account')} route={route} />
        <SafeKeeping
          title="safekeeping"
          group={i18next.t('2. Saving your passphrase')}
          route={route}
        />
        <Confirm title="verify" group={i18next.t('3. Verifying your passphrase')} route={route} />
        <Success title="success" group={i18next.t('4. Security reminder')} hideNav={hideNav} />
      </Stepper>
    </View>
  );
};

export default Register;
