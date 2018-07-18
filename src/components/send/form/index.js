import React, { Fragment } from 'react';
import { View, DeviceInfo, Platform } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PrimaryButton } from '../../toolBox/button';
import { P, H1 } from '../../toolBox/typography';
import styles from './styles';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';

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
      amount: str => reg.amount.test(str),
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
    const keyboardButtonStyle = Platform.OS === 'ios' ?
      {
        backgroundColor: 'transparent',
        marginBottom: DeviceInfo.isIPhoneX_deprecated ? -98 : -65,
      } :
      {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
      };
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
          <H1>Send</H1>
          <P style={styles.subtitle}>Send Lisk tokens to other accounts</P>
        </View>
        <View>
          <Input
            label='Address'
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
            label='Amount'
            reference={(input) => { this.references[1] = input; }}
            styles={{ errorMessage: styles.errorMessage, input: styles.input }}
            onChange={value => this.changeHandler('amount', value)}
            value={this.state.amount.value}
            error={
              this.state.amount.validity === 1 ?
                'Invalid amount value' : ''
            }
            onFocus={() => { this.activeInputRef = 1; }}
          />
          <Input
            label='Reference'
            reference={(input) => { this.references[2] = input; }}
            styles={{ errorMessage: styles.errorMessage, input: styles.input }}
            multiline={true}
            onChange={value => this.changeHandler('reference', value)}
            error={
              this.state.reference.validity === 1 ?
                'Maximum length of 64 characters is exceeded.' : ''
            }
            onFocus={() => { this.activeInputRef = 2; }}
          />
          </View>
          <PrimaryButton
            disabled={this.state.address.validity !== 0 || this.state.amount.validity !== 0}
            onClick={this.goToNextState}
            style={[styles.button, { opacity: this.state.opacity }]}
            title='Next' />
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAccessoryView
         style={keyboardButtonStyle}>
          <PrimaryButton
            disabled={this.state.address.validity !== 0 || this.state.amount.validity !== 0}
            onClick={this.goToNextState}
            title='Next' />
        </KeyboardAccessoryView>
      </Fragment>
    );
  }
}

export default Form;
