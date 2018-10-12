import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './styles';
import { getPassphraseFromKeyChain, storePassphraseInKeyChain } from '../../utilities/passphrase';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import {
  accountLoggedIn as accountLoggedInAction,
  accountsRetrieved as accountsRetrievedAction,
} from '../../actions/accounts';
import Splash from './splash';
import Form from './form';
import BiometricAuth from './biometricAuth';

// there is a warning in RNOS module. remove this then that warning is fixed
console.disableYellowBox = true; // eslint-disable-line

/**
 * The container component containing login and create account functionality
 */
@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {
  accountLoggedIn: accountLoggedInAction,
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
})
class Login extends React.Component {
  state = {
    storedPassphrase: null,
    view: 'splash',
    sensorType: null,
  }

  changeHandler = (data) => {
    this.setState(data);
  }

  componentWillMount() {
    this.props.peerSet();
  }

  async defineDefaultAuthMethod() {
    const { password } = await getPassphraseFromKeyChain();
    let sensorType = null;
    try {
      sensorType = await FingerprintScanner.isSensorAvailable();
    } catch (error) {
      sensorType = null;
    }
    const signOut = this.props.navigation.getParam('signOut');
    const delay = this.state.view === 'splash' && !signOut ? 700 : 0;
    this.timeout = setTimeout(() => {
      if (password && sensorType) {
        this.changeHandler({
          view: 'biometricAuth',
          sensorType,
          storedPassphrase: password,
        });
      } else {
        this.changeHandler({
          view: 'form',
          sensorType: null,
        });
      }
    }, delay);
  }

  componentDidMount() {
    SplashScreen.hide();
    this.defineDefaultAuthMethod();
  }

  /**
   * After signed-in, accounts.active has value and this methods
   * redirects to Main.
   * @todo sign-out should happen in the setting page to prevent issues here
   */
  componentDidUpdate() {
    if (this.props.accounts.active && this.props.navigation.isFocused()) {
      this.props.navigation
        .dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        }));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Will be called when login form submits
   * fires the activePeerSet action
   *
   * @param {String} passphrase - valid mnemonic passphrase
   */
  onLoginSubmission = (passphrase) => {
    this.setState({
      connectionError: false,
    });

    storePassphraseInKeyChain(passphrase.value);

    this.props.accountLoggedIn({
      passphrase: passphrase.value,
    }, () => {
      this.setState({
        connectionError: true,
      });
    });
  }

  render() {
    const { view, storedPassphrase, sensorType } = this.state;
    const signOut = this.props.navigation.getParam('signOut');
    return (<View style={styles.wrapper}>
      <Splash animate={!signOut} />
      {
        view === 'biometricAuth' ?
          <BiometricAuth
            animate={!signOut}
            toggleView={this.changeHandler}
            sensorType={sensorType}
            passphrase={storedPassphrase}
            login={this.onLoginSubmission} /> : null
      }
      {
        view === 'form' ?
          <Form
            animate={!signOut}
            navigation={this.props.navigation}
            toggleView={this.changeHandler}
            login={this.onLoginSubmission} /> : null
      }
    </View>);
  }
}

export default Login;
