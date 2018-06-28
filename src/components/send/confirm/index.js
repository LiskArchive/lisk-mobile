import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import styles from './styles';
import { toRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import { H2, H4 } from '../../toolBox/typography';

@connect(state => ({
  accounts: state.accounts,
}), {
  transactionAdded: transactionAddedAction,
})

class Form extends React.Component {
  send = () => {
    const {
      amount, address, accounts, nextStep, transactionAdded, reference,
    } = this.props;
    const activeAccount = accounts.active;
    transactionAdded({
      recipientId: address,
      amount: toRawLsk(amount),
      passphrase: activeAccount.passphrase,
      secondPassphrase: null,
      data: reference || null,
    }, activeAccount);
    nextStep();
  }

  render() {
    const { address, amount, reference } = this.props;
    return (<View style={styles.container}>
      <View style={styles.verticalAligner}>
        <H2 style={[styles.heading, styles.centerAlign, styles.gray]}>Confirm to send</H2>
        <View style={styles.row}>
          <H4 style={styles.label}>To:</H4>
          <H2 labelStyle={[styles.address, styles.black]}>{address}</H2>
        </View>
        <View style={styles.row}>
        <H4 style={styles.label}>Total (including 0.1LSK fee):</H4>
        <H2 labelStyle={[styles.amount, styles.black]}>{`${parseFloat(amount) + 0.1} LSK`}</H2>
        </View>
        {reference ? <View style={styles.row}>
          <H4 style={styles.label}>reference:</H4>
          <H2 labelStyle={[styles.address, styles.black]}>{reference}</H2>
        </View> : null}
        <PrimaryButton
          style={styles.button}
          onClick={this.send}
          title='Next' />
      </View>
    </View>);
  }
}

export default Form;
