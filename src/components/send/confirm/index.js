import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import styles from './styles';
import { toRawLsk, fromRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import { H1, H4, P } from '../../toolBox/typography';

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
    }, activeAccount, nextStep);
  }

  goback = () => {
    const { address, amount, reference } = this.props;
    return this.props.prevStep({ address, amount, reference });
  }

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: true, action: this.goback });
  }


  render() {
    const { address, amount, reference } = this.props;
    return (<View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <H1>Ready to Send</H1>
          <P style={styles.subtitle}>
            You are about to send tokens{'\n'}to another address.
          </P>
        </View>
        <View>
          <View style={styles.row}>
            <P style={styles.label}>Address</P>
            <View style={styles.addressContainer}>
              <Avatar address={address} style={styles.avatar} size={35}/>
              <H4 labelStyle={[styles.address, styles.black]}>{address}</H4>
            </View>
          </View>
          <View style={styles.row}>
            <P style={styles.label}>Amount (including 0.1 Ⱡ fee):</P>
            <H4 labelStyle={[styles.amount, styles.black]}>{`${fromRawLsk(toRawLsk(amount) + 1e7)} Ⱡ`}</H4>
          </View>
          {reference ? <View style={styles.row}>
            <P style={styles.label}>Reference:</P>
            <H4 labelStyle={[styles.address, styles.black]}>{reference}</H4>
          </View> : null}
        </View>
        <PrimaryButton
          style={styles.button}
          onClick={this.send}
          title='Send now' />
      </View>
    </View>);
  }
}

export default Form;
