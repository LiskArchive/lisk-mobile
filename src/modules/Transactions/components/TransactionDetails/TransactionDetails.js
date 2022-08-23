/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { fromRawLsk } from 'utilities/conversions';
import { transactions as transactionsAPI } from 'utilities/api';
import { merge, stringShortener } from 'utilities/helpers';
import {
  isRegistration,
  isTransfer,
  isVote,
  isUnlock,
} from 'modules/SendToken/constants';
import withTheme from 'components/shared/withTheme';
import FormattedNumber from 'components/shared/formattedNumber';
import { B, A, H4, } from 'components/shared/toolBox/typography';
import { EmptyState, LoadingState } from 'modules/Accounts/components';
import Avatar from 'components/shared/avatar';
import Blur from 'components/shared/blur';
import CopyToClipboard from 'components/shared/copyToClipboard';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts/useAccountInfo';
import TransactionSummary from './TransactionSummary';
import Row from './row';
import getStyles from './styles';
import VoteList from './voteList';
import {
  goToWallet, getAccountLabel, getAccountTitle
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

const TransactionDetails = ({
  theme, navigation, route, t, styles
}) => {
  const [tx, setTx] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(null);
  const { summary: account } = useAccountInfo();

  const followedAccounts = [];
  const { token: { active: activeToken }, language } = useSelector((state) => state.settings);

  const retrieveTransaction = async (id) => {
    setRefreshing(true);
    setError(null);
    try {
      const { data } = await transactionsAPI.get(activeToken, {
        address: route.params?.account ?? account[activeToken].address,
        id,
      });
      const newTransaction = data[0] || {};
      if (!newTransaction.id && !tx) {
        setRefreshing(false);
        setError(t('Transaction not found'));
      } else {
        setRefreshing(false);
        setTx(merge(tx, newTransaction));
      }
    } catch (e) {
      if (!tx) {
        setRefreshing(false);
        setError(t('An error occurred, please try again.'));
      }
    }
  };

  useEffect(() => {
    const transaction = route.params?.tx ?? null;
    let backAction = () => navigation.pop();

    if (transaction) {
      setTx(transaction);
      setVotes(transaction.votes);
    } else {
      backAction = () => navigation.navigate({ name: 'Home' });
    }
    navigation.setParams({
      theme,
      action: backAction
    });
  }, []);

  const transactionId = useMemo(() => tx?.id, [tx]);

  useEffect(() => {
    if (transactionId) {
      retrieveTransaction(transactionId);
    }
  }, [transactionId]);

  const onRefresh = () => {
    retrieveTransaction(tx?.id);
  };

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
  const discrete = route.params?.discrete ?? null;
  const isDelegateRegistration = isRegistration(tx);
  const isVoting = isVote(tx);
  const config = getConfig(styles, tx, walletAccountAddress);
  const amount = fromRawLsk(tx.amount);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]} testID="transaction-details" >
      <HeaderBackButton
        title="Transaction Details"
        onPress={navigation.goBack}
      />
      <ScrollView
        style={[styles.container, styles.theme.container]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TransactionSummary
          discrete={discrete}
          accountAddress={walletAccountAddress}
          tx={tx}
          language={language}
        />
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
              onPress={() => goToWallet(tx.senderAddress, { navigation, account, activeToken })}
              style={[styles.value, styles.theme.value, styles.transactionId]}
            >
              {getAccountLabel(tx.senderAddress, {
                t, followedAccounts, activeToken, truncate: true
              })}
            </A>
          </View>
          <Avatar address={config.firstAddress} size={40} />
        </Row>
        {!isTransfer(tx) || tx.recipientAddress === tx.senderAddress ? null : (
          <Row title="Recipient">
            <View style={styles.addressContainer}>
              <A
                value={tx.senderAddress}
                onPress={() => goToWallet(tx.recipientAddress, {
                  navigation, account, activeToken
                })}
                style={[styles.value, styles.theme.value, styles.transactionId]}
                testID="recipient"
              >
                {getAccountLabel(tx.recipientAddress, {
                  t, followedAccounts, activeToken, truncate: true
                })}
              </A>
            </View>
            <Avatar address={config.secondAddress} size={40} />
          </Row>
        )}
        {isTransfer(tx) && <Row title={'Amount'}>
          {!discrete ? (
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
            <CopyToClipboard
              style={[styles.value, styles.theme.value, styles.transactionId]}
              labelStyle={[styles.value, styles.theme.value]}
              showIcon={true}
              iconSize={18}
              value={tx.id}
              type={B}
              label={stringShortener(tx.id, 15, 6)}
            />
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
};

export default withTheme(translate()(TransactionDetails), getStyles());
