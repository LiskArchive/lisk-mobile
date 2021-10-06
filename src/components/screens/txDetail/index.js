/* eslint-disable max-statements */
import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import withTheme from '../../shared/withTheme';
import { fromRawLsk } from '../../../utilities/conversions';
import FormattedNumber from '../../shared/formattedNumber';
import Share from '../../shared/share';
import { B, A } from '../../shared/toolBox/typography';
import IconButton from '../router/headerBackButton';
import Loading from '../../shared/transactions/loading';
import EmptyState from '../../shared/transactions/empty';
import LskSummary from './lskSummary';
import BtcSummary from './btcSummary';
import Row from './row';
import {
  transactions as transactionsAPI,
  account as accountAPI,
} from '../../../utilities/api';
import getStyles from './styles';
import VoteList from './voteList';
import { merge } from '../../../utilities/helpers';
import { tokenMap } from '../../../constants/tokens';
import {
  goToWallet,
  getAccountLabel,
  getAccountTitle,
  openExplorer,
} from './utils';
import {
  isRegistration,
  isTransfer,
  isVote,
} from '../../../constants/transactions';

@connect(
  (state) => ({
    followedAccounts: state.accounts.followed || [],
    account: state.accounts.info || {},
    activeToken: state.settings.token.active,
    language: state.settings.language,
  }),
  {}
)
class TransactionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: <IconButton title="" icon="back" onPress={params.action} />,
    };
  };

  state = {
    tx: null,
    refreshing: false,
    downvotes: [],
    upvotes: [],
  };

  componentDidMount() {
    const { theme, navigation, route } = this.props;
    const tx = route.params?.tx ?? null;
    let backAction = () => navigation.pop();

    if (tx) {
      this.setState({ tx }, () => this.retrieveTransaction(tx.id));
    } else {
      this.retrieveTransaction(route.params?.txId ?? false);
      backAction = () => navigation.navigate({ name: 'Home' });
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
        const accountSummary = await accountAPI.getSummary(activeToken, {
          publicKey,
        });
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

  // eslint-disable-next-line max-statements
  async retrieveTransaction(id, delay = 0) {
    const { tx: currentTx } = this.state;
    const { t, activeToken, account, route } = this.props;
    try {
      const { data } = await transactionsAPI.get(activeToken, {
        address: route.params?.account ?? account[activeToken].address,
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
        setTimeout(
          () =>
            this.setState((prevState) => ({
              tx: merge(prevState.tx, tx),
              refreshing: false,
            })),
          delay
        );
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
    this.setState(
      {
        refreshing: true,
      },
      () => this.retrieveTransaction(this.state.tx.id, 1500)
    );
  };

  // eslint-disable-next-line complexity
  render() {
    const { styles, account, t, activeToken, language, route } = this.props;
    const { tx, error, refreshing, upvotes, downvotes } = this.state;

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

    const walletAccountAddress =
      route.params?.account ?? account[activeToken].address;
    const incognito = route.params?.incognito ?? null;
    const isDelegateRegistration = isRegistration(tx);
    const isVoting = isVote(tx);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        {activeToken === 'LSK' ? (
          <LskSummary
            incognito={incognito}
            accountAddress={walletAccountAddress}
            tx={tx}
            language={language}
          />
        ) : (
          <BtcSummary
            incognito={incognito}
            accountAddress={walletAccountAddress}
            tx={tx}
            language={language}
          />
        )}

        {isDelegateRegistration && (
          <Row icon={'delegate'} title={'Delegate username'}>
            <View>
              <B style={[styles.value, styles.theme.value]}>
                {tx.delegate.username}
              </B>
            </View>
          </Row>
        )}

        <Row
          icon={isVoting || isDelegateRegistration ? 'user' : 'send'}
          title={getAccountTitle(tx)}
        >
          <View style={styles.addressContainer}>
            <A
              value={tx.senderAddress}
              onPress={() => goToWallet(tx.senderAddress, this.props)}
              style={[styles.value, styles.theme.value, styles.transactionId]}
            >
              {getAccountLabel(tx.senderAddress, this.props)}
            </A>
          </View>
        </Row>
        {!isTransfer(tx) || tx.recipientAddress === tx.senderAddress ? null : (
          <Row icon="recipient" title="Recipient">
            <View style={styles.addressContainer}>
              <A
                value={tx.senderAddress}
                onPress={() => goToWallet(tx.recipientAddress, this.props)}
                style={[styles.value, styles.theme.value, styles.transactionId]}
              >
                {getAccountLabel(tx.recipientAddress, this.props)}
              </A>
            </View>
          </Row>
        )}
        <Row icon="tx-fee" title="Transaction fee">
          <B style={[styles.value, styles.theme.value]}>
            <FormattedNumber tokenType={activeToken} language={language}>
              {fromRawLsk(tx.fee)}
            </FormattedNumber>
          </B>
        </Row>
        {tx.data ? (
          <Row icon="reference" title="Message">
            <B
              style={[styles.value, styles.theme.value, styles.referenceValue]}
            >
              {tx.data}
            </B>
          </Row>
        ) : null}
        <Row
          icon="confirmations"
          title={activeToken === 'LSK' ? 'Nonce' : 'Confirmations'}
        >
          <B style={[styles.value, styles.theme.value]}>
            {activeToken === 'LSK'
              ? tx.nonce
              : tx.confirmations || t('Not confirmed yet.')}
          </B>
        </Row>
        <Row icon="tx-id" title="Transaction ID">
          {activeToken === 'LSK' ? (
            <Share
              type={B}
              value={tx.id}
              title={tx.id}
              icon={true}
              style={[styles.value, styles.theme.value, styles.transactionId]}
            />
          ) : (
            <A
              style={[styles.explorerLink, styles.theme.explorerLink]}
              onPress={() => openExplorer(tx.id)}
            >
              {t('View more on Blockchain.info')}
            </A>
          )}
        </Row>
        {isVoting ? <VoteList upvotes={upvotes} downvotes={downvotes} /> : null}
      </ScrollView>
    );
  }
}

export default withTheme(translate()(TransactionDetail), getStyles());
