/* eslint-disable max-statements */
import React, { memo, useMemo, useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import { P, H3 } from 'components/shared/toolBox/typography';
import { fromRawLsk } from 'utilities/conversions';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';
import TokenSvg from 'assets/svgs/TokenSvg';
import { useNavigation } from '@react-navigation/native';
import tokensTabStyles from './styles';
import { useCurrentAccount } from '../../hooks/useAccounts/useCurrentAccount';
import { useAccountTokens } from '../../hooks/useAccounts/useAccountTokens';
import EmptyState from '../EmptyState';

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

const TokensTab = ({ t }) => {
  const [currAccount] = useCurrentAccount();
  const { address } = currAccount.metadata;
  const { data: tokens = [], isLoading } = useAccountTokens(address);
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: tokensTabStyles });

  const hasLockedTokens = useMemo(() => tokens.some(token => token.lockedBalances), [tokens]);

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

  const viewAllTokens = () => navigation.navigate('Tokens');

  const showViewMore = useMemo(() => tokens.length, [tokens]);

  const isEmpty = useMemo(() => !isLoading && !tokens.length, [tokens, isLoading]);

  return <View style={styles.container} >
    <View style={[styles.row, styles.alignCenter]} >
      <View style={styles.tabsContainer} >
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 0 && styles.tabItemActive]}
          onPress={() => setActiveTab(0)} >
          <P style={[styles.tabItemText, activeTab === 0 && styles.tabItemTextActive]} >
            {t('accounts.tokens')}
          </P>
        </TouchableOpacity>
        {hasLockedTokens && <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 && styles.tabItemActive]}
          onPress={() => setActiveTab(1)}>
          <P style={[styles.tabItemText, activeTab === 1 && styles.tabItemTextActive]} >
            {t('accounts.lockedTokens')}
          </P>
        </TouchableOpacity>
        }
      </View>
      {!!showViewMore
        && <TouchableOpacity style={[styles.tabItem, styles.row]} onPress={viewAllTokens} >
          <P style={[styles.tabItemText, styles.viewAll]} >{t('accounts.buttons.viewAll')}</P>
          <View style={[styles.viewIcon]} >
            <CaretSvg height={15} width={15} direction='right' color={colors.light.ultramarineBlue} />
          </View>
        </TouchableOpacity>}
    </View>
    <View style={styles.tokenContainer} >
      {isEmpty && <EmptyState message={t('accounts.emptyTokenMessage')} />}
      {activeTab === 0
        && <FlatList
          data={tokens?.slice(0, 2)}
          renderItem={({ item }) => <TokenItem token={item} />}
          keyExtractor={(item) => item.tokenID}
        />
      }
      {activeTab === 1
        && <FlatList
          data={lockedTokens?.slice(0, 2)}
          renderItem={({ item }) => <TokenItem token={item} />}
          keyExtractor={(item) => item.tokenID}
        />
      }
    </View>
  </View>;
};

export default memo(translate()(TokensTab));
