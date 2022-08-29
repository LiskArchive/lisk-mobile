import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TransactionList from '../TransactionList';

import getTransactionsHistoryStyles from './styles';

export default function TransactionsHistory() {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getTransactionsHistoryStyles() });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('transactions.transactionHistory.title')}
        onPress={navigation.goBack}
      />

      <TransactionList mode="full"/>
    </SafeAreaView>
  );
}
