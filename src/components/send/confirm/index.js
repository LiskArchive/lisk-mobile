import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validatePassphrase } from '../../../utilities/passphrase';
import { PassphraseInput } from '../../toolBox/input';
import StickyButton from '../tools/stickyButton';
import { H1, P } from '../../toolBox/typography';
import secondPassphraseImage from '../../../assets/images/secondPassphrase.png';
import styles from './styles';

const devDefaultPass = process.env.passphrase || '';

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
      value: devDefaultPass,
      validity: validatePassphrase(devDefaultPass),
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
          <PassphraseInput
            label='Second Passphrase'
            toggleFocus={this.shrinkButton}
            reference={(ref) => { this.SecondPassphraseInput = ref; }}
            styles={{ input: styles.input }}
            value={secondPassphrase.value}
            onChange={this.changeHandler.bind(this, 'secondPassphrase')}
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
