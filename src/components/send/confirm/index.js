import React from 'react';
import { View, Linking } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import styles from './styles';
import { toRawLsk, fromRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import { H1, B, P, A } from '../../toolBox/typography';

const messages = {
  initialize: {
    title: 'Initialize your account',
    subtitle: 'By initializing your account, you are taking an additional step towards securing your account.',
    button: 'Initialize now',
    reference: 'Account initialization',
  },
  send: {
    title: 'Ready to Send',
    subtitle: "You are about to send LSK tokens{'\n'}to another address.",
    button: 'Send now',
  },
};

@connect(state => ({
  accounts: state.accounts,
}), {
  transactionAdded: transactionAddedAction,
})

class Form extends React.Component {
  state = {
    disableButton: false,
  }
  send = () => {
    this.setState({
      disableButton: true,
    });
    const { accounts, nextStep, transactionAdded } = this.props;
    const { amount, address, reference } = this.state;
    const activeAccount = accounts.active;
    transactionAdded({
      recipientId: address,
      amount: toRawLsk(amount),
      passphrase: activeAccount.passphrase,
      secondPassphrase: null,
      data: reference || null,
    }, activeAccount, nextStep);
  }

  goBack = () => {
    const { address, amount, reference } = this.state;
    return this.props.prevStep({ address, amount, reference });
  }

  openAcademy = () => {
    Linking.openURL('https://help.lisk.io/account-security/should-i-initialize-my-lisk-account')
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  }

  accountInitialization() {
    this.setState({
      address: this.props.accounts.active.address,
      amount: 0.1,
      reference: messages.initialize.reference,
    });
  }

  componentDidMount() {
    const {
      navigation, accounts, address, reference, amount,
    } = this.props;

    // Undefined address means we escaped the form step to initialize the account
    if (!address && !accounts.active.initialized) {
      this.accountInitialization();
    } else {
      this.setState({
        accounts, address, reference, amount,
      });
      navigation.setParams({ showButtonLeft: true, action: this.goBack });
    }
  }


  render() {
    const { address, amount, reference } = this.state;
    const { active } = this.props.accounts;
    const actionType = (!active.initialized && address === active.address &&
      reference === 'Account initialization') ? 'initialize' : 'send';

    return (<View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <H1>{ messages[actionType].title }</H1>
          <P style={styles.subtitle}>
            { messages[actionType].subtitle }
            {
              actionType === 'initialize' ?
              <A style={styles.link} onPress={this.openAcademy}> Read more</A> : ''
            }
          </P>
        </View>
        <View>
          <View style={styles.row}>
            <P style={styles.label}>Address</P>
            <View style={styles.addressContainer}>
              <Avatar address={address || ''} style={styles.avatar} size={35}/>
              <B labelStyle={[styles.address, styles.black]}>{address}</B>
            </View>
          </View>
          <View style={styles.row}>
            <P style={styles.label}>Amount (including 0.1 Ⱡ fee)</P>
            <B labelStyle={[styles.amount, styles.black]}>{`${fromRawLsk(toRawLsk(amount) + 1e7)} Ⱡ`}</B>
          </View>
          {reference ? <View style={styles.row}>
            <P style={styles.label}>Reference</P>
            <B labelStyle={[styles.address, styles.black]}>{reference}</B>
          </View> : null}
        </View>
        <PrimaryButton
          disabled={this.state.disableButton}
          style={styles.button}
          onClick={this.send}
          title={ messages[actionType].button } />
      </View>
    </View>);
  }
}

export default Form;
