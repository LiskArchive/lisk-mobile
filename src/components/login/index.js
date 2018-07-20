import React, { Fragment } from 'react';
import connect from 'redux-connect-decorator';
import { View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { PrimaryButton } from '../toolBox/button';
import { accountLoggedIn as accountLoggedInAction } from '../../actions/accounts';
import styles from './styles';
import { validatePassphrase } from '../../utilities/passphrase';
import Logo from '../logo';
import Input from '../toolBox/input';

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
        buttonStyle: null,
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
  onLoginSubmission = (passphrase) => {
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

  shrinkButton = (status) => {
    if (status) {
      this.setState({ buttonStyle: styles.button });
    } else {
      this.setState({ buttonStyle: null });
    }
  }

  render() {
    const { passphrase } = this.state;
    const error = passphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || passphrase.validity.length === 1);
    return (<Fragment>
      <KeyboardAwareScrollView
        onKeyboardDidHide={() => this.shrinkButton(true)}
        onKeyboardDidShow={() => this.shrinkButton(false)}
        style={styles.content}>
        <View style={styles.container}>
          <View>
            <Logo />
            <Input
              label='Passphrase'
              reference={(ref) => { this.passphraseInput = ref; }}
              styles={{ input: styles.input }}
              value={passphrase.value}
              onChange={this.changeHandler.bind(this, 'passphrase')}
              onFocus={() => this.shrinkButton(false)}
              onBlur={() => this.shrinkButton(true)}
              multiline={true}
              autoFocus={true}
              autoCorrect={false}
              error={
                (error.length > 0 && error[0].message && error[0].message.length > 0) ?
                error[0].message.replace(' Please check the passphrase.', '') : ''
              }
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAccessoryView
      style={[{
        borderTopColor: '#fff',
        backgroundColor: '#fff',
      }, Platform.OS === 'ios' ? null : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }]}
      animationOn={false}
      alwaysVisible={true} >
        <PrimaryButton
        style={this.state.buttonStyle}
        disabled={passphrase.validity.length !== 0}
        onClick={this.onLoginSubmission.bind(this, passphrase)}>Login</PrimaryButton>
      </KeyboardAccessoryView>
    </Fragment>);
  }
}

export default Login;
