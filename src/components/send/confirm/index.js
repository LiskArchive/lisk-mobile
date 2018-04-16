import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
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
      <Card
        title={`${amount} LSK`}>
        <Text>To: {address}</Text>
        <Button
          backgroundColor='#ff6236'
          style={styles.button}
          onPress={this.send}
          title='Next' />
      </Card>
    </View>);
  }
}

export default Form;
