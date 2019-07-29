import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import SplashScreen from 'react-native-splash-screen';
import Splash from './splash';
import Heading from './heading';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../../actions/settings';
import activityHistoryImg from '../../../assets/images/intro/activityHistory3x.png';
import tokensTransferImg from '../../../assets/images/intro/tokensTransfer3x.png';
import secureAuthenticationImg from '../../../assets/images/intro/secureAuthentication3x.png';
import easyAccessImg from '../../../assets/images/intro/easyAccess3x.png';
import styles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class Intro extends React.Component {
  skip() {
    this.props.navigation.navigate('SignIn', { signOut: true });
  }

  componentDidMount() {
    this.props.settingsUpdated({ showedIntro: true });
    this.timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 400);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const descriptionContent = [
      {
        step: 1,
        title: 'Activity history',
        description:
          'Get a full overview of your current balance, transaction history and much more.',
        imageSrc: activityHistoryImg,
        imageStyle: styles.illustration,
      },
      {
        step: 2,
        title: 'Token transfer',
        description: 'Transfer your tokens easily to other accounts, by simply scanning QR Codes.',
        imageSrc: tokensTransferImg,
        imageStyle: styles.illustration,
      },
      {
        step: 3,
        title: 'Secure authentication',
        description: 'Access all functions via advanced biometric authentication.',
        imageSrc: secureAuthenticationImg,
        imageStyle: styles.illustration,
      },
      {
        step: 4,
        title: 'Easy access',
        description:
          'Create an account with one passphrase to access your LSK and BTC cryptocurrencies',
        imageSrc: easyAccessImg,
        imageStyle: styles.illustration,
      },
    ];
    return (<View style={styles.wrapper}>
      <Splash />
      <Heading skip={this.skip.bind(this)} descriptionContent={descriptionContent} testID="intro"/>
    </View>);
  }
}

export default Intro;
