import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useGetTransactionQuery } from '../../api/useGetTransactionQuery';

import getTransactionDetailsStyles from './styles';
import { TransactionDetailsBody } from './components';

export default function TransactionDetails({ route }) {
  const navigation = useNavigation();

  const { transactionId } = route.params;

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    error: errorOnTransaction
  } = useGetTransactionQuery(transactionId);

  const transaction = transactionData?.data[0];

  function renderBody() {
    if (isLoadingTransaction) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Text>Loading transaction...</Text>
        </View>
      );
    }

    if (errorOnTransaction) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Text>Error loading transaction!</Text>
        </View>
      );
    }

    return <TransactionDetailsBody transaction={transaction} />;
  }

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title="Transaction details"
        onPress={navigation.goBack}
      />

      {renderBody()}
    </SafeAreaView>
  );
}
