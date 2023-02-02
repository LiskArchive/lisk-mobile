import React, { useEffect } from 'react';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HeaderBackButton from 'components/navigation/headerBackButton';
import Slider from 'components/shared/Slider';
import addressImg from 'assets/images/registrationIntro/address3x.png';
import securePassphraseImg from 'assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from 'assets/images/registrationIntro/uniqueAvatar3x.png';

import styles from './styles';

export default function RegisterIntro({ nextStep, setShowProgressBar }) {
  const navigation = useNavigation();

  const slides = [
    {
      step: 1,
      title: i18next.t('auth.register.intro.addressTitle'),
      description: i18next.t('auth.register.intro.addressDescription'),
      imageSrc: addressImg,
    },
    {
      step: 2,
      title: i18next.t('auth.register.intro.avatarTitle'),
      description: i18next.t('auth.register.intro.avatarDescription'),
      imageSrc: uniqueAvatarImg,
    },
    {
      step: 3,
      title: i18next.t('auth.register.intro.passphraseTitle'),
      description: i18next.t('auth.register.intro.passphraseDescription'),
      imageSrc: securePassphraseImg,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={() => navigation.navigate('AuthMethod')} />
      ),
    });

    setShowProgressBar(false);
  }, [navigation, setShowProgressBar]);

  return (
    <SafeAreaView style={styles.wrapper} testID="register-intro-container">
      <Slider
        slides={slides}
        skip={nextStep}
        testID="accountCreation"
        style={{ image: styles.sliderImage }}
      />
    </SafeAreaView>
  );
}