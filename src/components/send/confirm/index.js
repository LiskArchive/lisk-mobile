import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import connect from 'redux-connect-decorator';
import { transactionAdded } from '../../../actions/transactions';

@connect(state => ({ 
  accounts: state.accounts,
}), { 
  transactionAdded,
})
class Form extends React.Component {
  send = () => {
    const { amount, address, accounts,
      transactionAdded, nextStep } = this.props;
    transactionAdded({
      recipientId: address,
      amount: amount,
      secret: accounts.passphrase,
      secondSecret: null,
    }, accounts);
    nextStep()
  }

  render() {
    const { address, amount } = this.props;
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#ffffff',
      },
      inner: {
        padding: 20
      },
      button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 20
      },
    });
    return (<View style={styles.container}>
      <Card
        title={`${amount} LSK`}>
        <Text>To: {address}</Text>
        <Button
          backgroundColor='#03A9F4'
          style={styles.button}
          onPress={this.send}
          title='Next' />
      </Card>
    </View>);
  }
}

export default Form;