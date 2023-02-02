import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import Slider from 'components/shared/__Slider/Slider';
import AddressIllustrationSvg from 'assets/svgs/AddressIllustrationSvg';
import AvatarIllustrationSvg from 'assets/svgs/AvatarIllustrationSvg';
import LockerIllustrationSvg from 'assets/svgs/LockerIllustrationSvg';

import styles from './styles';

export default function RegisterIntro() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const slides = [
    {
      id: 1,
      title: i18next.t('auth.register.intro.addressTitle'),
      description: i18next.t('auth.register.intro.addressDescription'),
      body: <AddressIllustrationSvg />,
    },
    {
      id: 2,
      title: i18next.t('auth.register.intro.avatarTitle'),
      description: i18next.t('auth.register.intro.avatarDescription'),
      body: <AvatarIllustrationSvg />,
    },
    {
      id: 3,
      title: i18next.t('auth.register.intro.passphraseTitle'),
      description: i18next.t('auth.register.intro.passphraseDescription'),
      body: <LockerIllustrationSvg />,
    },
  ];

  const renderFooter = ({ index, handleGoNextIndex, dataCount }) => {
    const isLastSlide = index === dataCount - 1;

    const handleContinueClick = () => {
      dispatch(settingsUpdatedAction({ showedIntro: true }));
      AsyncStorage.setItem('@lisk-mobile-register-intro', 'true');
      navigation.push('Register', { signOut: true });
    };

    let children = (
      <>
        <LabelButton onClick={handleContinueClick} style={{ flex: 0.3 }}>
          Skip
        </LabelButton>

        <PrimaryButton onClick={handleGoNextIndex} style={{ flex: 0.7 }}>
          Next
        </PrimaryButton>
      </>
    );

    if (isLastSlide) {
      children = (
        <PrimaryButton onClick={handleContinueClick} style={{ flex: 1 }}>
          Continue to account creation
        </PrimaryButton>
      );
    }

    return <View style={styles.footer}>{children}</View>;
  };

  return (
    <SafeAreaView style={styles.container} testID="register-intro-container">
      <HeaderBackButton onPress={() => navigation.navigate('AuthMethod')} style={{}} />

      <Slider
        data={slides}
        renderController={renderFooter}
        testID="accountCreation"
        style={{ container: { flex: 1, marginTop: -24 } }}
      />
    </SafeAreaView>
  );
}
