import React from 'react';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generatePassphrase } from 'utilities/passphrase';
import Slider from 'components/screens/intro/heading';
import addressImg from 'assets/images/registrationIntro/address3x.png';
import securePassphraseImg from 'assets/images/registrationIntro/securePassphrase3x.png';
import uniqueAvatarImg from 'assets/images/registrationIntro/uniqueAvatar3x.png';
import HeaderBackButton from 'navigation/headerBackButton';
import {
  accountSignedIn as accountSignedInAction,
  accountFetched as accountFetchedAction
} from 'actions/accounts';
import { pricesRetrieved as pricesRetrievedAction } from 'actions/service';
import styles from './styles';

@connect(
  state => ({
    settings: state.settings,
  }),
  {
    accountSignedIn: accountSignedInAction,
    accountFetched: accountFetchedAction,
    pricesRetrieved: pricesRetrievedAction,
  }
)
class Intro extends React.Component {
  state = {
    passphrase: '',
    buttonStatus: true
  };

  componentDidMount() {
    const {
      t,
      navigation: { setOptions }
    } = this.props;

    const passphrase = this.props.route.params?.passphrase ?? generatePassphrase();
    this.setState({ passphrase });

    setOptions({
      title: t('Account creation'),
      headerLeft: (props) => <HeaderBackButton {...props} onPress={this.props.navigation.goBack} />
    });
  }

  confirm = (status) => {
    this.setState({
      buttonStatus: !status
    });
  };

  forward = () => {
    this.props.nextStep({
      passphrase: this.state.passphrase
    });
    this.props.accountSignedIn({ passphrase: this.state.passphrase });
    this.props.accountFetched();
    this.props.pricesRetrieved();
  };

  render() {
    const { t } = this.props;

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

    return (
      <SafeAreaView style={styles.wrapper}>
        <Slider
          descriptionContent={descriptionContent}
          skip={this.forward}
          testID="accountCreation"
          t={t}
        ></Slider>
      </SafeAreaView>
    );
  }
}

export default translate()(Intro);
