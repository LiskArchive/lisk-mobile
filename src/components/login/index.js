import React from 'react';
import connect from 'redux-connect-decorator';
import { KeyboardAvoidingView, View } from 'react-native';
import {
  FormLabel,
  FormInput, FormValidationMessage,
} from 'react-native-elements';
import { PrimaryButton } from '../toolBox/button';
import { accountLoggedIn as accountLoggedInAction } from '../../actions/accounts';
import styles from './styles';
import { validatePassphrase } from '../../utilities/passphrase';
import Logo from '../logo';

/**
 * The container component containing login and create account functionality
 */
const pass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

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
        value: pass,
        validity: validatePassphrase(pass),
      },
    };
  }

  componentDidUpdate() {
    if (this.props.accounts.active) {
      this.props.navigation.replace('Main');
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
  onLoginSubmission(passphrase) {
    if (passphrase.validity.length !== 0) {
      this.passphraseInput.shake();
    } else {
      this.props.accountLoggedIn({
        passphrase: this.trim(passphrase.value),
      });
    }
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

  render() {
    const { passphrase } = this.state;
    const error = passphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || passphrase.validity.length === 1);
    return (<KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
      <View style={styles.container}>
        <Logo />
        <FormLabel>Passphrase</FormLabel>
        <FormInput
          style={styles.input}
          autoCapitalize = 'none'
          multiline = {true}
          ref={(ref) => { this.passphraseInput = ref; }}
          value={passphrase.value}
          onChangeText={this.changeHandler.bind(this, 'passphrase')}/>
        <FormValidationMessage labelStyle={styles.errorMessage}>
        { error.length ? error[0].message.replace(' Please check the passphrase.', '') : '' }
        </FormValidationMessage>
        <PrimaryButton
          style={styles.button}
          disabled={passphrase.validity.length !== 0}
          onClick={this.onLoginSubmission.bind(this, passphrase)}>Login</PrimaryButton>
      </View>
    </KeyboardAvoidingView>);
  }
}

export default Login;
