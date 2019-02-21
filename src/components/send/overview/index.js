import React from 'react';
import { View, Linking, ScrollView } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import reg from '../../../constants/regex';
import transactions from '../../../constants/transactions';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import FormattedNumber from '../../formattedNumber';
import { toRawLsk, fromRawLsk, includeFee } from '../../../utilities/conversions';
import { SecondaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import { H4, B, P, A, Small } from '../../toolBox/typography';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { colors } from '../../../constants/styleGuide';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const messages = t => ({
  initialize: {
    title: t('Initialize your account'),
    subtitle: t('By initializing your account, you are taking an additional step towards securing your account.'),
    button: t('Initialize now'),
    reference: t('Account initialization'),
  },
  send: {
    title: t('Ready to send'),
    subtitle: t('You are about to send LSK tokens to the following address.'),
    button: t('Send now'),
  },
});

@connect(state => ({
  accounts: state.accounts,
}), {
  transactionAdded: transactionAddedAction,
})
class Overview extends React.Component {
  state = {
    initialize: false,
    errorMessage: null,
    triggered: false,
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
    // disable the button to prevent further presses.
    this.setState({ triggered: true });

    const {
      accounts, nextStep, transactionAdded, t,
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
      this.setState({ errorMessage: err.message || t('An error happened. Please try later.') });
    });
  }

  openAcademy = () => {
    Linking.openURL('https://help.lisk.io/account-security/should-i-initialize-my-lisk-account')
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  }

  componentDidMount() {
    const { send, initialize } = messages(this.props.t);
    let nextNavigationParams = {
      title: send.title,
      action: () => this.props.prevStep(),
      showButtonLeft: true,
    };

    if (this.props.navigation.state.params.initialize) {
      this.setState({
        initialize: true,
      });

      nextNavigationParams = {
        title: initialize.title,
        action: this.props.navigation.back,
        showButtonLeft: false,
      };
    }

    this.props.navigation.setParams({
      ...nextNavigationParams,
      initialize: false,
    });
  }

  componentWillUnmount() {
    const { t, navigation: { setParams } } = this.props;
    setParams({ title: t('Send') });
  }

  render() {
    const actionType = this.props.navigation.state.params.initialize || this.state.initialize ?
      'initialize' : 'send';

    const {
      styles, accounts: { followed }, t,
      sharedData: { address, amount, reference },
    } = this.props;

    const bookmark = followed.find(item => item.address === address);
    const fee = actionType === 'initialize' ? 0 : 1e7;
    const translatedMessages = messages(this.props.t);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        contentContainerStyle={styles.innerContainer}
      >
        <View>
          {!isSmallScreen ? (
            <P style={styles.theme.subtitle}>
              {translatedMessages[actionType].subtitle}
              {actionType === 'initialize' ? (
                <A style={[styles.link, styles.theme.link]} onPress={this.openAcademy}>
                  {t('Read more')}
                </A>
              ) : ''}
            </P>
          ) : null}
          <View style={[styles.row, styles.theme.row, styles.addressContainer]}>
            <Avatar address={address || ''} style={styles.avatar} size={50}/>
            {
              bookmark ? <H4 style={styles.theme.text}>{bookmark.label}</H4> : null
            }
            <P style={[styles.text, styles.theme.text, styles.address]}>
              {address}
            </P>
          </View>
          <View style={[styles.row, styles.theme.row]}>
            <Icon
              name={actionType === 'initialize' ? 'tx-fee' : 'amount'}
              style={styles.icon} size={20}
              color={colors[this.props.theme].gray2}
            />
            <View style={styles.rowContent}>
              <P style={[styles.label, styles.theme.label]}>
                {actionType === 'initialize' ? t('Transaction Fee') : t('Amount (including 0.1 LSK)')}
              </P>
              <B style={[styles.text, styles.theme.text]}>
                <FormattedNumber>
                  {includeFee(amount, fee)}
                </FormattedNumber>
              </B>
            </View>
          </View>
          {
            reference ?
              <View style={[styles.row, styles.theme.row]}>
                <Icon name='reference' style={styles.icon} size={20} color={colors[this.props.theme].gray2} />
                <View style={styles.rowContent}>
                  <P style={[styles.label, styles.theme.label]}>{t('Reference')}</P>
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
          <SecondaryButton
            disabled={this.state.triggered}
            style={styles.button}
            onClick={this.send}
            title={translatedMessages[actionType].button}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(translate()(Overview), getStyles());
