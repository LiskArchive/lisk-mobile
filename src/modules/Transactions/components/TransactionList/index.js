import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import { LIMIT } from 'utilities/api/constants';
import { LabelButton } from 'components/shared/toolBox/button';
import CaretSvg from 'assets/svgs/CaretSvg';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import EmptyState from 'components/shared/EmptyState';
import { useGetTransactionsQuery } from '../../api/useGetTransactionsQuery';
import TransactionRow from '../TransactionRow';

import getTransactionListStyles from './styles';

export default function TransactionList({ mode = 'overview' }) {
  const navigation = useNavigation();

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: errorOnTransactions,
    fetchNextPage: fetchNextTransactionsPage,
    hasNextPage: hasTransactionsNextPage,
    isFetchingNextPage: isFetchingTransactionsNextPage,
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
          {i18next.t('transactions.transactionList.title')}
        </Text>

        {!errorOnTransactions && !isLoadingTransactions && (
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
                  color={colors.light.ultramarineBlue}
                />
            }}
          >
            View all
          </LabelButton>
        )}

      </View>
    );
  }

  function renderBody() {
    if (isLoadingTransactions) {
      return (
        <Text style={{ marginTop: 16 }}>
          {i18next.t('transactions.transactionList.loadingText')}
        </Text>
      );
    }

    if (errorOnTransactions) {
      if (errorOnTransactions.response.status === 404) {
        return (
          <EmptyState
            message={i18next.t('transactions.transactionList.emptyText')}
          />
        );
      }

      return (
        <Text style={{ marginTop: 16 }}>
          {i18next.t('transactions.transactionList.errorText')}
        </Text>
      );
    }

    const transactions = transactionsData.data;

    return (
      <InfiniteScrollList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <TransactionRow transaction={item} />
        )}
        renderSpinner
        fetchNextPage={fetchNextTransactionsPage}
        hasNextPage={hasTransactionsNextPage}
        isFetchingNextPage={isFetchingTransactionsNextPage}
      />
    );
  }

  return (
    <View style={[styles.container, styles.theme.container]}>
      {renderHeader()}

      {renderBody()}
    </View>
  );
}
