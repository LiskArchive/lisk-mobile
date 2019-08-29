import React from 'react';
import { ScrollView, View, RefreshControl, Linking } from 'react-native';
import connect from 'redux-connect-decorator';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import withTheme from '../../shared/withTheme';
import { fromRawLsk } from '../../../utilities/conversions';
import FormattedNumber from '../../shared/formattedNumber';
import Share from '../../shared/share';
import { B, A } from '../../shared/toolBox/typography';
import IconButton from '../../screens/router/headerBackButton';
import Loading from '../../shared/transactions/loading';
import EmptyState from '../../shared/transactions/empty';
import LskSummary from './lskSummary';
import BtcSummary from './btcSummary';
import Row from './row';
import { transactions as transactionsAPI, account as accountAPI } from '../../../utilities/api';
import { getTransactionExplorerURL } from '../../../utilities/api/btc/transactions';
import getStyles from './styles';
import loadingAnimation from '../../../assets/animations/loading-dots.json';
import { merge } from '../../../utilities/helpers';
import { tokenMap } from '../../../constants/tokens';

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
    downvotes: [],
    upvotes: [],
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

  async fetchExtraData() {
    const { tx } = this.state;
    const { activeToken } = this.props;
    let upvotes = [];
    let downvotes = [];
    if (tx.votes.length) {
      tx.votes.forEach(async (vote, index) => {
        const prefix = vote.substring(0, 1);
        const publicKey = vote.substring(1, vote.length);
        const accountSummary = await accountAPI.getSummary(activeToken, { publicKey });
        const voteData = {
          username: accountSummary.delegate.username,
          rank: accountSummary.delegate.rank,
        };
        if (prefix === '-') downvotes.splice(index, 0, voteData);
        if (prefix === '+') upvotes.splice(index, 0, voteData);

        if (downvotes.length + upvotes.length === tx.votes.length) {
          if (!upvotes.length) upvotes = null;
          if (!downvotes.length) downvotes = null;
          this.setState({ upvotes, downvotes });
        }
      });
    }
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
        if (this.props.activeToken === tokenMap.LSK.key) this.fetchExtraData();
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
    Linking.openURL(getTransactionExplorerURL(this.state.tx.id))
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  };

  getAccountTitle = (tx) => {
    if (tx.type === 3) return 'Voter';
    else if (tx.type === 2) return 'Registrant';
    else if (tx.type !== 0 || tx.recipientAddress === tx.senderAddress) return 'Account address';
    return 'sender';
  }

  listVotes = (vote) => {
    const { styles } = this.props;

    return (
      <View key={vote.username} style={[styles.votesContainer, styles.theme.votesContainer]}>
        <View style={[styles.voteNumberContainer, styles.theme.voteNumberContainer]}>
          <B style={[styles.voteNumber, styles.theme.voteNumber]}>#{vote.rank}</B>
        </View>
        <B style={[styles.vote, styles.theme.vote]}>{vote.username}</B>
      </View>
    );
  }

  renderLoader = () => {
    const { styles } = this.props;
    return (
      <View style={styles.pendingIcon}>
        <LottieView source={loadingAnimation} autoPlay />
      </View>
    );
  }

  render() {
    const {
      navigation, styles, account, t, activeToken,
    } = this.props;
    const {
      tx, error, refreshing, upvotes, downvotes,
    } = this.state;

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
    const isDelegateRegistration = tx.type === 2;
    const isVote = tx.type === 3;

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

        {isDelegateRegistration && (
          <Row icon={'delegate'} title={'Delegate username'}>
            <View>
              <B style={[styles.value, styles.theme.value]}>{tx.delegate.username}</B>
            </View>
          </Row>
        )}

        <Row icon={isVote || isDelegateRegistration ? 'user' : 'send'} title={this.getAccountTitle(tx)}>
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
        <Row icon='tx-fee' title='Transaction fee'>
          <B style={[styles.value, styles.theme.value]}>
            <FormattedNumber tokenType={activeToken}>{fromRawLsk(tx.fee)}</FormattedNumber>
          </B>
        </Row>
        {
          (tx.data) ?
            <Row icon='reference' title='Message'>
              <B style={[styles.value, styles.theme.value, styles.referenceValue]}>
                {tx.data}
              </B>
            </Row> : null
        }
        <Row icon='confirmations' title='Confirmations'>
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

        {isVote && upvotes && (
          <Row style={styles.votesRow} icon='plus-vote' title={t('Added votes')}>
            {upvotes.length ? upvotes.map(this.listVotes) : this.renderLoader()}
          </Row>
        )}

        {isVote && downvotes && (
          <Row style={styles.votesRow} icon='minus-vote' title={t('Removed votes')}>
            {downvotes.length ? downvotes.map(this.listVotes) : this.renderLoader()}
          </Row>
        )}

      </ScrollView>
    );
  }
}

export default withTheme(translate()(TransactionDetail), getStyles());
