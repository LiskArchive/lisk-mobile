import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import { LIMIT } from 'utilities/api/constants';
import { LabelButton } from 'components/shared/toolBox/button';
import CaretSvg from 'assets/svgs/CaretSvg';
import { useGetTransactionsQuery } from '../../api/useGetTransactionsQuery';

import getTransactionListStyles from './styles';

export default function TransactionList({ mode = 'overview' }) {
  const navigation = useNavigation();

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

  function renderHeader() {
    if (mode === 'full') return null;

    return (
      <View style={[styles.header]}>
        <Text style={[styles.title, styles.theme.title]}>
          Transactions
        </Text>

        <LabelButton
          onClick={() => navigation.navigate('TransactionsHistory')}
          style={styles.labelButton}
          textStyle={styles.labelButtonText}
          adornments={{
            right:
              <CaretSvg
                height={12}
                width={12}
                direction='right'
                style={{ marginLeft: 8 }}
              />
          }}
        >
          View all
        </LabelButton>
      </View>
    );
  }

  function renderBody() {
    if (isLoadingTransactions) {
      return <Text>Loading transactions...</Text>;
    }

    if (isErrorOnTransactions) {
      return <Text>Error loading transactions!</Text>;
    }

    const transactions = transactionsData.data;

    console.log({ transactions });

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
      {renderHeader()}

      {renderBody()}
    </View>
  );
}
