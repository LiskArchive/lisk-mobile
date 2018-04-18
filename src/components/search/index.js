import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from './styles';
import reg from '../../constants/regex';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      query: {
        value: '',
        validity: -1,
      },
    };

    this.validator = {
      query: str => true,
    };
  }

  /**
   * Uses validation regex statements to define
   * the type of query input and navigate to the
   * appropriate page with required properties
   *
   * @todo Else statement required
   */
  search() {
    const query = this.state.query.value;
    if (reg.address.test(query)) {
      this.props.navigation.navigate('Wallet', { key: 'address', address: query });
    } else if (reg.publicKey.test(query)) {
      this.props.navigation.navigate('Wallet', { key: 'publicKey', publicKey: query });
    } else if (reg.delegateName.test(query)) {
      this.props.navigation.navigate('Wallet', { key: 'delegateName', delegateName: query });
    } else if (reg.transactionId.test(query)) {
      this.props.navigation.navigate('transactionDetail');
    }
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

    this.setState({[name]: {
      value,
      validity,
    }});
  }

  render() {
    return (<View>
      <FormLabel style={styles.title}>Search for Lisk ID, Tx ID or delegate name</FormLabel>
      <FormInput
        ref={input => this.query = input }
        onChangeText={(value) => this.changeHandler('query', value)}/>
      <Button
        disabled={this.state.query.value.length < 2}
        onPress={this.search.bind(this)}
        buttonStyle={styles.button}
        backgroundColor='#ff6236'
        title='Sch' />
    </View>);
  }
}

export default Search;
