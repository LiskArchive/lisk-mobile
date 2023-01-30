/* eslint-disable no-shadow */
import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

import activityHistoryImg from 'assets/images/intro/activityHistory3x.png';
import tokensTransferImg from 'assets/images/intro/tokensTransfer3x.png';
import secureAuthenticationImg from 'assets/images/intro/secureAuthentication3x.png';
import easyAccessImg from 'assets/images/intro/easyAccess3x.png';
import Slider from '../../shared/Slider';

import styles from './IntroScreen.styles';

export default function IntroScreen() {
  const navigation = useNavigation();

  const skip = () => {
    AsyncStorage.setItem('@lisk-mobile-intro', 'true');
    navigation.push('AuthMethod', { signOut: true });
  };

  const slides = [
    {
      step: 1,
      title: i18next.t('Activity history'),
      description: i18next.t(
        'Get a full overview of your current balance, transaction history and much more.'
      ),
      imageSrc: activityHistoryImg,
    },
    {
      step: 2,
      title: i18next.t('Token transfer'),
      description: i18next.t(
        'Transfer your tokens easily to other accounts, by simply scanning QR Codes.'
      ),
      imageSrc: tokensTransferImg,
    },
    {
      step: 3,
      title: i18next.t('Secure authentication'),
      description: i18next.t('Access all functions via advanced biometric authentication.'),
      imageSrc: secureAuthenticationImg,
    },
    {
      step: 4,
      title: i18next.t('Easy access'),
      description: i18next.t(
        'Create an account using passphrase to access your LSK cryptocurrency.'
      ),
      imageSrc: easyAccessImg,
      acceptTermsSwitch: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper} testID="intro-screen">
        <Slider skip={skip} slides={slides} style={{ image: styles.illustration }} testID="intro" />
      </View>
    </SafeAreaView>
  );
}
