/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useAccountTransactionsQuery } from 'modules/Accounts/api/useAccountTransactionsQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';
import { LIMIT } from 'utilities/api/constants';
import { LabelButton } from 'components/shared/toolBox/button';
import DataRenderer from 'components/shared/DataRenderer';
import { P } from 'components/shared/toolBox/typography';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import TransactionRow from '../TransactionRow/TransactionRow';

import getTransactionListStyles from './TransactionList.styles';
import { NO_OF_TRANSACTIONS_ON_OVERVIEW } from './TransactionList.constants';
import TransactionListSkeleton from './components/TransactionListSkeleton';

export default function TransactionList({ mode = 'overview', address, style }) {
  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

  const noOfItemsToRender = mode === 'overview' ? NO_OF_TRANSACTIONS_ON_OVERVIEW : LIMIT;

  const {
    data: transactionsData,
    isLoading: isLoadingAccountTransactions,
    error: errorOnTransactions,
    fetchNextPage: fetchNextTransactionsPage,
    hasNextPage: hasTransactionsNextPage,
    isFetchingNextPage: isFetchingTransactionsNextPage,
    refetch: refetchTransactions,
  } = useAccountTransactionsQuery(address, {
    config: {
      params: { limit: noOfItemsToRender },
    },
  });

  const { styles } = useTheme({
    styles: getTransactionListStyles(),
  });

  const areMoreOnOverview = transactionsData?.meta.count < transactionsData?.meta.total;

  const showViewAllButton =
    !errorOnTransactions && !isLoadingAccountTransactions && areMoreOnOverview;

  const isCurrentAccount = currentAccount.metadata.address === address;

  const renderHeader = () => {
    if (mode === 'full') return null;

    return (
      <View
        style={[styles.header, !showViewAllButton && styles.headerExtraMargin, style?.header]}
        testID="transaction-list"
      >
        <P style={[styles.title, styles.theme.title, style?.title]}>
          {i18next.t('transactions.transactionList.title')}
        </P>

        {showViewAllButton && (
          <LabelButton
            onPress={() =>
              navigation.navigate({ name: 'TransactionsHistory', params: { address } })
            }
            textStyle={styles.labelButtonText}
            adornments={{
              right: (
                <CaretSvg
                  height={14}
                  width={14}
                  direction="right"
                  style={{ marginLeft: 4 }}
                  color={colors.light.ultramarineBlue}
                />
              ),
            }}
          >
            {i18next.t('commons.buttons.viewAll')}
          </LabelButton>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.theme.container, style?.container]}>
      {renderHeader()}

      <DataRenderer
        data={transactionsData?.data}
        isLoading={isLoadingAccountTransactions}
        error={errorOnTransactions}
        renderData={(data) => (
          <InfiniteScrollList
            data={mode === 'full' ? data : data.slice(0, noOfItemsToRender)}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <TransactionRow transaction={item} address={address} />}
            fetchNextPage={fetchNextTransactionsPage}
            hasNextPage={mode === 'full' && hasTransactionsNextPage}
            isFetchingNextPage={isFetchingTransactionsNextPage}
            ListFooterComponent={mode === 'full' ? <View style={{ height: 50 }} /> : null}
            initialNumToRender={noOfItemsToRender}
          />
        )}
        renderLoading={() => <TransactionListSkeleton />}
        renderEmpty={() => (
          <ResultScreen
            illustration={<EmptyIllustrationSvg />}
            description={
              isCurrentAccount
                ? i18next.t('transactions.transactionList.emptyText')
                : "This account hasn't performed any transaction yet."
            }
            styles={{
              wrapper: styles.resultScreenContainer,
              container: styles.resultScreenContainer,
            }}
          />
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg height={72} />}
            description={i18next.t('transactions.transactionList.errorText')}
            styles={{
              wrapper: styles.resultScreenContainer,
              container: styles.resultScreenContainer,
            }}
          >
            <LabelButton onPress={refetchTransactions} textStyle={[styles.labelButtonText]}>
              {i18next.t('commons.buttons.reload')}
            </LabelButton>
          </ResultScreen>
        )}
      />
    </View>
  );
}
