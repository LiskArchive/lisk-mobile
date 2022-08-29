import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import i18next from 'i18next';
import { useGetTransactionQuery } from '../../api/useGetTransactionQuery';

import getTransactionDetailsStyles from './styles';
import { TransactionDetailsBody } from './components';

export default function TransactionDetails(props) {
  const navigation = useNavigation();

  const transactionId = props.route.params.transactionId || props.transactionId;

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
          <Text>
            {i18next.t('transactions.transactionDetails.loadingText')}
          </Text>
        </View>
      );
    }

    if (errorOnTransaction) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Text>
            {i18next.t('transactions.transactionDetails.errorText')}
          </Text>
        </View>
      );
    }

    return <TransactionDetailsBody transaction={transaction} />;
  }

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('transactions.transactionDetails.title')}
        onPress={navigation.goBack}
      />

      {renderBody()}
    </SafeAreaView>
  );
}
