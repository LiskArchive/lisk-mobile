import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { useGetTransactionsQuery } from '../../api/useGetTransactionsQuery';

import getTransactionListStyles from './styles';

export default function TransactionList() {
  const query = useGetTransactionsQuery();

  const { styles } = useTheme({
    styles: getTransactionListStyles(),
  });

  console.log({ query });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <Text style={[styles.title, styles.theme.title]}>Transactions</Text>
    </View>
  );
}
