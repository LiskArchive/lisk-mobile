import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validatePassphrase } from '../../../utilities/passphrase';
import { extractPublicKey } from '../../../utilities/api/account';
import Input from '../../toolBox/input';
import StickyButton from '../tools/stickyButton';
import { H1, P } from '../../toolBox/typography';
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
      buttonStyle: null,
    },
  }

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: true, action: this.goBack });
  }

  // eslint-disable-next-line class-methods-use-this
  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
  }

  onSubmission = (secondPassphrase) => {
    const { amount, address, reference } = this.props;
    this.props.nextStep({
      amount,
      address,
      reference,
      secondPassphrase,
    });
  }

  validatePassphrase = (passphrase) => {
    const validity = validatePassphrase(passphrase);
    if (validity.length === 0 &&
      extractPublicKey(passphrase) !== this.props.accounts.active.secondPublicKey) {
      validity.push({
        code: 'dose_not_belong',
        message: 'This passphrase does not belong to current account.',
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

  shrinkButton = (status) => {
    if (status) {
      this.setState({ buttonStyle: styles.button });
    } else {
      this.setState({ buttonStyle: styles.buttonSticky });
    }
  }

  goBack = () => {
    const { address, amount, reference } = this.props;
    return this.props.prevStep({ address, amount, reference });
  }

  render() {
    const { secondPassphrase } = this.state;
    const error = secondPassphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || secondPassphrase.validity.length === 1);
    return (<View style={styles.wrapper}>
      <KeyboardAwareScrollView animated={true}
        style={styles.container}
        onKeyboardDidHide={() => this.shrinkButton(true)}
        onKeyboardDidShow={() => this.shrinkButton(false)}>
        <View style={styles.innerContainer}>
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
          </View>
          <Input
            label='Second Passphrase'
            reference={(ref) => { this.SecondPassphraseInput = ref; }}
            styles={{ input: styles.input }}
            value={secondPassphrase.value}
            onChange={this.changeHandler}
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
        </View>
      </KeyboardAwareScrollView>
      <StickyButton title='Continue'
        disabled={secondPassphrase.validity.length !== 0}
        onClick={this.onSubmission}/>
    </View>);
  }
}

export default Confirm;
