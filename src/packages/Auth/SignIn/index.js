/* eslint-disable max-lines */
/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import {
  LogBox,
  Linking,
  View,
  Alert,
  Platform,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate } from 'react-i18next';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import SplashScreen from 'react-native-splash-screen';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import quickActionsList from 'constants/quickActions';
import FingerprintOverlay from 'components/shared/fingerprintOverlay';
import withTheme from 'components/shared/withTheme';
import deepLinkMapper, { parseDeepLink } from 'utilities/deepLink';
import { deviceHeight } from 'utilities/device';
import {
  getPassphraseFromKeyChain,
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from 'utilities/passphrase';
import {
  accountSignedIn as accountSignedInAction,
  accountFetched as accountFetchedAction,
} from 'actions/accounts';
import {
  settingsUpdated as settingsUpdatedAction,
  settingsRetrieved as settingsRetrievedAction,
} from 'actions/settings';
import { pricesRetrieved as pricesRetrievedAction } from 'actions/service';
import getStyles from './styles';
import Splash from './splash';
import Form from './form';
import BiometricAuth from './biometricAuth';

// there is a warning in RNOS module. remove this then that warning is fixed
LogBox.ignoreAllLogs();

// eslint-disable-next-line max-statements
const SignIn = ({
  styles,
  route,
  settings,
  navigation,
  settingsUpdated,
  t,
  accountSignedIn,
  accountFetched,
  pricesRetrieved,
  accounts,
  settingsRetrieved,
}) => {
  const [view, setView] = useState('splash');
  const [storedPassphrase, setStoredPassphrase] = useState(null);
  const [deepLinkURL, setDeepLinkUrl] = useState('');
  const [androidDialogue, setAndroidDialogue] = useState({
    error: null,
    show: false,
  });
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { sensorType, hasStoredPassphrase } = settings;
  const signOut = route.params?.signOut;
  const timeout = useRef();

  const showDialog = () => {
    setAndroidDialogue((prevState) => ({ ...prevState, show: true }));
  };

  const hideDialog = (cb) => {
    setAndroidDialogue((prevState) => ({ ...prevState, show: false }));
    cb();
  };

  const toggleView = () => {
    setView(view === 'form' ? 'biometricAuth' : 'form');
  };

  const updateView = (password, sensorType) => {
    const delay = view === 'splash' && !signOut ? 1100 : 0;
    timeout.current = setTimeout(() => {
      if (password && sensorType) {
        setView('biometricAuth');
        setStoredPassphrase(password);
      } else {
        setView('form');
      }
    }, delay);
  };

  const defineDefaultAuthMethod = async () => {
    const introShowed = await AsyncStorage.getItem('@lisk-mobile-intro');
    if (!introShowed) {
      navigation.navigate('Intro');
    }
    const { password } = await getPassphraseFromKeyChain();
    let sensorType = null;
    try {
      sensorType = await FingerprintScanner.isSensorAvailable();
    } catch (error) {
      sensorType = null;
    }
    settingsUpdated({
      sensorType,
      hasStoredPassphrase: !!password,
    });
    updateView(password, sensorType);
  };

  const init = () => {
    defineDefaultAuthMethod();
    SplashScreen.hide();
  };

  const promptBioAuth = (passphrase, cb) => {
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
                hideDialog(() => {
                  storePassphraseInKeyChain(passphrase);
                  settingsUpdated({
                    hasStoredPassphrase: true,
                  });
                  cb(passphrase);
                });
              },
              errorCallback: () => { },
              androidError: (error) => {
                setAndroidDialogue((prevState) => ({ ...prevState, error }));
              },
            });

            if (Platform.OS === 'android') {
              showDialog();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToDeepLink = (url) => {
    const linkedScreen = deepLinkMapper(url);
    // eslint-disable-next-line no-console
    if (linkedScreen) {
      if (linkedScreen.params && linkedScreen.params.activeToken) {
        settingsUpdated({
          token: {
            list: settings.token.list,
            active: linkedScreen.params.activeToken,
          },
        });
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            params: { screen: linkedScreen.name, params: linkedScreen.params },
          },
        ],
      });
    } else {
      // @TODO: Navigate to different page or display an error message for unmapped deep links.
      navigation.navigate({ name: 'Home' });
    }
  };

  const signIn = (passphrase) => {
    accountSignedIn({ passphrase });
    accountFetched();
    pricesRetrieved();
    if (deepLinkURL) {
      navigateToDeepLink(deepLinkURL);
    } else {
      navigation.reset({
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
  const onFormSubmission = (passphrase, submissionType) => {
    setStoredPassphrase(passphrase);
    if (
      settings.sensorType
      && !settings.bioAuthRecommended
      && submissionType === 'form'
    ) {
      promptBioAuth(passphrase, signIn);
    } else {
      signIn(passphrase);
    }
  };

  const onDeepLinkRequested = (event) => {
    const isSignedIn = accounts.passphrase;
    if (event.type && event.type === 'Discreet') {
      settingsUpdated({ incognito: true });
    }
    if (isSignedIn) {
      navigateToDeepLink(event.url);
    } else if (!isSignedIn && event.type && event.type === 'Discreet') {
      navigation.popToTop();
    } else {
      setDeepLinkUrl(event.url);
    }
  };

  const setupDeepLinking = () => {
    // After sign out, there's no need to consume the launch URL for further sign-ins.
    if (!route.params || !route.params.signOut) {
      Linking.getInitialURL()
        .then((url) => {
          if (url) {
            const { path, query } = parseDeepLink(url);
            if (path === 'register') {
              // this.passphraseInput.blur();
              navigation.navigate({ name: 'Register', params: query });
            } else {
              setDeepLinkUrl(url);
            }
          }
        })
        .catch((error) =>
          // eslint-disable-next-line no-console
          console.log('An error occurred while getting initial url', error));
    }
    Linking.removeAllListeners('url');
    Linking.addEventListener('url', onDeepLinkRequested);
  };

  const onQuickActionRequested = (quickAction) => {
    if (!quickAction || !quickAction.userInfo) {
      return;
    }
    const {
      userInfo: { url },
      type,
    } = quickAction;
    onDeepLinkRequested({ url, type });
  };

  const setupQuickActions = () => {
    if (!route.params || !route.params.signOut) {
      QuickActions.setShortcutItems(quickActionsList);
      QuickActions.popInitialAction()
        .then((action) => {
          if (action && action.userInfo) {
            setDeepLinkUrl(action.userInfo.url);
          }
        })
        .catch((error) =>
          // eslint-disable-next-line no-console
          console.log(
            'An error occurred while getting initial quick action',
            error
          ));
    }

    DeviceEventEmitter.removeAllListeners('quickActionShortcut');
    DeviceEventEmitter.addListener(
      'quickActionShortcut',
      onQuickActionRequested
    );
  };

  const showSimplifiedView = () => {
    if (Platform.OS === 'android') {
      return keyboardHeight / deviceHeight() > 0.35 && keyboardIsOpen;
    }
    return false;
  };

  const addKeyboardListeners = () => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardIsOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));
  };

  useEffect(() => {
    settingsRetrieved();
    setupDeepLinking();
    setupQuickActions();
    addKeyboardListeners();
    init();
    return () => {
      Keyboard.removeAllListeners();
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <Splash animate={!signOut} showSimplifiedView={showSimplifiedView()} />
      <View style={[styles.container]}>
        {view === 'biometricAuth' ? (
          <BiometricAuth
            animate={!signOut}
            toggleView={toggleView}
            sensorType={sensorType}
            passphrase={storedPassphrase}
            signIn={onFormSubmission}
            showDialog={showDialog}
            hideDialog={hideDialog}
            navigation={navigation}
          />
        ) : null}
        {view === 'form' ? (
          <Form
            animate={!signOut}
            navigation={navigation}
            toggleView={toggleView}
            sensorType={sensorType}
            showBackButton={hasStoredPassphrase && sensorType}
            signIn={onFormSubmission}
            showSimplifiedView={showSimplifiedView()}
          />
        ) : null}
        {Platform.OS === 'android' ? (
          <FingerprintOverlay
            onModalClosed={() => signIn(this.state.passphrase)}
            error={androidDialogue.error}
            show={androidDialogue.show}
          />
        ) : null}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  settings: state.settings,
});

const mapDispatchToProps = {
  accountSignedIn: accountSignedInAction,
  accountFetched: accountFetchedAction,
  settingsUpdated: settingsUpdatedAction,
  settingsRetrieved: settingsRetrievedAction,
  pricesRetrieved: pricesRetrievedAction,
};

export default withTheme(
  translate()(connect(mapStateToProps, mapDispatchToProps)(SignIn)),
  getStyles()
);
