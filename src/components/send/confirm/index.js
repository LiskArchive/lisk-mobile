import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import connect from 'redux-connect-decorator';
import { transactionAdded } from '../../../actions/transactions';
import styles from './styles'

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
