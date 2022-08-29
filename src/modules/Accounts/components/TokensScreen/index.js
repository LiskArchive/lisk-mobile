/* eslint-disable max-statements */
import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import { P, H3 } from 'components/shared/toolBox/typography';
import { fromRawLsk } from 'utilities/conversions';
import { useTheme } from 'hooks/useTheme';
import TokenSvg from 'assets/svgs/TokenSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import EmptyState from 'components/shared/EmptyState';
import { useCurrentAccount } from '../../hooks/useAccounts/useCurrentAccount';
import { useAccountTokens } from '../../hooks/useAccounts/useAccountTokens';

import tokensTabStyles from './styles';

const TokenItem = ({ token }) => {
  const { styles } = useTheme({ styles: tokensTabStyles });
  return <View style={[styles.tokenItem]} >
    <View style={styles.row} >
      <View style={[styles.row, styles.alignCenter]} >
        <TokenSvg symbol="LSK" height={28} width={28} />
        <P style={[styles.tokenTitle]} >Lisk</P>
      </View>
      <View style={[styles.flex, styles.rightContent]} >
        <H3>{Number(fromRawLsk(token.availableBalance)).toLocaleString()}</H3>
        <P>25USD</P>
      </View>
    </View>
  </View>;
};

const TokensScreen = ({ t, navigation }) => {
  const [currAccount] = useCurrentAccount();
  const { address } = currAccount.metadata;
  const { data: tokens = [], isLoading } = useAccountTokens(address);
  const [activeTab] = useState(0);

  const { styles } = useTheme({ styles: tokensTabStyles });

  const lockedTokens = useMemo(() => {
    const res = [];
    tokens.forEach(token => {
      let amount = 0;
      if (token.lockedBalances) {
        token.lockedBalances.forEach(lockedBalance => { amount += Number(lockedBalance.amount); });
      }
      if (amount) {
        res.push({ symbol: token.symbol, amount });
      }
    });
    return lockedTokens;
  }, [tokens]);

  const isEmpty = useMemo(() => !isLoading && !tokens.length, [tokens, isLoading]);

  return <SafeAreaView style={styles.container} >
    <HeaderBackButton
        title={'accounts.allTokens'}
        onPress={navigation.goBack}
      />
    <View style={styles.tokenContainer} >
      {isEmpty && <EmptyState message={t('accounts.emptyTokenMessage')} />}
      {activeTab === 0
        && <FlatList
          data={tokens}
          renderItem={({ item }) => <TokenItem token={item} />}
          keyExtractor={(item) => item.tokenID}
        />
      }
      {activeTab === 1
        && <FlatList
          data={lockedTokens}
          renderItem={({ item }) => <TokenItem token={item} />}
          keyExtractor={(item) => item.tokenID}
        />
      }
    </View>
  </SafeAreaView>;
};

export default memo(translate()(TokensScreen));
