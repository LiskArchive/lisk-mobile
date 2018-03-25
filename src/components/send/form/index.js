import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

class Form extends React.Component {
  state = {
    address: '',
    amount: ''
  }
  changeInput = (val, name) => {
    if (val) {
      this.setState({ [name]: val });
    }
  }

  goToNextState = () => {
    console.log(this.state);
    this.props.nextStep({
      amount: this.state.amount,
      address: this.state.address,
    });
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#ffffff',
      },
      button: {
        top: 20,
      },
    });
    return (<View style={styles.container}>
        <View>
          <FormLabel>Address</FormLabel>
          <FormInput
            ref={input => this.address = input }
            onChangeText={(val) => this.changeInput(val, 'address')}/>
          <FormLabel>Amount</FormLabel>
          <FormInput
            ref={input => this.amount = input }
            onChangeText={(val) => this.changeInput(val, 'amount')}/>
          <Button
            onPress={this.goToNextState}
            buttonStyle={styles.button}
            backgroundColor='#03A9F4'
            title='Next' />
        </View>
      </View>);
  }
}

export default Form;