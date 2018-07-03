import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../../toolBox/button';
import styles from './styles';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';

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
          <Input
            label='Address'
            reference={(input) => { this.address = input; }}
            styles={{ errorMessage: styles.errorMessage }}
            onChange={value => this.changeHandler('address', value)}
            error={
              this.state.address.validity === 1 ?
                'Invalid address' : ''
            }
          />
          <Input
            label='Amount'
            reference={(input) => { this.amount = input; }}
            styles={{ errorMessage: styles.errorMessage }}
            onChange={value => this.changeHandler('amount', value)}
            error={
              this.state.amount.validity === 1 ?
                'Invalid amount value' : ''
            }
          />
          <Input
            label='Reference'
            reference={(input) => { this.reference = input; }}
            styles={{ errorMessage: styles.errorMessage }}
            multiline={true}
            onChange={value => this.changeHandler('reference', value)}
            error={
              this.state.reference.validity === 1 ?
                'Maximum length of 64 characters is exceeded.' : ''
            }
          />
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
