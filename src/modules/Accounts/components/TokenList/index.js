/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';

import { P } from 'components/shared/toolBox/typography';
import { LabelButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import DataRenderer from 'components/shared/DataRenderer';
import { LIMIT } from 'utilities/api/constants';
import { useAccountTokensQuery } from '../../api/useAccountTokensQuery';
import TokenRow from '../TokenRow';

import TokenListTabs from './TokenListTabs';
import getTokenListStyles from './styles';

export default function TokenList({ mode = 'overview', style }) {
  const [activeTab, setActiveTab] = useState(0);

  const navigation = useNavigation();

  const {
    data: tokensData,
    isLoading: isLoadingTokens,
    error: errorOnTokens,
    fetchNextPage: fetchNextTokensPage,
    hasNextPage: hasTokensNextPage,
    isFetchingNextPage: isFetchingTokensNextPage,
  } = useAccountTokensQuery({
    config: {
      params: { limit: mode === 'overview' ? 2 : LIMIT },
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

  const showViewAllButton =
    mode === 'overview' && !errorOnTokens && !isLoadingTokens && tokensData?.data.length > 0;

  return (
    <View style={[styles.theme.container, style?.container]}>
      <View style={[styles.header, style?.header]}>
        <TokenListTabs
          lockedTokens={lockedTokens}
          activeTab={activeTab}
          onTokensClick={() => setActiveTab(0)}
          onLockedTokensClick={() => setActiveTab(1)}
        />

        {showViewAllButton && (
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
        data={activeTab === 0 ? tokensData?.data : lockedTokens}
        isLoading={isLoadingTokens}
        error={errorOnTokens && errorOnTokens.response?.status !== 404}
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
        renderLoading={() => (
          <P style={[styles.loadingText, styles.theme.loadingText]}>
            {i18next.t('accounts.loadingTokensText')}
          </P>
        )}
        renderEmpty={() => (
          <ResultScreen
            illustration={<EmptyIllustrationSvg />}
            description={i18next.t('accounts.emptyTokenMessage')}
            styles={{
              wrapper: styles.resultScreenContainer,
              container: styles.resultScreenContainer,
            }}
          />
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg />}
            description={i18next.t('accounts.errorOnTokensText')}
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
