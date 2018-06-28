import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { PrimaryButton } from '../../toolBox/button';
import styles from './styles';
import reg from '../../../constants/regex';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      address: { value: '', validity: -1 },
      amount: { value: '', validity: -1 },
      reference: { value: '', validity: -1 },
    };

    this.validator = {
      address: str => reg.address.test(str),
      amount: str => reg.amount.test(str),
      reference: str => (str.length === 0 || str.length < 64),
    };
  }

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

  goToNextState = () => {
    this.props.nextStep({
      amount: this.state.amount.value,
      address: this.state.address.value,
      reference: this.state.reference.value,
    });
  }

  render() {
    return (<View style={styles.container}>
        <View>
          <FormLabel>Address</FormLabel>
          <FormInput
            ref={(input) => { this.address = input; }}
            onChangeText={value => this.changeHandler('address', value)}/>
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {
              this.state.address.validity === 1 ?
                'Invalid address' : ''
            }
          </FormValidationMessage>
          <FormLabel>Amount</FormLabel>
          <FormInput
            ref={(input) => { this.amount = input; }}
            onChangeText={value => this.changeHandler('amount', value)}/>
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {
              this.state.amount.validity === 1 ?
                'Invalid amount value' : ''
            }
          </FormValidationMessage>
          <FormLabel>Reference</FormLabel>
          <FormInput
            ref={(input) => { this.reference = input; }}
            onChangeText={value => this.changeHandler('reference', value)}/>
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {
              this.state.reference.validity === 1 ?
                'Maximum length of 64 characters is exceeded.' : ''
            }
          </FormValidationMessage>
          <PrimaryButton
            disabled={this.state.address.validity !== 0 || this.state.amount.validity !== 0}
            onClick={this.goToNextState}
            style={styles.button}
            title='Next' />
        </View>
      </View>);
  }
}

export default Form;
