import React, { useState } from 'react';
import { View, Linking } from 'react-native';
import Switch from 'react-native-switch-pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

// import tokensTransferImg from 'assets/images/intro/tokensTransfer3x.png';
// import secureAuthenticationImg from 'assets/images/intro/secureAuthentication3x.png';
// import easyAccessImg from 'assets/images/intro/easyAccess3x.png';

import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import Slider from 'components/shared/__Slider/Slider';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { P, A } from 'components/shared/toolBox/typography';
import AddressIllustrationSvg from 'assets/svgs/AddressIllustrationSvg';
import CoinIllustrationSvg from 'assets/svgs/CoinIllustrationSvg';
import ActivityHistoryIllustrationSvg from 'assets/svgs/ActivityHistoryIllustrationSvg';
import URLs from 'constants/URLs';
import { colors } from 'constants/styleGuide';

import styles from './IntroScreen.styles';

export default function IntroScreen() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

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
      body: <CoinIllustrationSvg />,
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

  const handleTermsAndConditionsClick = () => Linking.openURL(URLs.liskTermsAndConditions);

  const renderFooter = ({ index, handleGoNextIndex, handleGoToLastIndex, dataCount }) => {
    const isLastSlide = index === dataCount - 1;

    const handleSkipClick = () => {
      dispatch(settingsUpdatedAction({ showedIntro: true }));

      AsyncStorage.setItem('@lisk-mobile-intro', 'true');
      navigation.push('AuthMethod', { signOut: true });
    };

    let children = (
      <>
        <PrimaryButton onClick={handleGoNextIndex} style={{ marginBottom: 16 }}>
          Next
        </PrimaryButton>

        <Button onClick={handleGoToLastIndex}>Skip</Button>
      </>
    );

    if (isLastSlide) {
      children = (
        <>
          <View style={styles.switchContainer}>
            <Switch
              height={26}
              width={43}
              onSyncPress={(status) => setAcceptedTerms(status)}
              backgroundActive={colors.light.ultramarineBlue}
              backgroundInactive={colors.light.platinum}
              testID="sliderButton"
            />
            <P style={styles.confirmationText}>
              {i18next.t('I have read and agreed with the')}

              <A onPress={handleTermsAndConditionsClick} style={styles.link}>
                &nbsp;{i18next.t('terms and conditions.')}
              </A>
            </P>
          </View>

          <PrimaryButton
            onClick={handleSkipClick}
            disabled={!acceptedTerms}
            style={{ marginBottom: 16 }}
          >
            Continue to add account
          </PrimaryButton>
        </>
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
