import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { LIMIT } from 'utilities/api/constants';

import getTransactionListStyles from './styles';
import { useGetTransactionsQuery } from '../../api/useGetTransactionsQuery';

export default function TransactionList({ mode = 'overview' }) {
  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorOnTransactions
  } = useGetTransactionsQuery({
    config: {
      params: { limit: mode === 'overview' ? 3 : LIMIT }
    }
  });

  const { styles } = useTheme({
    styles: getTransactionListStyles(),
  });

  console.log({ transactionsData });

  function renderBody() {
    if (isLoadingTransactions) {
      return <Text>Loading transactions...</Text>;
    }

    if (isErrorOnTransactions) {
      return <Text>Error loading transactions!</Text>;
    }

    const transactions = transactionsData.data;

    return (
      <>
        {transactions.map(transaction => (
          <Text key={transaction.id}>
            {transaction.params.recipientAddress}
          </Text>
        ))}
      </>
    );
  }

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.title, styles.theme.title]}>
          Transactions
        </Text>

      </View>

      {renderBody()}
    </View>
  );
}
