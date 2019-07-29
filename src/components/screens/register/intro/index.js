import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { generatePassphrase } from '../../../../utilities/passphrase';
import Slider from '../../intro/heading';
import addressImg from '../../../../assets/images/registrationIntro/address3x.png';
import securePassphraseImg from '../../../../assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from '../../../../assets/images/registrationIntro/uniqueAvatar3x.png';

class Intro extends React.Component {
  state = {
    passphrase: '',
    buttonStatus: true,
  }

  componentDidMount() {
    const { t, navigation: { setParams } } = this.props;

    const passphrase = this.props.navigation.getParam('passphrase', generatePassphrase());
    this.setState({ passphrase });

    setParams({
      showButtonLeft: true,
      action: false,
      title: t('Account creation'),
    });
  }

  confirm = (status) => {
    this.setState({
      buttonStatus: !status,
    });
  }

  forward = () => {
    this.props.nextStep({
      passphrase: this.state.passphrase,
    });
  }

  render() {
    const { t } = this.props;


    const descriptionContent = [
      {
        step: 1,
        title: 'Your Lisk address',
        description: 'The address is unique and can’t be changed. It’s yours. Find it in your home page.',
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
        description: 'Your passphrase is used to access your account. No one can reset it, not even Lisk.',
        imageSrc: securePassphraseImg,
        imageStyle: styles.sliderImage,
      },
    ];


    return (
      <View style={styles.scrollContainer}>
        <Slider
          descriptionContent={descriptionContent}
          skip={this.forward}
          t={t}
          testID='accountCreation'
        >
        </Slider>
      </View>);
  }
}

export default translate()(Intro);
