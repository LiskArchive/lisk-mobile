import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './styles';
import {
  getPassphraseFromKeyChain,
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import {
  accountLoggedIn as accountLoggedInAction,
  accountsRetrieved as accountsRetrievedAction,
} from '../../actions/accounts';
import {
  settingsUpdated as settingsUpdatedAction,
  settingsRetrieved as settingsRetrievedAction,
} from '../../actions/settings';
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
  settings: state.settings,
}), {
  accountLoggedIn: accountLoggedInAction,
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
  settingsUpdated: settingsUpdatedAction,
  settingsRetrieved: settingsRetrievedAction,
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

    // Update the store
    this.props.settingsUpdated({
      sensorType,
      hasStoredPassphrase: !!password,
    });
    // Update the component state
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

  promptBioAuth = (passphrase, cb) => {
    this.props.settingsUpdated({
      bioAuthRecommended: true,
    });

    Alert.alert(
      'For ease of sign in',
      'Do you want to use Biometric Authentication?',
      [
        {
          text: 'Cancel',
          onPress: () => cb(passphrase.value),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            bioMetricAuthentication(
              () => {
                storePassphraseInKeyChain(passphrase.value);
                this.props.settingsUpdated({
                  hasStoredPassphrase: true,
                });
                cb(passphrase.value);
              },
              () => {
                cb(passphrase.value);
              },
            );
          },
        },
      ],
      { cancelable: false },
    );
  }

  login = (passphrase) => {
    this.props.accountLoggedIn({
      passphrase,
    }, () => {
      this.setState({
        connectionError: true,
      });
    });
  }

  /**
   * Will be called when login form submits
   * fires the activePeerSet action
   *
   * @param {String} passphrase - valid mnemonic passphrase
   */
  onFormSubmission = (passphrase) => {
    this.setState({
      connectionError: false,
    });

    if (!this.props.settings.bioAuthRecommended) {
      this.promptBioAuth(passphrase, this.login);
    } else {
      this.login(passphrase.value);
    }
  }

  componentWillMount() {
    this.props.peerSet();
    this.props.settingsRetrieved();
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
            login={this.onFormSubmission} /> : null
      }
      {
        view === 'form' ?
          <Form
            animate={!signOut}
            navigation={this.props.navigation}
            toggleView={this.changeHandler}
            login={this.onFormSubmission} /> : null
      }
    </View>);
  }
}

export default Login;
