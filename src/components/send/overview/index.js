import React from 'react';
import { View, Linking, ScrollView } from 'react-native';
import connect from 'redux-connect-decorator';
import reg from '../../../constants/regex';
import transactions from '../../../constants/transactions';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import FormattedNumber from '../../formattedNumber';
import { toRawLsk, fromRawLsk } from '../../../utilities/conversions';
import { PrimaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import { H4, B, P, A, Small } from '../../toolBox/typography';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { colors } from '../../../constants/styleGuide';

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
  accounts: state.accounts,
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
      const { active } = this.props.accounts;
      return (reg.amount.test(str) &&
      active && active.balance > transactions.send.fee &&
        parseFloat(str) <= fromRawLsk(active.balance - transactions.send.fee)) ? 0 : 1;
    },
  };

  send = () => {
    const {
      accounts, nextStep, transactionAdded,
      sharedData: {
        amount, address, reference, secondPassphrase,
      },
    } = this.props;

    transactionAdded({
      recipientId: address,
      amount: toRawLsk(amount),
      passphrase: accounts.active.passphrase,
      secondPassphrase,
      data: reference || null,
    }, nextStep, (err) => {
      const errorMessage = (err && /Status\s409/.test(err.message)) ?
        'Your balance is insufficient.' : 'An error happened. Please try later.';
      this.setState({ errorMessage });
    });
  }

  back = () => {
    const to = this.props.accounts.active.secondPublicKey ? -1 : -2;
    return this.props.prevStep(to);
  }

  openAcademy = () => {
    Linking.openURL('https://help.lisk.io/account-security/should-i-initialize-my-lisk-account')
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  }

  componentDidMount() {
    let nextNavigationParams = {
      action: this.back,
      showButtonLeft: true,
    };

    if (this.props.navigation.state.params.initialize) {
      this.setState({
        initialize: true,
      });

      nextNavigationParams = {
        showButtonLeft: false,
        action: this.props.navigation.back,
      };
    }

    this.props.navigation.setParams({
      ...nextNavigationParams,
      initialize: false,
    });
  }

  componentDidUpdate(nextProps) {
    const { accounts } = this.props;
    if (accounts.active && nextProps.accounts.active.balance !== accounts.active.balance) {
      this.setState({
        amountValidity: this.validator.amount(this.props.amount),
      });
    }
  }

  render() {
    const actionType = this.props.navigation.state.params.initialize || this.state.initialize ?
      'initialize' : 'send';

    const {
      styles, accounts: { followed }, sharedData: { address, amount, reference },
    } = this.props;

    const bookmark = followed.filter(item => item.address === address);
    const fee = actionType === 'initialize' ? 0 : 1e7;

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        contentContainerStyle={styles.innerContainer}
      >
        <View>
          <P style={styles.theme.subtitle}>
            { messages[actionType].subtitle }
            {
              actionType === 'initialize' ?
              <A style={[styles.link, styles.theme.link]} onPress={this.openAcademy}> Read more</A> : ''
            }
          </P>
          <View style={[styles.row, styles.theme.row, styles.addressContainer]}>
            <Avatar address={address || ''} style={styles.avatar} size={50}/>
            {
              bookmark.length === 1 ?
                <H4 style={styles.theme.text}>{bookmark[0].label}</H4> : null
            }
            <P style={[styles.address, styles.text, styles.theme.text]}>{address}</P>
          </View>
          <View style={[styles.row, styles.theme.row]}>
            <Icon name={actionType === 'initialize' ? 'tx-fee' : 'amount'}
              style={styles.icon} size={20}
              color={colors[this.props.theme].gray2} />
            <View style={styles.rowContent}>
              <P style={[styles.label, styles.theme.label]}>
                {actionType === 'initialize' ? 'Transaction Fee' : 'Amount (including 0.1 LSK )'}
              </P>
              <B style={[styles.text, styles.theme.text]}>
                <FormattedNumber>
                  {fromRawLsk(toRawLsk(amount) + fee)}
                </FormattedNumber>
              </B>
            </View>
          </View>
          {
            reference ?
              <View style={[styles.row, styles.theme.row]}>
                <Icon name='reference' style={styles.icon} size={20} color={colors[this.props.theme].gray2} />
                <View style={styles.rowContent}>
                  <P style={[styles.label, styles.theme.label]}>Reference</P>
                  <B style={[styles.text, styles.theme.text]}>{reference}</B>
                </View>
              </View> : null
          }
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
      </ScrollView>
    );
  }
}

export default withTheme(Overview, getStyles());
