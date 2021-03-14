import React from 'react';
import { LogBox } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  Linking,
  View,
  Alert,
  Platform,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
import { CommonActions } from '@react-navigation/native';
import QuickActions from 'react-native-quick-actions'; // eslint-disable-line
import FingerprintOverlay from '../../shared/fingerprintOverlay';
import styles from './styles';
import {
  getPassphraseFromKeyChain,
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from '../../../utilities/passphrase';
import {
  accountSignedIn as accountSignedInAction,
  accountFetched as accountFetchedAction,
} from '../../../actions/accounts';
import {
  settingsUpdated as settingsUpdatedAction,
  settingsRetrieved as settingsRetrievedAction,
} from '../../../actions/settings';
import { pricesRetrieved as pricesRetrievedAction } from '../../../actions/service';
import Splash from './splash';
import Form from './form';
import BiometricAuth from './biometricAuth';
import deepLinkMapper, { parseDeepLink } from '../../../utilities/deepLink';
import quickActionsList from '../../../constants/quickActions';
import { deviceHeight } from '../../../utilities/device';

// there is a warning in RNOS module. remove this then that warning is fixed
console.disableYellowBox = true; // eslint-disable-line

@connect(
  state => ({
    accounts: state.accounts,
    settings: state.settings,
    }),
  {
  accountSignedIn: accountSignedInAction,
  accountFetched: accountFetchedAction,
  settingsUpdated: settingsUpdatedAction,
  settingsRetrieved: settingsRetrievedAction,
  pricesRetrieved: pricesRetrievedAction,
  }
)
class SignIn extends React.Component {
  deepLinkURL = '';
  state = {
    destinationDefined: false,
    storedPassphrase: null,
    view: 'splash',
    androidDialog: {
      error: null,
      show: false,
    },
    keyboardIsOpen: false,
    keyboardHeight: '',
  };

  init = () => {
    this.defineDefaultAuthMethod();
    SplashScreen.hide();
  };

  showDialog = () => {
    const { androidDialog } = this.state;
    androidDialog.show = true;
    this.setState({ androidDialog });
  };

  hideDialog = cb => {
    const { androidDialog } = this.state;
    androidDialog.show = false;
    this.setState({ androidDialog }, cb);
  };

  toggleView = () => {
    this.setState({
      view: this.state.view === 'form' ? 'biometricAuth' : 'form',
    });
  };

  async defineDefaultAuthMethod() {
    const { password } = await getPassphraseFromKeyChain();
    let sensorType = null;
    try {
      sensorType = await FingerprintScanner.isSensorAvailable();
    } catch (error) {
      sensorType = null;
    }
    const signOut = this.props.route.params?.signOut;
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
              androidError: error => {
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
      { cancelable: false }
    );
  };

  signIn = passphrase => {
    this.props.accountSignedIn({ passphrase });
    this.props.accountFetched();
    this.props.pricesRetrieved();
    if (this.deepLinkURL) {
      this.navigateToDeepLink(this.deepLinkURL);
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

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
    if (
      settings.sensorType &&
      !settings.bioAuthRecommended &&
      submissionType === 'form'
    ) {
      this.promptBioAuth(passphrase, this.signIn);
    } else {
      this.signIn(passphrase);
    }
  };

  onDeepLinkRequested = event => {
    const isSignedIn = !!this.props.accounts.passphrase;
    if (event.type && event.type === 'Discreet') {
      this.props.settingsUpdated({ incognito: true });
    }
    if (isSignedIn) {
      this.navigateToDeepLink(event.url);
    } else if (!isSignedIn && event.type && event.type === 'Discreet') {
      this.props.navigation.popToTop();
    } else {
      this.deepLinkURL = event.url;
    }
  };

  navigateToDeepLink = url => {
    const { navigation, settings, settingsUpdated } = this.props;
    const linkedScreen = deepLinkMapper(url);
    // eslint-disable-next-line no-console
    console.log('in sign in', url, linkedScreen);
    if (linkedScreen) {
      if (linkedScreen.params && linkedScreen.params.activeToken) {
        settingsUpdated({
          token: {
            list: settings.token.list,
            active: linkedScreen.params.activeToken,
          },
        });
      }

      navigation.navigate({ name: linkedScreen.name, params: linkedScreen.params });
    } else {
      // @TODO: Navigate to different page or display an error message for unmapped deep links.
      navigation.navigate({ name: 'Home' });
    }
  };

  setupDeepLinking() {
    // After sign out, there's no need to consume the launch URL for further sign-ins.
    if (!this.props.route.params || !this.props.route.params.signOut) {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            const { path, query } = parseDeepLink(url);
            if (path === 'register') {
              // this.passphraseInput.blur();
              this.props.navigation.navigate({ name: 'Register', params: query });
            } else {
              this.deepLinkURL = url;
            }
          }
        })
        .catch(error =>
          // eslint-disable-next-line no-console
          console.log('An error occurred while getting initial url', error));
    }
    Linking.removeAllListeners('url');
    Linking.addEventListener('url', this.onDeepLinkRequested);
  }

  onQuickActionRequested = quickAction => {
    if (!quickAction || !quickAction.userInfo) {
      return;
    }
    const {
      userInfo: { url },
      type,
    } = quickAction;
    this.onDeepLinkRequested({ url, type });
  };

  setupQuickActions() {
    if (!this.props.route.params || !this.props.route.params.signOut) {
      QuickActions.setShortcutItems(quickActionsList);
      QuickActions.popInitialAction()
        .then(action => {
          if (action && action.userInfo) {
            this.deepLinkURL = action.userInfo.url;
          }
        })
        .catch(error =>
          // eslint-disable-next-line no-console
          console.log(
            'An error occurred while getting initial quick action',
            error
          ));
    }

    DeviceEventEmitter.removeAllListeners('quickActionShortcut');
    DeviceEventEmitter.addListener(
      'quickActionShortcut',
      this.onQuickActionRequested
    );
  }

  showSimplifiedView() {
    if (Platform.OS === 'android') {
      return (
        this.state.keyboardHeight / deviceHeight() > 0.35 &&
        this.state.keyboardIsOpen
      );
    }
    return false;
  }

  componentDidMount() {
    this.props.settingsRetrieved();
    this.setupDeepLinking();
    this.setupQuickActions();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this.setState({
        keyboardIsOpen: true,
        keyboardHeight: e.endCoordinates.height,
      }));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({ keyboardIsOpen: false }));
  }

  componentDidUpdate() {
    const { settings, navigation } = this.props;
    const { destinationDefined } = this.state;

    if (settings.validated && !destinationDefined) {
      if (settings.showedIntro) {
        this.init();
      } else {
        navigation.push('Intro');
      }
      this.setState({ destinationDefined: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { view, storedPassphrase, androidDialog } = this.state;
    const { sensorType, hasStoredPassphrase } = this.props.settings;
    const signOut = this.props.route.params?.signOut;
    return (
      <View style={styles.wrapper}>
        <Splash
          animate={!signOut}
          showSimplifiedView={this.showSimplifiedView()}
        />
        <View style={styles.container}>
          {view === 'biometricAuth' ? (
            <BiometricAuth
              animate={!signOut}
              toggleView={this.toggleView}
              sensorType={sensorType}
              passphrase={storedPassphrase}
              signIn={this.onFormSubmission}
              showDialog={this.showDialog}
              hideDialog={this.hideDialog}
              navigation={this.props.navigation}
            />
          ) : null}
          {view === 'form' ? (
            <Form
              animate={!signOut}
              navigation={this.props.navigation}
              toggleView={this.toggleView}
              sensorType={sensorType}
              showBackButton={hasStoredPassphrase && sensorType}
              signIn={this.onFormSubmission}
              showSimplifiedView={this.showSimplifiedView()}
            />
          ) : null}
          {Platform.OS === 'android' ? (
            <FingerprintOverlay
              onModalClosed={() => this.signIn(this.state.passphrase)}
              error={androidDialog.error}
              show={androidDialog.show}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default translate()(SignIn);
