/* eslint-disable max-statements */
import React, { memo, useMemo, useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P, H3 } from 'components/shared/toolBox/typography';
import { LabelButton } from 'components/shared/toolBox/button';
import DataRenderer from 'components/shared/DataRenderer';
import EmptyState from 'components/shared/EmptyState';
import { colors } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';
import TokenSvg from 'assets/svgs/TokenSvg';
import { fromRawLsk } from 'utilities/conversions';
import { useCurrentAccount } from '../../hooks/useAccounts/useCurrentAccount';
import { useAccountTokensQuery } from '../../api/useAccountTokensQuery';

import tokensTabStyles from './styles';

const TokenItem = ({ token }) => {
  const { styles } = useTheme({ styles: tokensTabStyles });
  const tokenBalance = Number(fromRawLsk(token.availableBalance)).toLocaleString();
  return (
    <View style={[styles.tokenItem]}>
      <View style={styles.row}>
        <View style={[styles.row, styles.alignCenter]}>
          <TokenSvg symbol="LSK" height={28} width={28} />
          <P style={[styles.tokenTitle, styles.theme.tokenTitle]}>Lisk</P>
        </View>
        <View style={[styles.flex, styles.rightContent]}>
          <H3 style={[styles.theme.tokenTitle]}>{tokenBalance}</H3>
          {/* TODO: Implement currency conversion */}
          <P style={[styles.currency, styles.theme.currency]}>25USD</P>
        </View>
      </View>
    </View>
  );
};

const TokensTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [currAccount] = useCurrentAccount();

  const { address } = currAccount.metadata;

  const {
    data: tokens = [],
    isLoading: isLoadingAccountTokens,
    error: errorOnAccountTokens,
  } = useAccountTokensQuery(address, { config: { params: { limit: 3 } } });

  const navigation = useNavigation();

  const { styles } = useTheme({ styles: tokensTabStyles });

  const hasLockedTokens = useMemo(() => tokens.some((token) => token.lockedBalances), [tokens]);

  const lockedTokens = useMemo(() => {
    const res = [];
    tokens.forEach((token) => {
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
  }, [tokens]);

  const showViewMore = useMemo(() => tokens.length, [tokens]);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.alignCenter]}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 0 && styles.tabItemActive]}
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

        {!!showViewMore && (
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

      <View style={styles.tokenContainer}>
        <DataRenderer
          data={tokens}
          isLoading={isLoadingAccountTokens}
          error={errorOnAccountTokens?.response?.status !== 404 && errorOnAccountTokens}
          renderData={(data) => (
            <>
              {activeTab === 0 && (
                <FlatList
                  data={data.slice(0, 2)}
                  renderItem={({ item }) => <TokenItem token={item} />}
                  keyExtractor={(item) => item.tokenID}
                />
              )}

              {activeTab === 1 && (
                <FlatList
                  data={lockedTokens?.slice(0, 2)}
                  renderItem={({ item }) => <TokenItem token={item} />}
                  keyExtractor={(item) => item.tokenID}
                />
              )}
            </>
          )}
          renderLoading={() => (
            <P style={[styles.loadingText, styles.theme.loadingText]}>Loading tokens...</P>
          )}
          renderEmpty={() => <EmptyState message={i18next.t('accounts.emptyTokenMessage')} />}
        />
      </View>
    </View>
  );
};

export default memo(TokensTab);
