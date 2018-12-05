import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image, Platform } from 'react-native';
import { validatePassphrase } from '../../../utilities/passphrase';
import { extractPublicKey } from '../../../utilities/api/account';
import Input from '../../toolBox/input';
import { H1, P } from '../../toolBox/typography';
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
  state = {
    secondPassphrase: {
      value: '',
      validity: [],
    },
  };

  validator = (passphrase) => {
    const validity = validatePassphrase(passphrase);

    if (
      validity.length === 0 &&
      (extractPublicKey(passphrase) !== this.props.accounts.active.secondPublicKey)
    ) {
      validity.push({
        code: 'dose_not_belong',
        message: 'This is not your second passphrase.',
      });
    }

    return validity;
  }

  componentDidMount() {
    const { navigation, prevStep } = this.props;

    navigation.setParams({
      showButtonLeft: true,
      action: () => prevStep(),
    });
  }

  changeHandler = (value) => {
    this.setState({
      secondPassphrase: {
        value,
        validity: [],
      },
    });
  }

  onSubmit = () => {
    const { secondPassphrase } = this.state;
    const validity = this.validator(secondPassphrase.value);

    if (validity.length) {
      this.setState({
        secondPassphrase: {
          value: secondPassphrase.value,
          validity,
        },
      });
    } else {
      this.props.nextStep({
        ...this.props.sharedData,
        secondPassphrase: this.state.secondPassphrase.value,
      });
    }
  }

  render() {
    const { styles, theme } = this.props;
    const { secondPassphrase } = this.state;

    let errorMessage = '';
    const error = secondPassphrase.validity
      .filter(item => item.code !== 'INVALID_MNEMONIC' || secondPassphrase.validity.length === 1);
    if (error.length) {
      errorMessage = (error[0].message && error[0].message.length > 0) ?
        error[0].message.replace(' Please check the passphrase.', '') :
        '';
    }

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          hasTabBar={true}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}
        >
          <View style={styles.titleContainer}>
            <View style={styles.headings}>
              <H1 style={[styles.title, styles.theme.title]}>Confirm your identity</H1>
              <P style={[styles.subtitle, styles.theme.subtitle]}>
                Enter you second passphrase to continue to transaction overview page.
              </P>
            </View>
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
              error={errorMessage}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Confirm, getStyles());
