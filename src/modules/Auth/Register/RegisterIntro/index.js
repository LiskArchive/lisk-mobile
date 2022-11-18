import React, { useEffect } from 'react';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HeaderBackButton from 'components/navigation/headerBackButton';
import Slider from 'components/screens/intro/heading';
import addressImg from 'assets/images/registrationIntro/address3x.png';
import securePassphraseImg from 'assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from 'assets/images/registrationIntro/uniqueAvatar3x.png';

import styles from './styles';

const descriptionContent = [
  {
    step: 1,
    title: i18next.t('auth.register.intro.addressTitle'),
    description: i18next.t('auth.register.intro.addressDescription'),
    imageSrc: addressImg,
    imageStyle: styles.sliderImage,
  },
  {
    step: 2,
    title: i18next.t('auth.register.intro.avatarTitle'),
    description: i18next.t('auth.register.intro.avatarDescription'),
    imageSrc: uniqueAvatarImg,
    imageStyle: styles.sliderImage,
  },
  {
    step: 3,
    title: i18next.t('auth.register.intro.passphraseTitle'),
    description: i18next.t('auth.register.intro.passphraseDescription'),
    imageSrc: securePassphraseImg,
    imageStyle: styles.sliderImage,
  },
];

export default function RegisterIntro({ nextStep, setShowProgressBar }) {
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.wrapper}>
      <Slider
        descriptionContent={descriptionContent}
        skip={nextStep}
        testID="accountCreation"
        t={i18next.t}
      />
    </SafeAreaView>
  );
}
