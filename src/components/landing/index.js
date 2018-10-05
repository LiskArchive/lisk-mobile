import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import landingAnimation from '../../assets/animations/welcome.json';
import { H1, P } from '../toolBox/typography';
import { SecondaryButton } from '../toolBox/button';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import {
  accountsRetrieved as accountsRetrievedAction,
  accountLoggedOut as accountLoggedOutAction,
} from '../../actions/accounts';
import styles from './styles';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  accounts: state.accounts,
}), {
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
  accountLoggedOut: accountLoggedOutAction,
})
class Landing extends React.Component {
  componentWillMount() {
    this.props.peerSet();
    this.props.accountsRetrieved();
  }

  componentDidMount() {
    this.animation.play();
    this.props.navigation.addListener(
      'didFocus',
      () => { this.props.accountLoggedOut(); },
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  goToLogin = () => {
    this.animation.reset();
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 160);
  }

  /**
   * @todo this Text need to be replaced by a snipper component
   */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (<View style={styles.container}>
      <View style={styles.textContainer}>
        <LottieView style={styles.logo}
        source={landingAnimation}
        ref={(el) => { this.animation = el; }}
        />
        <View>
          <H1 style={styles.header}>Welcome to Lisk</H1>
          <P style={styles.description}>
            With Lisk mobile wallet, you can send LSK{'\n'}tokens,
             monitor your account activity{'\n'} and more.
          </P>
          <SecondaryButton
            onClick={this.goToLogin}
            style={styles.button}>Continue</SecondaryButton>
        </View>
      </View>
    </View>);
  }
}

export default Landing;
