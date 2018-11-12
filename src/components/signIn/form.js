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
    isSubmitted: false,
    passphrase: {
      value: devDefaultPass,
      validity: validatePassphrase(devDefaultPass),
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

  onPassphraseChange = (value) => {
    this.setState({
      isSubmitted: false,
      passphrase: {
        value,
        validity: validatePassphrase(value),
      },
    });
  }

  goToRegistration = () => {
    this.passphraseInput.blur();
    this.props.navigation.navigate('Register');
  }

  onSignInSubmission = () => {
    const { passphrase } = this.state;

    this.setState(({ isSubmitted: true }), () => {
      if (!passphrase.validity.length) {
        this.passphraseInput.blur();
        this.props.signIn(passphrase.value);
      }
    });
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

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {
      isSubmitted, passphrase, connectionError, animation: { opacity },
    } = this.state;

    let errorMessage = '';

    if (isSubmitted) {
      const errors = passphrase.validity
        .filter(item => item.code !== 'INVALID_MNEMONIC' || passphrase.validity.length === 1);

      if (errors.length && errors[0].message && errors[0].message.length) {
        errorMessage = errors[0].message.replace(' Please check the passphrase.', '');
      }
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.titleContainer, styles.paddingBottom, { opacity }]}
        >
          <P style={styles.title}>
            The official Lisk mobile wallet.
          </P>
        </Animated.View>
        <Animated.View style={[{ opacity }]}>
          <Input
            label='Passphrase'
            reference={(ref) => { this.passphraseInput = ref; }}
            styles={{ input: styles.input }}
            value={passphrase.value}
            onChange={this.onPassphraseChange}
            autoFocus={true}
            autoCorrect={false}
            multiline={Platform.OS === 'ios'}
            secureTextEntry={Platform.OS !== 'ios'}
            error={errorMessage}
          />
        </Animated.View>
        <KeyboardAwareScrollView
          button='Sign in'
          onSubmit={this.onSignInSubmission}
          disabled={passphrase.value.length === 0}
          extras={
            <Extras
              error={connectionError}
              onPress={this.goToRegistration}
              opacity={opacity}
            />
          }
        />
      </View>
    );
  }
}

export default Form;
