import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
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
import { useTransactionsQuery } from '../../api/useTransactionsQuery';
import TransactionRow from '../TransactionRow';

import getTransactionListStyles from './styles';

export default function TransactionList({ mode = 'overview', style }) {
  const navigation = useNavigation();

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: errorOnTransactions,
    fetchNextPage: fetchNextTransactionsPage,
    hasNextPage: hasTransactionsNextPage,
    isFetchingNextPage: isFetchingTransactionsNextPage,
  } = useTransactionsQuery({
    config: {
      params: { limit: mode === 'overview' ? 3 : LIMIT },
    },
  });

  console.log({ transactionsData, errorOnTransactions });

  const { styles } = useTheme({
    styles: getTransactionListStyles(),
  });

  function renderHeader() {
    if (mode === 'full') return null;

    return (
      <View style={[styles.header, style?.header]}>
        <Text style={[styles.title, styles.theme.title, style?.title]}>
          {i18next.t('transactions.transactionList.title')}
        </Text>

        {!errorOnTransactions && !isLoadingTransactions && (
          <LabelButton
            onClick={() => navigation.navigate('TransactionsHistory')}
            style={[styles.labelButton, style?.labelButton]}
            textStyle={styles.labelButtonText}
            adornments={{
              right: (
                <CaretSvg
                  height={12}
                  width={12}
                  direction="right"
                  style={{ marginLeft: 8 }}
                  color={colors.light.ultramarineBlue}
                />
              ),
            }}
          >
            View all
          </LabelButton>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.theme.container, style?.container]}>
      {renderHeader()}

      <DataRenderer
        data={transactionsData?.data}
        isLoading={isLoadingTransactions}
        error={errorOnTransactions && errorOnTransactions.response?.status !== 404}
        renderData={(data) => (
          <InfiniteScrollList
            data={data.slice(0, 2)}
            keyExtractor={(item) => item.tokenID}
            renderItem={(item) => <TransactionRow transaction={item} />}
            renderSpinner
            fetchNextPage={fetchNextTransactionsPage}
            hasNextPage={hasTransactionsNextPage}
            isFetchingNextPage={isFetchingTransactionsNextPage}
          />
        )}
        renderLoading={() => (
          <P style={[styles.loadingText, styles.theme.loadingText]}>
            {i18next.t('transactions.transactionList.loadingText')}
          </P>
        )}
        renderEmpty={() => (
          <ResultScreen
            illustration={<EmptyIllustrationSvg />}
            description={i18next.t('transactions.transactionList.emptyText')}
            styles={{
              wrapper: styles.resultScreenContainer,
              container: styles.resultScreenContainer,
            }}
          />
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg />}
            description={i18next.t('transactions.transactionList.errorText')}
            styles={{
              wrapper: styles.resultScreenContainer,
              container: styles.resultScreenContainer,
            }}
          />
        )}
      />
    </View>
  );
}
