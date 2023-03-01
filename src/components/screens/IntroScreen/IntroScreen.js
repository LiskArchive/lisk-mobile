import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/store/actions';
import Slider from 'components/shared/Slider/Slider';
import { PrimaryButton, Button, LabelButton } from 'components/shared/toolBox/button';
import AddressIllustrationSvg from 'assets/svgs/AddressIllustrationSvg';
import AvatarIllustrationSvg from 'assets/svgs/AvatarIllustrationSvg';
import LockerIllustrationSvg from 'assets/svgs/LockerIllustrationSvg';

import getIntroScreenStyles from './IntroScreen.styles';

/**
 * Intro screen shown to the user when it opens the app for the first time.
 * Introduces Lisk main features.
 */
export default function IntroScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { styles } = useTheme({ styles: getIntroScreenStyles() });

  const slides = [
    {
      id: 1,
      title: i18next.t('intro.sendAndRequestTokensTitle'),
      description: i18next.t('intro.sendAndRequestTokensDescription'),
      body: <AddressIllustrationSvg />,
    },
    {
      id: 2,
      title: i18next.t('intro.uniqueAvatarTitle'),
      description: i18next.t('intro.uniqueAvatarDescription'),
      body: <AvatarIllustrationSvg />,
    },
    {
      id: 3,
      title: i18next.t('intro.manageApplicationsTitle'),
      description: i18next.t('intro.manageApplicationsDescription'),
      body: <LockerIllustrationSvg />,
    },
  ];

  const renderFooter = ({ index, handleGoNextIndex, handleGoToLastIndex, dataCount }) => {
    const isLastSlide = index === dataCount - 1;

    const handleContinueClick = (route) => {
      dispatch(settingsUpdatedAction({ showedIntro: true }));
      AsyncStorage.setItem('@lisk-mobile-intro', 'true');
      navigation.push(route, { signOut: true });
    };

    if (!isLastSlide) {
      return (
        <View style={styles.footer}>
          <LabelButton onClick={handleGoToLastIndex} style={{ flex: 0.3, height: 48 }}>
            {i18next.t('intro.skipButton')}
          </LabelButton>

          <PrimaryButton onClick={handleGoNextIndex} style={{ flex: 0.7, height: 48 }}>
            {i18next.t('intro.nextButton')}
          </PrimaryButton>
        </View>
      );
    }

    return (
      <View style={styles.lastSlideFooter}>
        <Button
          onClick={() => handleContinueClick('AuthMethod')}
          style={{ marginBottom: 16 }}
          testID="continueToAddAccountButton"
        >
          {i18next.t('intro.continueToAddAccountButton')}
        </Button>

        <PrimaryButton onClick={() => handleContinueClick('Register')}>
          {i18next.t('intro.continueToCreateAccountButton')}
        </PrimaryButton>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]} testID="intro-screen">
      <Slider data={slides} renderController={renderFooter} style={{ container: { flex: 1 } }} />
    </SafeAreaView>
  );
}
