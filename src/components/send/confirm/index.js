import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import styles from './styles';
import { toRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import { H1, H3, P } from '../../toolBox/typography';

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
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <H1>Sending</H1>
          <P style={styles.subtitle}>You are about to send tokens to other addresses.</P>
        </View>
        <View>
          <View style={styles.row}>
            <P style={styles.label}>Address</P>
            <View style={styles.addressContainer}>
              <Avatar address={address} style={styles.avatar} size={35}/>
              <H3 labelStyle={[styles.address, styles.black]}>{address}</H3>
            </View>
          </View>
          <View style={styles.row}>
            <P style={styles.label}>Amount (including 0.1LSK fee):</P>
            <H3 labelStyle={[styles.amount, styles.black]}>{`${parseFloat(amount) + 0.1} LSK`}</H3>
          </View>
          {reference ? <View style={styles.row}>
            <P style={styles.label}>Reference:</P>
            <H3 labelStyle={[styles.address, styles.black]}>{reference}</H3>
          </View> : null}
        </View>
        <PrimaryButton
          style={styles.button}
          onClick={this.send}
          title='Confirm' />
      </View>
    </View>);
  }
}

export default Form;
