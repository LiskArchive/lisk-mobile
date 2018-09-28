import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image, Platform } from 'react-native';
import { validatePassphrase } from '../../../utilities/passphrase';
import { extractPublicKey } from '../../../utilities/api/account';
import Input from '../../toolBox/input';
import { H1, P } from '../../toolBox/typography';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import secondPassphraseImage from '../../../assets/images/secondPassphrase.png';
import styles from './styles';

/**
 * The container component containing login and create account functionality
 */
@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {})
class Confirm extends React.Component {
  state = {
    secondPassphrase: {
      value: '',
      validity: validatePassphrase(''),
      buttonStyle: styles.button,
    },
  }

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: true, action: this.back });
  }

  // eslint-disable-next-line class-methods-use-this
  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
  }

  forward = () => {
    const { amount, address, reference } = this.props;
    this.props.nextStep({
      amount,
      address,
      reference,
      secondPassphrase: this.state.secondPassphrase.value,
    });
  }

  back = () => this.props.prevStep();

  validatePassphrase = (passphrase) => {
    const validity = validatePassphrase(passphrase);
    if (validity.length === 0 &&
      extractPublicKey(passphrase) !== this.props.accounts.active.secondPublicKey) {
      validity.push({
        code: 'dose_not_belong',
        message: 'This is not your second passphrase.',
      });
    }

    return validity;
  }

  /**
   * General change handler to get bound to react component event listeners
   *
   * @param {String} key - The key in react component state to be altered
   * @param {any} value - The corresponding value. interface depends on the key
   *
   * @todo Implement error status/message
   */
  changeHandler = (value) => {
    this.setState({
      secondPassphrase: {
        value,
        validity: this.validatePassphrase(value),
      },
    });
  }

  render() {
    const { secondPassphrase } = this.state;
    const error = secondPassphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || secondPassphrase.validity.length === 1);
    return (<View style={styles.wrapper}>
      <KeyboardAwareScrollView
        disabled={secondPassphrase.validity.length !== 0}
        onSubmit={this.forward}
        hasTabBar={true}
        styles={{ innerContainer: styles.innerContainer }}
        button={{
          title: 'Continue',
          type: 'inBox',
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.headings}>
            <H1>Confirm your identity</H1>
            <P style={styles.subtitle}>
              Enter you second passphrase to continue to transaction overview page.
            </P>
          </View>
          <View style={styles.illustrationWrapper}>
            <Image style={styles.illustration} source={secondPassphraseImage} />
          </View>
          <Input
            label='Second Passphrase'
            reference={(ref) => { this.SecondPassphraseInput = ref; }}
            styles={{ input: styles.input }}
            value={secondPassphrase.value}
            onChange={this.changeHandler}
            autoFocus={true}
            autoCorrect={false}
            multiline={Platform.OS === 'ios'}
            secureTextEntry={Platform.OS !== 'ios'}
            error={
              (error.length > 0 && error[0].message && error[0].message.length > 0) ?
              error[0].message.replace(' Please check the passphrase.', '') : ''
            }/>
        </View>
      </KeyboardAwareScrollView>
    </View>);
  }
}

export default Confirm;
