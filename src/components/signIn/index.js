import React from 'react';
import connect from 'redux-connect-decorator';
import { Linking, View, Alert, Platform } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import FingerprintOverlay from '../fingerprintOverlay';
import styles from './styles';
import {
  getPassphraseFromKeyChain,
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import {
  accountSignedIn as accountSignedInAction,
  accountsRetrieved as accountsRetrievedAction,
} from '../../actions/accounts';
import {
  settingsUpdated as settingsUpdatedAction,
  settingsRetrieved as settingsRetrievedAction,
} from '../../actions/settings';
import { pricesRetrieved as pricesRetrievedAction } from '../../actions/liskService';
import Splash from './splash';
import Form from './form';
import BiometricAuth from './biometricAuth';
import deepLinkMapper from '../../utilities/deepLink';

// there is a warning in RNOS module. remove this then that warning is fixed
console.disableYellowBox = true; // eslint-disable-line

/**
 * The settings state is passed through the landing component
 */
@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
  settings: state.settings,
}), {
  accountSignedIn: accountSignedInAction,
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
  settingsUpdated: settingsUpdatedAction,
  settingsRetrieved: settingsRetrievedAction,
  pricesRetrieved: pricesRetrievedAction,
})
class SignIn extends React.Component {
  state = {
    destinationDefined: false,
    storedPassphrase: null,
    view: 'splash',
    deepLinkURL: '',
    androidDialog: {
      error: null,
      show: false,
    },
  }

  init = () => {
    this.defineDefaultAuthMethod();
    SplashScreen.hide();
  }

  showDialog = () => {
    const { androidDialog } = this.state;
    androidDialog.show = true;
    this.setState({ androidDialog });
  }

  hideDialog = (cb) => {
    const { androidDialog } = this.state;
    androidDialog.show = false;
    this.setState({ androidDialog }, cb);
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
    const delay = this.state.view === 'splash' && !signOut ? 1100 : 0;

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
          storedPassphrase: password,
        });
      } else {
        this.changeHandler({
          view: 'form',
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
          onPress: () => cb(passphrase),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            bioMetricAuthentication({
              description: 'Do you want to use Biometric Authentication?',
              successCallback: () => {
                this.hideDialog(() => {
                  storePassphraseInKeyChain(passphrase);
                  this.props.settingsUpdated({
                    hasStoredPassphrase: true,
                  });
                  cb(passphrase);
                });
              },
              errorCallback: () => {},
              androidError: (error) => {
                const { androidDialog } = this.state;
                androidDialog.error = error;
                this.setState({ androidDialog });
              },
            });

            if (Platform.OS === 'android') {
              this.showDialog();
            }
          },
        },
      ],
      { cancelable: false },
    );
  }

  signIn = (passphrase) => {
    this.props.accountSignedIn({
      passphrase,
    }, () => {
      this.setState({
        connectionError: true,
      });
    });
  }

  /**
   * Will be called when sign in form is submitted
   * fires the activePeerSet action
   *
   * @param {String} passphrase - valid mnemonic passphrase
   * @param {String} submissionType - 'form' or 'biometricAuth'
   */
  onFormSubmission = (passphrase, submissionType) => {
    const { settings } = this.props;

    this.setState({
      connectionError: false,
      passphrase,
    });

    if (settings.sensorType && !settings.bioAuthRecommended && submissionType === 'form') {
      this.promptBioAuth(passphrase, this.signIn);
    } else {
      this.signIn(passphrase);
    }
  }

  onSignInCompleted = () => {
    this.props.pricesRetrieved();

    if (this.state.deepLinkURL) {
      this.navigateToDeepLink(this.state.deepLinkURL);
    } else {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      }));
    }
  }

  onDeepLinkRequested = (event) => {
    const isSignedIn = !!this.props.accounts.active;

    if (isSignedIn) {
      this.navigateToDeepLink(event.url);
    } else {
      this.setState({ deepLinkURL: event.url });
    }
  }

  navigateToDeepLink = (url) => {
    const linkedScreen = deepLinkMapper(url);

    if (linkedScreen) {
      this.props.navigation.navigate(linkedScreen.name, linkedScreen.params);
    } else {
      // @TODO: Navigate to different page or display an error message for unmapped deep links.
      this.props.navigation.navigate('Home');
    }
  }

  componentWillMount() {
    this.props.peerSet();
  }

  componentDidMount() {
    this.props.settingsRetrieved();

    // After sign out, there's no need to consume the launch URL for further sign-ins.
    if (!this.props.navigation.getParam('signOut')) {
      Linking.getInitialURL()
        .then(url => this.setState({ deepLinkURL: url }))
        // eslint-disable-next-line no-console
        .catch(error => console.log('An error occurred while getting initial url', error));
    }

    Linking.removeAllListeners('url');
    Linking.addEventListener('url', this.onDeepLinkRequested);
  }

  componentDidUpdate() {
    const { settings, navigation, accounts } = this.props;
    const { destinationDefined } = this.state;

    if (settings.validated && !destinationDefined) {
      if (settings.showedIntro) {
        this.init();
      } else {
        navigation.navigate('Intro');
      }
      this.setState({ destinationDefined: true });
    }

    if (accounts.active && navigation && navigation.isFocused()) {
      this.onSignInCompleted();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { view, storedPassphrase, androidDialog } = this.state;
    const { sensorType } = this.props.settings;
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
            signIn={this.onFormSubmission} /> : null
      }
      {
        view === 'form' ?
          <Form
            animate={!signOut}
            navigation={this.props.navigation}
            toggleView={this.changeHandler}
            signIn={this.onFormSubmission}
            connectionError={this.state.connectionError}
          /> : null
      }
      {
        Platform.OS === 'android' ?
        <FingerprintOverlay
          onModalClosed={() => this.signIn(this.state.passphrase)}
          error={androidDialog.error}
          show={androidDialog.show} /> : null
      }
    </View>);
  }
}

export default SignIn;
