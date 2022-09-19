/* eslint-disable max-statements */
import React, { memo, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { P, H3 } from 'components/shared/toolBox/typography';
import { fromRawLsk } from 'utilities/conversions';
import { useTheme } from 'hooks/useTheme';
import TokenSvg from 'assets/svgs/TokenSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import EmptyState from 'components/shared/EmptyState';
import { useCurrentAccount } from '../../hooks/useAccounts/useCurrentAccount';
import { useAccountTokensQuery } from '../../api/useAccountTokensQuery';

import tokensTabStyles from './styles';
import DataRenderer from '../../../../components/shared/DataRenderer';

const TokenItem = ({ token }) => {
  const tokenBalance = Number(fromRawLsk(token.availableBalance)).toLocaleString();
  const { styles } = useTheme({ styles: tokensTabStyles });
  return (
    <View style={[styles.tokenItem, styles.theme.tokenItem]}>
      <View style={styles.row}>
        <View style={[styles.row, styles.alignCenter]}>
          <TokenSvg symbol="LSK" height={28} width={28} />
          <P style={[styles.tokenTitle, styles.theme.tokenTitle]}>Lisk</P>
        </View>
        <View style={[styles.flex, styles.rightContent]}>
          <H3 style={[styles.theme.tokenTitle]}>{tokenBalance}</H3>
          {/* TODO: Implement currency conversion */}
          <P style={[styles.theme.currency]}>25USD</P>
        </View>
      </View>
    </View>
  );
};

const TokensScreen = ({ t, navigation }) => {
  const [currAccount] = useCurrentAccount();
  const { address } = currAccount.metadata;
  const { data: tokens = [], isLoading, error } = useAccountTokensQuery(address);

  const { styles } = useTheme({ styles: tokensTabStyles });

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

  return (
    <SafeAreaView style={[styles.flex, styles.theme.container]}>
      <HeaderBackButton title={'accounts.allTokens'} onPress={navigation.goBack} />

      <View style={styles.tokenContainer}>
        <DataRenderer
          data={tokens}
          isLoading={isLoading}
          error={error}
          renderData={(data) => (
            <FlatList
              data={data}
              renderItem={({ item }) => <TokenItem token={item} />}
              keyExtractor={(item) => item.tokenID}
            />
          )}
          renderLoading={() => <P>Loading token...</P>}
          renderEmpty={() => <EmptyState message={t('accounts.emptyTokenMessage')} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(translate()(TokensScreen));
