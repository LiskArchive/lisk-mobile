import React, { Fragment } from 'react';
import { View, Platform } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import connect from 'redux-connect-decorator';
import { SecondaryButton } from '../../toolBox/button';
import { fromRawLsk } from '../../../utilities/conversions';
import transactions from '../../../constants/transactions';
import { P, H1, H2, Small } from '../../toolBox/typography';
import styles from './styles';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';
import FormattedNumber from '../../formattedNumber';

@connect(state => ({
  account: state.accounts.active,
}), {})
class Form extends React.Component {
    references = [];
    state = {
      address: { value: '', validity: -1 },
      amount: { value: '', validity: -1 },
      reference: { value: '', validity: -1 },
      opacity: 1,
    };

    validator = {
      address: str => reg.address.test(str),
      amount: str => (
        reg.amount.test(str) &&
        this.props.account &&
        this.props.account.balance > transactions.send.fee &&
        parseFloat(str) < fromRawLsk(this.props.account.balance - transactions.send.fee)
      ),
      reference: str => (str.length === 0 || str.length < 64),
    };
    activeInputRef = null;

  /**
   * @param {String} name - the key to set on state
   * @param {Any} value the Value corresponding the given key
   */
  changeHandler = (name, value) => {
    let validity = -1;
    if (value !== '') {
      validity = this.validator[name](value) ? 0 : 1;
    }

    this.setState({
      [name]: {
        value,
        validity,
      },
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: false });
    if (this.props.prevState.address) {
      const state = {
        address: {
          value: this.props.prevState.address || '',
          validity: 0,
        },
        amount: {
          value: this.props.prevState.amount || '',
          validity: 0,
        },
        reference: {
          value: this.props.prevState.reference || '',
          validity: 0,
        },
      };
      this.setState(state);
    }
  }

  componentWillReceiveProps() {
    const { value } = this.state.amount;
    const validator = this.validator.amount;
    this.setState({
      amount: {
        validity: validator(value),
        value,
      },
    });
  }

  changeButtonOpacity = (val) => {
    this.setState({ opacity: val });
  }

  changeInputFocus = (direction = 1) => {
    let focusingRef = this.activeInputRef + direction;
    if (focusingRef < 0) {
      focusingRef = 0;
    }
    if (focusingRef > 2) {
      focusingRef = 2;
    }
    this.references[`${focusingRef}`].focus();
  }

  goToNextState = () => {
    this.props.nextStep({
      amount: this.state.amount.value,
      address: this.state.address.value,
      reference: this.state.reference.value,
    });
  }

  render() {
    const keyboardButtonStyle = Platform.OS === 'ios' ? 'iosKeyboard' : 'androidKeyboard';
    return (
      <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        contentContainerStyle={Platform.OS === 'ios' ? styles.container : null}
        onKeyboardDidShow={() => this.changeButtonOpacity(0)}
        onKeyboardDidHide={() => this.changeButtonOpacity(1)}
      >
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.headings}>
            <H1>Send</H1>
            <P style={styles.subtitle}>Send LSK tokens to other accounts</P>
          </View>
          <View style={styles.balanceWrapper}>
            <Small style={styles.subtitle}>YOUR CURRENT BALANCE</Small>
            <View style={styles.balanceValue}>
              <H2 style={styles.number}>
                <FormattedNumber>
                  {fromRawLsk(this.props.account ? this.props.account.balance : 0)}
                </FormattedNumber>
              </H2>
              <H2 style={styles.unit}>Ⱡ</H2>
            </View>
          </View>
        </View>
        <View>
          <Input
            label='Address'
            autoCorrect={false}
            reference={(input) => { this.references[0] = input; }}
            styles={{ errorMessage: styles.errorMessage, input: styles.input }}
            onChange={value => this.changeHandler('address', value)}
            value={this.state.address.value}
            error={
              this.state.address.validity === 1 ?
                'Invalid address' : ''
            }
            onFocus={() => { this.activeInputRef = 0; }}
          />
          <Input
            label='Amount (Ⱡ)'
            autoCorrect={false}
            reference={(input) => { this.references[1] = input; }}
            styles={{ input: styles.input }}
            onChange={value => this.changeHandler('amount', value)}
            value={this.state.amount.value}
            error={
              this.state.amount.validity === 1 ?
                'Invalid amount value' : ''
            }
            onFocus={() => { this.activeInputRef = 1; }}
          />
          <Input
            label='Reference (Optional)'
            autoCorrect={false}
            reference={(input) => { this.references[2] = input; }}
            styles={{ errorMessage: styles.errorMessage, input: styles.input }}
            multiline={true}
            onChange={value => this.changeHandler('reference', value)}
            value={this.state.reference.value}
            error={
              this.state.reference.validity === 1 ?
                'Maximum length of 64 characters is exceeded.' : ''
            }
            onFocus={() => { this.activeInputRef = 2; }}
          />
          </View>
          <SecondaryButton
            disabled={this.state.address.validity !== 0 || this.state.amount.validity !== 0}
            onClick={this.goToNextState}
            style={[styles.button, { opacity: this.state.opacity }]}
            title='Continue' />
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAccessoryView
         style={styles[keyboardButtonStyle]}>
          <SecondaryButton
            style={styles.stickyButton}
            disabled={this.state.address.validity !== 0 || this.state.amount.validity !== 0}
            onClick={this.goToNextState}
            title='Continue' />
        </KeyboardAccessoryView>
      </Fragment>
    );
  }
}

export default Form;
