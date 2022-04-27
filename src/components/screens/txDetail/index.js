/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fromRawLsk } from 'utilities/conversions';
import { transactions as transactionsAPI } from 'utilities/api';
import { merge, stringShortener } from 'utilities/helpers';
import {
  isRegistration,
  isTransfer,
  isVote,
  isUnlock,
} from 'packages/Send/constants';
import withTheme from 'components/shared/withTheme';
import FormattedNumber from 'components/shared/formattedNumber';
import { B, A, H4, } from 'components/shared/toolBox/typography';
import { EmptyState, LoadingState } from 'packages/Accounts/components';
import Avatar from 'components/shared/avatar';
import Blur from 'components/shared/blur';
import CopyToClipboard from 'components/shared/copyToClipboard';
import HeaderBackButton from 'components/navigation/headerBackButton';
import LskSummary from './lskSummary';
import BtcSummary from './btcSummary';
import Row from './row';
import getStyles from './styles';
import VoteList from './voteList';
import {
  goToWallet, getAccountLabel, getAccountTitle, openExplorer
} from './utils';

const getConfig = (styles, tx, accountAddress) => {
  if (accountAddress !== tx.senderAddress && isTransfer(tx)) {
    return {
      arrowStyle: styles.reverseArrow,
      amountStyle: [styles.incoming, styles.theme.incoming],
      firstAddress: tx.senderAddress,
      secondAddress: tx.recipientAddress,
      amountSign: '',
      direction: 'incoming'
    };
  }
  return {
    arrowStyle: null,
    amountStyle: [styles.outgoing, styles.theme.outgoing],
    firstAddress: tx.senderAddress,
    secondAddress: tx.recipientAddress,
    amountSign: '-',
    direction: 'outgoing'
  };
};

@connect(
  (state) => ({
    followedAccounts: state.accounts.followed || [],
    account: state.accounts.info || {},
    activeToken: state.settings.token.active,
    language: state.settings.language
  }),
  {}
)
class TransactionDetail extends React.Component {
  state = {
    tx: null,
    refreshing: false,
    votes: []
  };

  componentDidMount() {
    const { theme, navigation, route } = this.props;
    const tx = route.params?.tx ?? null;
    let backAction = () => navigation.pop();

    if (tx) {
      this.setState({ tx, votes: tx.votes }, () => this.retrieveTransaction(tx.id));
    } else {
      this.retrieveTransaction(route.params?.txId ?? false);
      backAction = () => navigation.navigate({ name: 'Home' });
    }
    navigation.setParams({
      theme,
      action: backAction
    });
  }

  // eslint-disable-next-line max-statements
  async retrieveTransaction(id, delay = 0) {
    const { tx: currentTx } = this.state;
    const {
      t, activeToken, account, route
    } = this.props;
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
          error: t('Transaction not found')
        });
      } else {
        setTimeout(
          () =>
            this.setState((prevState) => ({
              tx: merge(prevState.tx, tx),
              refreshing: false
            })),
          delay
        );
      }
    } catch (error) {
      if (!currentTx) {
        this.setState({
          error: t('An error occurred, please try again.')
        });
      }
    }
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.retrieveTransaction(this.state.tx.id, 1500)
    );
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      styles, account, t, activeToken, language, route
    } = this.props;
    const {
      tx, error, refreshing, votes
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
          <LoadingState />
        </View>
      );
    }

    const walletAccountAddress = route.params?.account ?? account[activeToken].address;
    const incognito = route.params?.incognito ?? null;
    const isDelegateRegistration = isRegistration(tx);
    const isVoting = isVote(tx);
    const config = getConfig(styles, tx, walletAccountAddress);
    const amount = fromRawLsk(tx.amount);

    return (
      <SafeAreaView style={[styles.container, styles.theme.container]} >
        <HeaderBackButton
          title="Transaction Details"
          onPress={this.props.navigation.goBack}
        />
        <ScrollView
          style={[styles.container, styles.theme.container]}
          contentContainerStyle={styles.contentContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
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
            <Row title={'Delegate username'}>
              <View>
                <B style={[styles.value, styles.theme.value]}>{tx.delegate}</B>
              </View>
            </Row>
          )}

          <Row title={getAccountTitle(tx)}>
            <View style={styles.addressContainer}>
              <A
                value={tx.senderAddress}
                onPress={() => goToWallet(tx.senderAddress, this.props)}
                style={[styles.value, styles.theme.value, styles.transactionId]}
              >
                {getAccountLabel(tx.senderAddress, { ...this.props, truncate: true })}
              </A>
            </View>
            <Avatar address={config.firstAddress} size={40} />
          </Row>
          {!isTransfer(tx) || tx.recipientAddress === tx.senderAddress ? null : (
            <Row title="Recipient">
              <View style={styles.addressContainer}>
                <A
                  value={tx.senderAddress}
                  onPress={() => goToWallet(tx.recipientAddress, this.props)}
                  style={[styles.value, styles.theme.value, styles.transactionId]}
                >
                  {getAccountLabel(tx.recipientAddress, { ...this.props, truncate: true })}
                </A>
              </View>
              <Avatar address={config.secondAddress} size={40} />
            </Row>
          )}
          {isTransfer(tx) && <Row title={'Amount'}>
            {!incognito ? (
              <H4 style={config.amountStyle}>
                {config.amountSign}
                <FormattedNumber language={language}>{fromRawLsk(tx.amount)}</FormattedNumber>
              </H4>
            ) : <Blur value={amount} direction={config.direction} />}
          </Row>}
          {isUnlock(tx) && (
            <Row title="Amount">
              <B style={[styles.value, styles.theme.value]}>
                <FormattedNumber tokenType={activeToken} language={language}>
                  {fromRawLsk(tx.amount)}
                </FormattedNumber>
              </B>
            </Row>
          )}
          <Row title="Transaction fee">
            <B style={[styles.value, styles.theme.value]}>
              <FormattedNumber tokenType={activeToken} language={language}>
                {fromRawLsk(tx.fee)}
              </FormattedNumber>
            </B>
          </Row>
          {!!tx.data && (
            <Row title="Message">
              <B style={[styles.value, styles.theme.value, styles.referenceValue]}>{tx.data}</B>
            </Row>
          )}
          {!!tx.confirmations && (
            <Row title="Confirmations">
              <B style={[styles.value, styles.theme.value, styles.referenceValue]}>
                {tx.confirmations}
              </B>
            </Row>
          )}
          <Row title="Transaction ID">
            {activeToken === 'LSK' ? (
              <CopyToClipboard
                style={[styles.value, styles.theme.value, styles.transactionId]}
                labelStyle={[styles.value, styles.theme.value]}
                showIcon={true}
                iconSize={18}
                value={tx.id}
                type={B}
                label={stringShortener(tx.id, 15, 6)}
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
          {!!tx.blockHeight && (
            <Row title="Block Height">
              <B style={[styles.value, styles.theme.value]}>
                {tx.blockHeight}
              </B>
            </Row>
          )}
          {!!tx.blockId && (
            <Row title="Block ID">
              <CopyToClipboard
                style={[styles.value, styles.theme.value, styles.transactionId]}
                labelStyle={[styles.value, styles.theme.value]}
                showIcon={true}
                iconSize={18}
                value={tx.blockId}
                type={B}
                label={stringShortener(tx.blockId, 15, 6)}
              />
            </Row>
          )}
          <Row title={'Nonce'}>
            <B style={[styles.value, styles.theme.value]}>
              {tx.nonce}
            </B>
          </Row>
          {isVoting ? <VoteList votes={votes} /> : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(TransactionDetail), getStyles());
