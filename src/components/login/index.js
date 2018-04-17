import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { Button, FormLabel,
  FormInput, FormValidationMessage } from 'react-native-elements'
import { accountSaved, accountLoggedIn } from '../../actions/accounts';
import styles from './styles';
import { validatePassphrase } from '../../utilities/passphrase';
import Logo from '../logo';

@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {
  accountLoggedIn,
  accountSaved,
})

/**
 * The container component containing login and create account functionality
 * 
 * @todo 
 */
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      passphrase: {
        value: 'reopen parrot fever infant general life surface this frame village color position',
        validity: validatePassphrase(''),
      },
      messages: [
        '',
        'No non-mnemonic or duplicated words',
        'Passphrase is short',
      ],
    };
  }

  componentDidUpdate() {
    if (this.props.accounts.active) {
      this.props.navigation.navigate({
        routeName: 'Main',
        params: { address: '6307319849853921018L', key: 'address' },
      });
    }
  }

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
    if (passphrase.validity !== 0 && passphrase.validity !== 3) {
      this.passphraseInput.shake()
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
    const { passphrase, messages } = this.state;
    return (<View style={styles.content}>
      <View style={styles.container}>
        <Logo />
        <FormLabel>Passphrase</FormLabel>
        <FormInput
          styles={styles.input}
          ref={ref => this.passphraseInput = ref}
          value={passphrase.value}
          onChangeText={this.changeHandler.bind(this, 'passphrase')}/>
        <FormValidationMessage labelStyle={styles.errorMessage}>
          {
            (passphrase.validity === 1 ||
            passphrase.validity === 2) ?
            messages[passphrase.validity] : ''
          }
        </FormValidationMessage>
        <Button
          style={styles.button}
          backgroundColor='#ff6236'
          onPress={this.onLoginSubmission.bind(this, passphrase)}
          title="Login"/>
      </View>
    </View>);
  }
}

export default Login;
