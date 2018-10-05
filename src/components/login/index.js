import React, { Fragment } from 'react';
import connect from 'redux-connect-decorator';
import { View, Platform, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { accountLoggedIn as accountLoggedInAction } from '../../actions/accounts';
import styles from './styles';
import { validatePassphrase,
  storePassphraseInKeyChain,
  getPassphraseFromKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import Input from '../toolBox/input';
import { H1, Small, P, A } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import KeyboardAwareScrollView from '../toolBox/keyboardAwareScrollView';

const devDefaultPass = process.env.passphrase || '';

const Extras = ({ error, onPress }) => (<Fragment>
  <View style={[styles.connectionErrorContainer, error ? styles.visible : null]}>
    <Icon size={16} name='error' style={styles.connectionErrorIcon} />
    <Small style={styles.connectionError}>
      Could not connect to the blockchain, try later!
    </Small>
  </View>

  <View style={styles.registerLinkWrapper}>
    <P style={styles.registerQuestion}>{"Don't have a Lisk ID? "}</P>
    <A style={styles.registerLink} onPress={onPress}>Create it now</A>
  </View>
</Fragment>);


/**
 * The container component containing login and create account functionality
 */
@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {
  accountLoggedIn: accountLoggedInAction,
})
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      passphrase: {
        value: devDefaultPass,
        validity: validatePassphrase(devDefaultPass),
        buttonStyle: null,
      },
    };
  }

  async componentDidMount() {
    const { password } = await getPassphraseFromKeyChain();
    this.passphrase = password;
    const login = () => {
      this.passphraseInput.blur();
      this.goToWallet({
        value: password || '',
        validity: validatePassphrase(password || ''),
      });
    };
    if (password) {
      bioMetricAuthentication(login, this.showKeyboard);
    } else {
      this.showKeyboard();
    }
  }

  showKeyboard = () => {
    setTimeout(() => {
      if (this.props.navigation.isFocused()) {
        this.passphraseInput.focus();
      }
    }, 500);
  }

  componentWillUnmount() { // eslint-disable-line
    FingerprintScanner.release();
  }

  componentDidUpdate() {
    if (this.props.accounts.active && this.props.navigation.isFocused()) {
      this.props.navigation
        .dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        }));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
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
    FingerprintScanner.isSensorAvailable().then(() => {
      this.passphraseInput.blur();
      Alert.alert(
        '',
        'would you like to store your passphrase in a secure location on your phone ?',
        [
          {
            text: 'Cancel',
            onPress: () => this.goToWallet(passphrase),
          },
          {
            text: 'OK',
            onPress: () => bioMetricAuthentication(
              () => this.goToWallet(passphrase, true),
              () => this.goToWallet(passphrase),
              'Scan your fingerprint on the device scanner to store your passphrase',
            ),
          },
        ],
        { cancelable: false },
      );
    }).catch(() => this.goToWallet(passphrase));
  }

  /**
   * General change handler to get bound to react component event listeners
   *
   * @param {String} key - The key in react component state to be altered
   * @param {any} value - The corresponding value. interface depends on the key
   *
   * @todo Implement error status/message
   */
  changeHandler(key, value) {
    this.setState({
      [key]: {
        value,
        validity: validatePassphrase(value),
      },
    });
  }

  goToRegistration = () => {
    this.passphraseInput.blur();
    this.props.navigation.navigate('Register');
  }

  goToWallet = (passphrase, authenticated) => {
    if (authenticated) {
      storePassphraseInKeyChain(passphrase.value);
    }
    this.props.accountLoggedIn({
      passphrase: this.trim(passphrase.value),
    }, () => {
      this.setState({
        connectionError: true,
      });
    });
  }

  shrinkButton = (status) => {
    if (status) {
      this.setState({ buttonStyle: styles.button });
    } else {
      this.setState({ buttonStyle: styles.buttonSticky });
    }
  }

  render() {
    const { passphrase, connectionError } = this.state;
    const error = passphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || passphrase.validity.length === 1);
    return (<View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <H1 style={styles.title}>Sign into your account</H1>
      </View>
      <KeyboardAwareScrollView
        extras={<Extras error={connectionError} onPress={this.goToRegistration} />}
        disabled={passphrase.validity.length !== 0}
        onSubmit={this.onLoginSubmission.bind(this, passphrase)}
        button='Sign in'>
        <Input
          label='Passphrase'
          reference={(ref) => { this.passphraseInput = ref; }}
          styles={{ input: styles.input }}
          value={passphrase.value}
          onChange={this.changeHandler.bind(this, 'passphrase')}
          onFocus={() => this.shrinkButton(false)}
          onBlur={() => this.shrinkButton(true)}
          autoFocus={true}
          autoCorrect={false}
          multiline={Platform.OS === 'ios'}
          secureTextEntry={Platform.OS !== 'ios'}
          error={
            (error.length > 0 && error[0].message && error[0].message.length > 0) ?
            error[0].message.replace(' Please check the passphrase.', '') : ''
          }/>
      </KeyboardAwareScrollView>
    </View>);
  }
}

export default Login;
