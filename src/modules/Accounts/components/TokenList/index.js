/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';

import { P } from 'components/shared/toolBox/typography';
import { LabelButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import EmptyState from 'components/shared/EmptyState';
import DataRenderer from 'components/shared/DataRenderer';
import { LIMIT } from 'utilities/api/constants';
import { useCurrentAccount } from '../../hooks/useAccounts/useCurrentAccount';
import { useAccountTokensQuery } from '../../api/useAccountTokensQuery';
import TokenRow from '../TokenRow';

import getTokenListStyles from './styles';

export default function TokenList({ mode = 'overview', style }) {
  const [activeTab, setActiveTab] = useState(0);

  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();
  const { address } = currentAccount.metadata;

  const {
    data: tokensData = [],
    isLoading: isLoadingTokens,
    error: errorOnTokens,
    fetchNextPage: fetchNextTokensPage,
    hasNextPage: hasTokensNextPage,
    isFetchingNextPage: isFetchingTokensNextPage,
  } = useAccountTokensQuery(address, {
    config: {
      params: { limit: mode === 'overview' ? 2 : LIMIT },
    },
  });

  const hasLockedTokens = useMemo(
    () => tokensData.some((token) => token.lockedBalances),
    [tokensData]
  );

  const lockedTokens = useMemo(() => {
    const res = [];
    tokensData.forEach((token) => {
      let amount = 0;
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
  }, [tokensData]);

  const { styles } = useTheme({
    styles: getTokenListStyles(),
  });

  return (
    <View style={[styles.theme.container, style?.container]}>
      <View style={[styles.header, style?.header]}>
        <View style={[styles.tabsContainer]}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 0 && styles.theme.tabItemActive]}
            onPress={() => setActiveTab(0)}
          >
            <P style={[styles.tabItemText, activeTab === 0 && styles.tabItemTextActive]}>
              {i18next.t('accounts.tokens')}
            </P>
          </TouchableOpacity>

          {hasLockedTokens && (
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 1 && styles.tabItemActive]}
              onPress={() => setActiveTab(1)}
            >
              <P style={[styles.tabItemText, activeTab === 1 && styles.tabItemTextActive]}>
                {i18next.t('accounts.lockedTokens')}
              </P>
            </TouchableOpacity>
          )}
        </View>

        {mode === 'overview' && !errorOnTokens && !isLoadingTokens && (
          <LabelButton
            onClick={() => navigation.navigate('Tokens')}
            style={[styles.labelButton]}
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
            {i18next.t('accounts.buttons.viewAll')}
          </LabelButton>
        )}
      </View>

      <DataRenderer
        data={activeTab === 0 ? tokensData : lockedTokens}
        isLoading={isLoadingTokens}
        error={errorOnTokens && errorOnTokens.response?.status !== 404}
        renderData={(data) => (
          <InfiniteScrollList
            data={data.slice(0, 2)}
            keyExtractor={(item) => item.tokenID}
            renderItem={(item) => <TokenRow token={item} />}
            renderSpinner
            fetchNextPage={fetchNextTokensPage}
            hasNextPage={hasTokensNextPage}
            isFetchingNextPage={isFetchingTokensNextPage}
          />
        )}
        renderLoading={() => (
          <P style={[styles.loadingText, styles.theme.loadingText]}>
            {i18next.t('accounts.loadingTokensText')}
          </P>
        )}
        renderEmpty={() => <EmptyState message={i18next.t('accounts.emptyTokenMessage')} />}
        renderError={() => (
          <P style={[styles.loadingText, styles.theme.loadingText]}>
            {i18next.t('accounts.errorOnTokensText')}
          </P>
        )}
      />
    </View>
  );
}
