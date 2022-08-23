import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import getTransactionListStyles from './styles';

export default function TransactionList() {
  // TODO: Add useGetTransactionsQuery to fetch TXs.

  const { styles } = useTheme({
    styles: getTransactionListStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <Text style={[styles.title, styles.theme.title]}>Transactions</Text>
    </View>
  );
}
