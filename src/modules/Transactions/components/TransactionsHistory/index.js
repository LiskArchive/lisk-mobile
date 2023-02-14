import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TransactionList from '../TransactionList/TransactionList';

import getTransactionsHistoryStyles from './styles';

export default function TransactionsHistory() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: getTransactionsHistoryStyles() });

  const address = route.params?.address;

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={i18next.t('transactions.transactionHistory.title')}
        onPress={navigation.goBack}
        containerStyle={styles.header}
      />

      <TransactionList mode="full" address={address} style={{ container: styles.listContainer }} />
    </SafeAreaView>
  );
}
