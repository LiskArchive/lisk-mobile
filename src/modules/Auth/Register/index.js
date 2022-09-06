import React, { useCallback, useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { translate } from 'react-i18next';
import Stepper from 'components/shared/Stepper';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import styles from './styles';

const Register = ({ route, t }) => {
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

  return <View style={[styles.container, noNavStyle]}>
    <Stepper
      showProgressBar
      customProgressLength={3}
    >
      <Intro
        title="create"
        group={t('1. Creating your account')}
        route={route}
      />
      <SafeKeeping
        title="safekeeping"
        group={t('2. Saving your passphrase')}
        route={route}
      />
      <Confirm
        title="verify"
        group={t('3. Verifying your passphrase')}
        route={route}
      />
      <Success
        title="success"
        group={t('4. Security reminder')}
        hideNav={hideNav}
      />
    </Stepper>
  </View>;
};

export default translate()(Register);
