import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import Slider from 'components/shared/Slider/Slider';
import { PrimaryButton } from 'components/shared/toolBox/button';
import AddressIllustrationSvg from 'assets/svgs/AddressIllustrationSvg';
import AvatarIllustrationSvg from 'assets/svgs/AvatarIllustrationSvg';
import LockerIllustrationSvg from 'assets/svgs/LockerIllustrationSvg';

import styles from './IntroScreen.styles';

/**
 * Intro screen shown to the user when it opens the app for the first time.
 * Introduces Lisk main features.
 */
export default function IntroScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const slides = [
    {
      id: 1,
      title: i18next.t('Activity history'),
      description: i18next.t(
        'Get a full overview of your current balance, transaction history and much more.'
      ),
      body: <AddressIllustrationSvg />,
    },
    {
      id: 2,
      title: i18next.t('Token transfer'),
      description: i18next.t(
        'Transfer your tokens easily to other accounts, by simply scanning QR Codes.'
      ),
      body: <AvatarIllustrationSvg />,
    },
    {
      id: 3,
      title: i18next.t('Secure authentication'),
      description: i18next.t('Access all functions via advanced biometric authentication.'),
      body: <LockerIllustrationSvg />,
    },
  ];

  const renderFooter = ({ index, dataCount }) => {
    let children;

    const isLastSlide = index === dataCount - 1;

    const handleContinueClick = () => {
      dispatch(settingsUpdatedAction({ showedIntro: true }));
      AsyncStorage.setItem('@lisk-mobile-intro', 'true');
      navigation.push('AuthMethod', { signOut: true });
    };

    if (isLastSlide) {
      children = <PrimaryButton onClick={handleContinueClick}>Continue</PrimaryButton>;
    }

    return <View style={styles.footer}>{children}</View>;
  };

  return (
    <SafeAreaView style={styles.container} testID="intro-screen">
      <Slider data={slides} renderController={renderFooter} style={{ container: { flex: 1 } }} />
    </SafeAreaView>
  );
}
