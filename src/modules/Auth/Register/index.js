import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import Stepper from 'components/shared/Stepper';
import HeaderBackButton from 'components/navigation/headerBackButton';
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

  const navigation = useNavigation();

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
    navigation.setOptions({
      title: i18next.t('Account creation'),
      headerLeft: (props) => <HeaderBackButton {...props} onPress={navigation.goBack} />,
    });
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressedAndroid);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressedAndroid);
  }, [onBackButtonPressedAndroid]);

  return (
    <View style={[styles.container, noNavStyle]}>
      <Stepper showProgressBar customProgressLength={3}>
        <RegisterIntro
          title="create"
          group={i18next.t('1. Creating your account')}
          passphrase={passphrase}
          route={route}
        />
        <RegisterSafeKeeping
          title="safekeeping"
          group={i18next.t('2. Saving your passphrase')}
          passphrase={passphrase}
          route={route}
        />
        <RegisterConfirm
          title="verify"
          group={i18next.t('3. Verifying your passphrase')}
          passphrase={passphrase}
          route={route}
        />
        <RegisterSuccess
          title="success"
          group={i18next.t('4. Security reminder')}
          hideNav={hideNav}
        />
      </Stepper>
    </View>
  );
}
