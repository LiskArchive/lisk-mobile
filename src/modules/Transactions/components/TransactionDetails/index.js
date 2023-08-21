import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { P } from 'components/shared/toolBox/typography';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DataRenderer from 'components/shared/DataRenderer';
import { useTransactionQuery } from '../../api/useTransactionQuery';

import getTransactionDetailsStyles from './styles';
import { TransactionDetailsBody } from './components';

export default function TransactionDetails(props) {
  const navigation = useNavigation();

  const transactionId = props.route.params.transactionId || props.transactionId;
  const address = props.route.params.address || props.address;

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    error: errorOnTransaction,
  } = useTransactionQuery(transactionId);

  return (
    <SafeAreaView style={[styles.flex, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('transactions.transactionDetails.title')}
        onPress={navigation.goBack}
      />
      <View style={[styles.content, styles.flex]}>
        <DataRenderer
          data={transactionData?.data[0]}
          isLoading={isLoadingTransaction}
          error={errorOnTransaction}
          renderData={(data) => <TransactionDetailsBody transaction={data} address={address} />}
          renderLoading={() => <P>{i18next.t('transactions.transactionDetails.loadingText')}</P>}
          renderError={() => <P>{i18next.t('transactions.transactionDetails.errorText')}</P>}
        />
      </View>
    </SafeAreaView>
  );
}
