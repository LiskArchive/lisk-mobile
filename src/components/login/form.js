import React from 'react';
import { Platform, View, Animated } from 'react-native';
import styles from './styles';
import Input from '../toolBox/input';
import { validatePassphrase } from '../../utilities/passphrase';
import { Small, P, A } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import KeyboardAwareScrollView from '../toolBox/keyboardAwareScrollView';

const devDefaultPass = process.env.passphrase || '';

const Extras = ({ error, onPress, opacity }) => (<View>
  <View style={[styles.connectionErrorContainer, error ? styles.visible : null]}>
    <Icon size={16} name='error' style={styles.connectionErrorIcon} />
    <Small style={styles.connectionError}>
      Could not connect to the blockchain, try later!
    </Small>
  </View>

  <Animated.View style={[styles.linkWrapper, styles.row, { opacity }]}>
    <P style={styles.question}>{"Don't have a Lisk ID? "}</P>
    <A style={styles.link} onPress={onPress}>Create it now</A>
  </Animated.View>
</View>);

class Form extends React.Component {
  state = {
    passphrase: {
      value: devDefaultPass,
      validity: validatePassphrase(devDefaultPass),
      buttonStyle: null,
    },
    animation: {
      opacity: new Animated.Value(0),
    },
  };

  showKeyboard = () => {
    setTimeout(() => {
      if (this.props.navigation &&
        this.props.navigation.isFocused() &&
        this.passphraseInput) {
        this.passphraseInput.focus();
      }
    }, 500);
  }

  // eslint-disable-next-line class-methods-use-this
  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
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

  shrinkButton = (status) => {
    if (status) {
      this.setState({ buttonStyle: styles.button });
    } else {
      this.setState({ buttonStyle: styles.buttonSticky });
    }
  }

  onLoginSubmission(passphrase) {
    this.passphraseInput.blur();
    this.props.login(passphrase);
  }

  animate = () => {
    const { animate } = this.props;
    const { opacity } = this.state.animation;

    Animated.timing(opacity, {
      toValue: 1,
      duration: animate ? 400 : 0,
      delay: animate ? 200 : 0,
    }).start();
  }

  componentDidMount() {
    this.showKeyboard();
    this.animate();
  }

  render() {
    const { passphrase, connectionError } = this.state;
    const {
      opacity,
    } = this.state.animation;
    const error = passphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || passphrase.validity.length === 1);
    return (<View style={styles.container}>
      <Animated.View
        style={[styles.titleContainer, styles.paddingBottom, { opacity }]}>
        <P style={styles.title}>The official Lisk mobile wallet.</P>
      </Animated.View>
      <Animated.View style={[{ opacity }]}>
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
        </Animated.View>
      <KeyboardAwareScrollView
        styles={{}}
        extras={<Extras error={connectionError}
        onPress={this.goToRegistration} opacity={opacity} />}
        disabled={passphrase.validity.length !== 0}
        onSubmit={this.props.login.bind(this, passphrase)}
        button='Sign in'>
      </KeyboardAwareScrollView>
    </View>);
  }
}

export default Form;
