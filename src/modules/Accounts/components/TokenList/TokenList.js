/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';

import { LabelButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyTokensIllustrationSvg from 'assets/svgs/EmptyTokensIllustrationSvg';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import DataRenderer from 'components/shared/DataRenderer';
import { LIMIT } from 'utilities/api/constants';
import { useAccountTokensFullDataQuery } from '../../api/useAccountTokensFullDataQuery';
import TokenRow from '../TokenRow/TokenRow';

import TokenListTabs from './components/TokenListTabs';
import getTokenListStyles from './TokenList.styles';
import { NO_OF_TOKENS_ON_OVERVIEW } from './TokenList.constants';
import TokenListSkeleton from './components/TokenListSkeleton';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';

export default function TokenList({ mode = 'overview', address, style }) {
  const [activeTab, setActiveTab] = useState(0);

  const [currentAccount] = useCurrentAccount();

  const navigation = useNavigation();

  const {
    data: tokensData,
    isLoading: isLoadingTokens,
    error: errorOnTokens,
    fetchNextPage: fetchNextTokensPage,
    hasNextPage: hasTokensNextPage,
    isFetchingNextPage: isFetchingTokensNextPage,
    refetch: refetchTokens,
  } = useAccountTokensFullDataQuery(address, {
    config: {
      params: { limit: mode === 'overview' ? NO_OF_TOKENS_ON_OVERVIEW : LIMIT },
    },
    options: {
      cacheTime: 0,
      refetchInterval: 5000,
      refetchIntervalInBackground: false,
    },
  });

  const lockedTokens = useMemo(() => {
    const res = [];
    let amount = 0;

    tokensData?.data?.forEach((token) => {
      if (token.lockedBalances) {
        token.lockedBalances.forEach((lockedBalance) => {
          amount += Number(lockedBalance.amount);
        });
      }
      if (amount) {
        res.push({ symbol: token.symbol, amount });
      }
    });
    return lockedTokens;
  }, [tokensData?.data]);

  const { styles } = useTheme({
    styles: getTokenListStyles(),
  });

  const areMoreOnOverview = tokensData?.meta.count < tokensData?.meta.total;

  const showViewAllButton =
    mode === 'overview' && !errorOnTokens && !isLoadingTokens && areMoreOnOverview;

  const isCurrentAccount = currentAccount.metadata.address === address;

  return (
    <View style={[styles.theme.container, style?.container]}>
      <View style={[styles.header, !showViewAllButton && styles.headerExtraMargin, style?.header]}>
        <TokenListTabs
          lockedTokens={lockedTokens}
          activeTab={activeTab}
          onTokensClick={() => setActiveTab(0)}
          onLockedTokensClick={() => setActiveTab(1)}
        />

        {showViewAllButton && (
          <LabelButton
            onClick={() => navigation.navigate({ name: 'Tokens', params: { address } })}
            style={[styles.labelButton]}
            textStyle={styles.viewAllButtonText}
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
            {i18next.t('accounts.buttons.viewAll')}
          </LabelButton>
        )}
      </View>

      <DataRenderer
        data={activeTab === 0 ? tokensData?.data : lockedTokens}
        isLoading={isLoadingTokens}
        error={errorOnTokens}
        renderData={(data) => (
          <InfiniteScrollList
            data={data}
            keyExtractor={(item) => item.tokenID}
            renderItem={(item) => <TokenRow token={item} />}
            fetchNextPage={fetchNextTokensPage}
            hasNextPage={mode === 'full' && hasTokensNextPage}
            isFetchingNextPage={isFetchingTokensNextPage}
          />
        )}
        renderLoading={() => <TokenListSkeleton />}
        renderEmpty={() => (
          <ResultScreen
            illustration={<EmptyTokensIllustrationSvg />}
            description={
              isCurrentAccount
                ? i18next.t('accounts.currentAccountEmptyTokenMessage')
                : i18next.t('accounts.emptyTokenMessage')
            }
            styles={{ wrapper: { paddingVertical: 32 } }}
          />
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg height={72} />}
            description={i18next.t('accounts.errorOnTokensText')}
          >
            <LabelButton onPress={refetchTokens} textStyle={styles.labelButtonText}>
              {i18next.t('commons.buttons.reload')}
            </LabelButton>
          </ResultScreen>
        )}
      />
    </View>
  );
}
