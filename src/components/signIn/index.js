import React from 'react';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  Linking,
  View,
  Alert,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import QuickActions from 'react-native-quick-actions'; // eslint-disable-line
import FingerprintOverlay from '../fingerprintOverlay';
import styles from './styles';
import {
  getPassphraseFromKeyChain,
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import {
  accountSignedIn as accountSignedInAction,
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
import quickActions from '../../constants/quickActions';

// there is a warning in RNOS module. remove this then that warning is fixed
console.disableYellowBox = true; // eslint-disable-line

@connect(state => ({
  accounts: state.accounts,
  settings: state.settings,
}), {
  accountSignedIn: accountSignedInAction,
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

  toggleView = () => {
    this.setState({
      view: this.state.view === 'form' ? 'biometricAuth' : 'form',
    });
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
        this.setState({
          view: 'biometricAuth',
          storedPassphrase: password,
        });
      } else {
        this.setState({
          view: 'form',
        });
      }
    }, delay);
  }

  promptBioAuth = (passphrase, cb) => {
    const { settingsUpdated, t } = this.props;
    settingsUpdated({
      bioAuthRecommended: true,
    });

    Alert.alert(
      t('For ease of sign in'),
      t('Do you want to use Biometric Authentication?'),
      [
        {
          text: t('Cancel'),
          onPress: () => cb(passphrase),
          style: 'cancel',
        },
        {
          text: t('OK'),
          onPress: () => {
            bioMetricAuthentication({
              description: t('Do you want to use Biometric Authentication?'),
              successCallback: () => {
                this.hideDialog(() => {
                  storePassphraseInKeyChain(passphrase);
                  settingsUpdated({
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
    });

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

  /**
   * Will be called when sign in form is submitted
   * determines to show the bioAuth recommendation
   * and also sets the account basic (offline) info
   *
   * @param {String} passphrase - valid mnemonic passphrase
   * @param {String} submissionType - 'form' or 'biometricAuth'
   */
  onFormSubmission = (passphrase, submissionType) => {
    const { settings } = this.props;

    this.setState({
      passphrase,
    });

    if (settings.sensorType && !settings.bioAuthRecommended && submissionType === 'form') {
      this.promptBioAuth(passphrase, this.signIn);
    } else {
      this.signIn(passphrase);
    }
  }

  onDeepLinkRequested = (event) => {
    const isSignedIn = !!this.props.accounts.passphrase;

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

  setupDeepLinking() {
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

  onQuickActionRequested = (action) => {
    if (!action || !action.userInfo) {
      return;
    }

    const { userInfo: { url } } = action;
    const isSignedIn = !!this.props.accounts.passphrase;

    if (isSignedIn) {
      this.navigateToDeepLink(url);
    } else {
      this.setState({ deepLinkURL: url });
    }
  }

  setupQuickActions() {
    if (!this.props.navigation.getParam('signOut')) {
      QuickActions.setShortcutItems(quickActions);
      QuickActions.popInitialAction()
        .then((action) => {
          if (action && action.userInfo) {
            this.setState({ deepLinkURL: action.userInfo.url });
          }
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log('An error occurred while getting initial quick action', error));
    }

    DeviceEventEmitter.removeAllListeners('quickActionShortcut');
    DeviceEventEmitter.addListener('quickActionShortcut', this.onQuickActionRequested);
  }

  componentDidMount() {
    this.props.settingsRetrieved();
    this.setupDeepLinking();
    this.setupQuickActions();
  }

  componentDidUpdate() {
    const { settings, navigation } = this.props;
    const { destinationDefined } = this.state;

    if (settings.validated && !destinationDefined) {
      if (settings.showedIntro) {
        this.init();
      } else {
        navigation.navigate('Intro');
      }
      this.setState({ destinationDefined: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { view, storedPassphrase, androidDialog } = this.state;
    const { sensorType, hasStoredPassphrase } = this.props.settings;
    const signOut = this.props.navigation.getParam('signOut');

    return (<View style={styles.wrapper}>
      <Splash animate={!signOut} />
      {
        view === 'biometricAuth' ?
          <BiometricAuth
            animate={!signOut}
            toggleView={this.toggleView}
            sensorType={sensorType}
            passphrase={storedPassphrase}
            signIn={this.onFormSubmission} /> : null
      }
      {
        view === 'form' ?
          <Form
            animate={!signOut}
            navigation={this.props.navigation}
            toggleView={this.toggleView}
            sensorType={sensorType}
            showBackButton={hasStoredPassphrase && sensorType}
            signIn={this.onFormSubmission}
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

export default translate()(SignIn);
