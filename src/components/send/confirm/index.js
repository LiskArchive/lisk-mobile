import React from 'react';
import { Text, View } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import connect from 'redux-connect-decorator';
import { transactionAdded } from '../../../actions/transactions';
import styles from './styles'
import { toRawLsk } from  '../../../utilities/conversions';

@connect(state => ({ 
  accounts: state.accounts,
}), { 
  transactionAdded,
})

class Form extends React.Component {
  send = () => {
    const { amount, address, accounts,
      transactionAdded, nextStep } = this.props;
    const activeAccount = accounts.list[accounts.active];
    transactionAdded({
      recipientId: address,
      amount: toRawLsk(amount),
      secret: activeAccount.passphrase,
      secondSecret: null,
    }, activeAccount);
    nextStep()
  }

  render() {
    const { address, amount } = this.props;
    return (<View style={styles.container}>
      <View style={styles.verticalAligner}>
        <Text style={[styles.heading, styles.centerAlign, styles.gray]}>Confirm to send</Text>
        <View style={styles.row}>
          <FormLabel>To:</FormLabel>
          <FormLabel labelStyle={[styles.address, styles.black]}>{address}</FormLabel>
          <Text></Text>
        </View>
        <View style={styles.row}>
          <FormLabel>Total (including 0.1LSK fee):</FormLabel>
          <FormLabel labelStyle={[styles.amount, styles.black]}>{`${parseFloat(amount) + 0.1} LSK`}</FormLabel>
        </View>
        <Button
          backgroundColor='#ff6236'
          style={styles.button}
          onPress={this.send}
          title='Next' />
      </View>
    </View>);
  }
}

export default Form;
