import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DataRenderer from 'components/shared/DataRenderer';
import { useTransactionQuery } from '../../api/useTransactionQuery';

import getTransactionDetailsStyles from './styles';
import { TransactionDetailsBody } from './components';

export default function TransactionDetails(props) {
  const navigation = useNavigation();

  const transactionId = props.route.params.transactionId || props.transactionId;

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    error: errorOnTransaction,
  } = useTransactionQuery(transactionId);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('transactions.transactionDetails.title')}
        onPress={navigation.goBack}
      />

      <DataRenderer
        data={transactionData?.data[0]}
        isLoading={isLoadingTransaction}
        error={errorOnTransaction}
        renderData={(data) => <TransactionDetailsBody transaction={data} />}
        renderLoading={() => (
          <Text>{i18next.t('transactions.transactionDetails.loadingText')}</Text>
        )}
        renderError={() => <Text>{i18next.t('transactions.transactionDetails.errorText')}</Text>}
      />
    </SafeAreaView>
  );
}
