import React from 'react';
import { View, Linking } from 'react-native';
import connect from 'redux-connect-decorator';
import reg from '../../../constants/regex';
import transactions from '../../../constants/transactions';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import FormattedNumber from '../../formattedNumber';
import { toRawLsk, fromRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import { H1, B, P, A, Small } from '../../toolBox/typography';
import withTheme from '../../withTheme';
import getStyles from './styles';

const messages = {
  initialize: {
    title: 'Initialize your account',
    subtitle: 'By initializing your account, you are taking an additional step towards securing your account.',
    button: 'Initialize now',
    reference: 'Account initialization',
  },
  send: {
    title: 'Ready to Send',
    subtitle: 'You are about to send LSK tokens to another address.',
    button: 'Send now',
  },
};

@connect(state => ({
  account: state.accounts.active,
}), {
  transactionAdded: transactionAddedAction,
})
class Overview extends React.Component {
  state = {
    initialize: false,
    amountValidity: true,
    errorMessage: null,
  }

  validator = {
    amount: (str) => {
      const { account } = this.props;
      return (reg.amount.test(str) &&
        account && account.balance > transactions.send.fee &&
        parseFloat(str) <= fromRawLsk(account.balance - transactions.send.fee)) ? 0 : 1;
    },
  };

  send = () => {
    const {
      account, nextStep, transactionAdded,
      amount, address, reference, secondPassphrase,
    } = this.props;

    transactionAdded({
      recipientId: address,
      amount: toRawLsk(amount),
      passphrase: account.passphrase,
      secondPassphrase,
      data: reference || null,
    }, nextStep, (err) => {
      const errorMessage = (err && /Status\s409/.test(err.message)) ?
        'Your balance is insufficient.' : 'An error happened. Please try later.';
      this.setState({ errorMessage });
    });
  }

  back = () => {
    const to = this.props.account.secondPublicKey ? -1 : -2;
    return this.props.prevStep(to);
  }

  openAcademy = () => {
    Linking.openURL('https://help.lisk.io/account-security/should-i-initialize-my-lisk-account')
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  }

  componentDidMount() {
    let { back } = this;
    if (this.props.navigation.state.params.initialize) {
      this.setState({
        initialize: true,
      });

      back = this.props.navigation.goBack;
    }

    this.props.navigation.setParams({
      showButtonLeft: true,
      action: back,
      initialize: false,
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props.account && nextProps.account.balance !== this.props.account.balance) {
      this.setState({
        amountValidity: this.validator.amount(this.props.amount),
      });
    }
  }

  render() {
    const actionType = this.props.navigation.state.params.initialize || this.state.initialize ?
      'initialize' : 'send';
    const {
      styles, address, amount, reference,
    } = this.props;

    return (<View style={[styles.container, styles.theme.container]}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <H1 style={[styles.headerTitle, styles.theme.headerTitle]}>
            { messages[actionType].title }
          </H1>
          <P style={[styles.subtitle, styles.theme.subtitle]}>
            { messages[actionType].subtitle }
            {
              actionType === 'initialize' ?
              <A style={[styles.link, styles.theme.link]} onPress={this.openAcademy}> Read more</A> : ''
            }
          </P>
        </View>
        <View>
          <View style={styles.row}>
            <P style={[styles.label, styles.theme.label]}>Address</P>
            <View style={styles.addressContainer}>
              <Avatar address={address || ''} style={styles.avatar} size={35}/>
              <B style={[styles.address, styles.text, styles.theme.text]}>{address}</B>
            </View>
          </View>
          <View style={styles.row}>
            <P style={[styles.label, styles.theme.label]}>Amount (including 0.1 Ⱡ fee)</P>
            <B style={[styles.text, styles.theme.text]}>
              <FormattedNumber>{fromRawLsk(toRawLsk(amount) + 1e7)}</FormattedNumber>
            </B>
          </View>
          {reference ? <View style={styles.row}>
            <P style={[styles.label, styles.theme.label]}>Reference</P>
            <B style={[styles.text, styles.theme.text]}>{reference}</B>
          </View> : null}
        </View>
        <View>
          <View style={[styles.errorContainer, this.state.errorMessage ? styles.visible : null]}>
            <Icon size={16} name='warning' style={styles.errorIcon} />
            <Small style={styles.error}>{this.state.errorMessage}</Small>
          </View>
          <PrimaryButton
            disabled={!this.state.amountValidity}
            style={styles.button}
            onClick={this.send}
            title={ messages[actionType].button } />
        </View>
      </View>
    </View>);
  }
}

export default withTheme(Overview, getStyles());
