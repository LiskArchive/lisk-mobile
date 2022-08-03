import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { translate } from 'react-i18next';
import Stepper from 'components/shared/Stepper';
import { Small } from 'components/shared/toolBox/typography';
import progressBar from 'components/shared/ProgressBar';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import styles from './styles';

const NavButton = props => (
  <Text
    {...props}
    style={[styles.navButton, props.disabled ? styles.disabledNavButton : null]}
  />
);
const ActiveTitle = props => (
  <Small style={styles.activeGroupTitle} {...props} />
);

const Register = ({ navigation, route, t }) => {
  const [showNav, setShowNav] = useState(true);

  const noNavStyle = showNav ? {} : { paddingBottom: 0 };

  const hideNav = () => setShowNav(false);

  const onBackButtonPressedAndroid = () => {
    const action = route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressedAndroid);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressedAndroid);
  }, []);

  return <View style={[styles.container, noNavStyle]}>
    <Stepper
      progressBar={progressBar}
      hasNav={showNav}
      navStyles={styles}
      hideSteps={true}
      groupButton={NavButton}
      activeTitle={ActiveTitle}
      showProgressBar
      styles={{ progressBar: { progressStepContainer: styles.progressStepContainer } }}
      backButtonTitle="Back"
    >
      <Intro
        title="create"
        group={t('1. Creating your account')}
        navigation={navigation}
        route={route}
      />
      <SafeKeeping
        title="safekeeping"
        group={t('2. Saving your passphrase')}
        navigation={navigation}
        route={route}
      />
      <Confirm
        title="verify"
        group={t('3. Verifying your passphrase')}
        navigation={navigation}
        route={route}
      />
      <Success
        title="success"
        group={t('4. Security reminder')}
        hideNav={hideNav}
        navigation={navigation}
      />
    </Stepper>
  </View>;
};

export default translate()(Register);
