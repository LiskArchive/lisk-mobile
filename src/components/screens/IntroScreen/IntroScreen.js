import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

// import tokensTransferImg from 'assets/images/intro/tokensTransfer3x.png';
// import secureAuthenticationImg from 'assets/images/intro/secureAuthentication3x.png';
// import easyAccessImg from 'assets/images/intro/easyAccess3x.png';

import Slider from 'components/shared/__Slider/Slider';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import AddressIllustrationSvg from 'assets/svgs/AddressIllustrationSvg';
import ActivityHistoryIllustrationSvg from 'assets/svgs/ActivityHistoryIllustrationSvg';

import styles from './IntroScreen.styles';

export default function IntroScreen() {
  const navigation = useNavigation();

  const slides = [
    {
      id: 1,
      title: i18next.t('Activity history'),
      description: i18next.t(
        'Get a full overview of your current balance, transaction history and much more.'
      ),
      body: <ActivityHistoryIllustrationSvg />,
    },
    {
      id: 2,
      title: i18next.t('Token transfer'),
      description: i18next.t(
        'Transfer your tokens easily to other accounts, by simply scanning QR Codes.'
      ),
      body: <AddressIllustrationSvg />,
    },
    {
      id: 3,
      title: i18next.t('Secure authentication'),
      description: i18next.t('Access all functions via advanced biometric authentication.'),
      body: <AddressIllustrationSvg />,
    },
    {
      id: 4,
      title: i18next.t('Easy access'),
      description: i18next.t(
        'Create an account using passphrase to access your LSK cryptocurrency.'
      ),
      body: <AddressIllustrationSvg />,
    },
  ];

  const renderFooter = ({ index, handleGoNextIndex, dataCount }) => {
    const isLastSlide = index === dataCount - 1;

    const handleSkipClick = () => {
      AsyncStorage.setItem('@lisk-mobile-intro', 'true');
      navigation.push('AuthMethod', { signOut: true });
    };

    let children = (
      <>
        <PrimaryButton onClick={handleGoNextIndex} style={{ marginBottom: 16 }}>
          Next
        </PrimaryButton>

        <Button onClick={handleSkipClick}>Skip</Button>
      </>
    );

    if (isLastSlide) {
      children = (
        <PrimaryButton onClick={handleSkipClick} style={{ marginBottom: 16 }}>
          Continue to add account
        </PrimaryButton>
      );
    }

    return <View style={styles.footer}>{children}</View>;
  };

  return (
    <SafeAreaView style={styles.container} testID="intro-screen">
      <Slider data={slides} renderController={renderFooter} style={{ container: { flex: 1 } }} />
    </SafeAreaView>
  );
}
