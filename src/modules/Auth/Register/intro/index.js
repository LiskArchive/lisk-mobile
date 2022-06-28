import React, { useEffect, useState } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generatePassphrase } from 'modules/Auth/utils';
import Slider from 'components/screens/intro/heading';
import addressImg from 'assets/images/registrationIntro/address3x.png';
import securePassphraseImg from 'assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from 'assets/images/registrationIntro/uniqueAvatar3x.png';
import HeaderBackButton from 'components/navigation/headerBackButton';
import {
  accountSignedIn as accountSignedInAction,
  accountFetched as accountFetchedAction
} from 'modules/Accounts/store/actions';
import { pricesRetrieved as pricesRetrievedAction } from 'actions/service';
import styles from './styles';

const descriptionContent = [
  {
    step: 1,
    title: 'Your Lisk address',
    description:
      'The address is unique and can’t be changed. It’s yours. Find it in your home page.',
    imageSrc: addressImg,
    imageStyle: styles.sliderImage
  },
  {
    step: 2,
    title: 'A unique avatar',
    description: 'The Avatar represents the address, making it easy to recognize.',
    imageSrc: uniqueAvatarImg,
    imageStyle: styles.sliderImage
  },
  {
    step: 3,
    title: 'A secure passphrase',
    description:
      'Your passphrase is used to access your account. No one can reset it, not even Lisk.',
    imageSrc: securePassphraseImg,
    imageStyle: styles.sliderImage
  }
];

const Intro = ({
  t, nextStep,
  accountSignedIn,
  accountFetched,
  pricesRetrieved, navigation, route
}) => {
  const [passphrase, setPassphrase] = useState('');

  const forward = () => {
    nextStep({
      passphrase
    });
    accountSignedIn({ passphrase });
    accountFetched();
    pricesRetrieved();
  };

  useEffect(() => {
    const { setOptions } = navigation;

    // eslint-disable-next-line no-shadow
    const passphrase = route.params?.passphrase ?? generatePassphrase();

    setPassphrase(passphrase);

    setOptions({
      title: t('Account creation'),
      headerLeft: (props) => <HeaderBackButton {...props} onPress={navigation.goBack} />
    });
  }, []);

  return <SafeAreaView style={styles.wrapper}>
    <Slider
      descriptionContent={descriptionContent}
      skip={forward}
      testID="accountCreation"
      t={t}
    ></Slider>
  </SafeAreaView>;
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = {
  accountSignedIn: accountSignedInAction,
  accountFetched: accountFetchedAction,
  pricesRetrieved: pricesRetrievedAction,
};

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Intro));
