import React from 'react';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import Slider from 'components/screens/intro/heading';
import addressImg from 'assets/images/registrationIntro/address3x.png';
import securePassphraseImg from 'assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from 'assets/images/registrationIntro/uniqueAvatar3x.png';

import styles from './styles';

const descriptionContent = [
  {
    step: 1,
    title: 'Your Lisk address',
    description:
      'The address is unique and can’t be changed. It’s yours. Find it in your home page.',
    imageSrc: addressImg,
    imageStyle: styles.sliderImage,
  },
  {
    step: 2,
    title: 'A unique avatar',
    description: 'The Avatar represents the address, making it easy to recognize.',
    imageSrc: uniqueAvatarImg,
    imageStyle: styles.sliderImage,
  },
  {
    step: 3,
    title: 'A secure passphrase',
    description:
      'Your passphrase is used to access your account. No one can reset it, not even Lisk.',
    imageSrc: securePassphraseImg,
    imageStyle: styles.sliderImage,
  },
];

export default function RegisterIntro({ nextStep }) {
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
