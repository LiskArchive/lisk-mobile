import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image, Platform } from 'react-native';
import { validatePassphrase } from '../../../utilities/passphrase';
import { extractPublicKey } from '../../../utilities/api/account';
import Input from '../../toolBox/input';
import { P } from '../../toolBox/typography';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import secondPassphraseImageLight from '../../../assets/images/secondPassphrase3xLight.png';
import secondPassphraseImageDark from '../../../assets/images/secondPassphrase3xDark.png';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { themes } from '../../../constants/styleGuide';

@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {})
class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondPassphrase: {
        value: '',
        validity: validatePassphrase(''),
        buttonStyle: props.styles.button,
      },
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: 'Confirm your identity',
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
  }

  forward = () => {
    this.props.nextStep({
      ...this.props.sharedData,
      secondPassphrase: this.state.secondPassphrase.value,
    });
  }

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

  changeHandler = (value) => {
    this.setState({
      secondPassphrase: {
        value,
        validity: this.validatePassphrase(value),
      },
    });
  }

  render() {
    const { styles, theme } = this.props;
    const { secondPassphrase } = this.state;

    const error = secondPassphrase.validity
      .filter(item =>
        item.code !== 'INVALID_MNEMONIC' || secondPassphrase.validity.length === 1);

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
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
            <P style={[styles.subtitle, styles.theme.subtitle]}>
              Enter you second passphrase to continue to transaction overview page.
            </P>
            <View style={styles.illustrationWrapper}>
              {
                theme === themes.light ?
                  <Image style={styles.illustration} source={secondPassphraseImageLight} /> :
                  <Image style={styles.illustration} source={secondPassphraseImageDark} />
              }
            </View>
            <Input
              label='Second Passphrase'
              reference={(ref) => { this.SecondPassphraseInput = ref; }}
              innerStyles={{ input: styles.input }}
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
      </View>
    );
  }
}

export default withTheme(Confirm, getStyles());
