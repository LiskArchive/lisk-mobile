import React from 'react';
import { ScrollView, View, RefreshControl, Linking } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import withTheme from '../withTheme';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { B, A } from '../toolBox/typography';
import IconButton from '../router/headerBackButton';
import Loading from '../transactions/loading';
import EmptyState from '../transactions/empty';
import LskSummary from './lskSummary';
import BtcSummary from './btcSummary';
import Row from './row';
import { transactions as transactionsAPI } from '../../utilities/api';
import getStyles from './styles';
import { merge } from '../../utilities/helpers';

@connect(state => ({
  followedAccounts: state.accounts.followed || [],
  account: state.accounts.info || {},
  activeToken: state.settings.token.active,
}), {})
class TransactionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerLeft: (
        <IconButton
          title=''
          icon='back'
          onPress={params.action}
        />
      ),
    };
  };

  state = {
    tx: null,
    refreshing: false,
  }

  componentDidMount() {
    const { theme, navigation } = this.props;
    const tx = navigation.getParam('tx', null);
    let backAction = () => navigation.pop();

    if (tx) {
      this.setState({ tx }, () => this.retrieveTransaction(tx.id));
    } else {
      this.retrieveTransaction(navigation.getParam('txId', false));
      backAction = () => navigation.navigate('Home');
    }

    navigation.setParams({
      theme,
      action: backAction,
    });
  }

  async retrieveTransaction(id, delay = 0) {
    const { tx: currentTx } = this.state;
    const {
      t, activeToken, navigation, account,
    } = this.props;

    try {
      const { data } = await transactionsAPI.get(activeToken, {
        address: navigation.getParam('account', account[activeToken].address),
        id,
      });

      const tx = data[0] || {};

      // don't have any transaction passed from the navigation and couldn't find any with the id
      // example: navigating from a deep link
      if (!tx.id && !currentTx) {
        this.setState({
          error: t('Transaction not found'),
        });
      } else {
        setTimeout(() => this.setState(prevState => ({
          tx: merge(prevState.tx, tx),
          refreshing: false,
        })), delay);
      }
    } catch (error) {
      if (!currentTx) {
        this.setState({
          error: t('An error occurred, please try again.'),
        });
      }
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => this.retrieveTransaction(this.state.tx.id, 1500));
  }

  navigate = (address) => {
    const { navigation, account, activeToken } = this.props;

    if (address !== account[activeToken].address && address !== 'Unparsed Address') {
      navigation.navigate('Wallet', { address });
    }
  }

  getAccountLabel = (address) => {
    const { t, followedAccounts, activeToken } = this.props;

    if (address === 'Unparsed Address') {
      return t('Unparsed Address');
    }

    const followedAccount = followedAccounts[activeToken].find(a => a.address === address);
    if (followedAccount) {
      return followedAccount.label;
    }

    return address;
  };

  openExplorer = () => {
    Linking.openURL(`https://www.blockchain.com/btc/tx/${this.state.id}`)
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  };

  render() {
    const {
      navigation, styles, account, t, activeToken,
    } = this.props;
    const { tx, error, refreshing } = this.state;

    if (error) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <EmptyState message={error} style={styles.empty} />
        </View>
      );
    }

    if (!tx) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Loading />
        </View>
      );
    }

    const walletAccountAddress = navigation.getParam('account', account[activeToken].address);
    const incognito = navigation.getParam('incognito', null);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        )} >
        {
          activeToken === 'LSK' ?
          <LskSummary
            incognito={incognito}
            accountAddress={walletAccountAddress}
            tx={tx} /> :
          <BtcSummary
            incognito={incognito}
            accountAddress={walletAccountAddress}
            tx={tx} />
        }

        <Row icon='sender' title={tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
          'Account address' : 'Sender'}>
          <View style={styles.addressContainer}>
            <A
              value={tx.senderAddress}
              onPress={() => this.navigate(tx.senderAddress)}
              style={[styles.value, styles.theme.value, styles.transactionId]}
            >
              {this.getAccountLabel(tx.senderAddress)}
            </A>
          </View>
        </Row>
        {
          tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ? null :
            <Row icon='recipient' title='Recipient'>
              <View style={styles.addressContainer}>
                <A
                  value={tx.senderAddress}
                  onPress={() => this.navigate(tx.recipientAddress)}
                  style={[styles.value, styles.theme.value, styles.transactionId]} >
                  {this.getAccountLabel(tx.recipientAddress)}
                </A>
              </View>
            </Row>
        }
        <Row icon='tx-fee' title='Transaction Fee'>
          <B style={[styles.value, styles.theme.value]}>
            <FormattedNumber tokenType={activeToken}>{fromRawLsk(tx.fee)}</FormattedNumber>
          </B>
        </Row>
        {
          (tx.data) ?
            <Row icon='reference' title='Reference'>
              <B style={[styles.value, styles.theme.value, styles.referenceValue]}>
                {tx.data}
              </B>
            </Row> : null
        }
        <Row icon='confirmation' title='Confirmations'>
          <B style={[styles.value, styles.theme.value]}>{tx.confirmations || t('Not confirmed yet.')}</B>
        </Row>
        <Row icon='tx-id' title='Transaction ID'>
          {
            activeToken === 'LSK' ?
            <Share
              type={B}
              value={tx.id}
              title={tx.id}
              icon={true}
              style={[styles.value, styles.theme.value, styles.transactionId]}
            /> :
            <A style={[styles.explorerLink, styles.theme.explorerLink]} onPress={this.openExplorer}>
              {t('View more on Blockchain.info')}
            </A>
          }
        </Row>
      </ScrollView>
    );
  }
}

export default withTheme(translate()(TransactionDetail), getStyles());
