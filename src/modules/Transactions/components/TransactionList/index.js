import { View, Text } from 'react-native';
import React from 'react';
import { useGetTransactionsQuery } from '../../api/useGetTransactionsQuery';

export default function TransactionList() {
  const query = useGetTransactionsQuery();

  console.log({ query });

  return (
    <View>
      <Text>TransactionList</Text>
    </View>
  );
}
