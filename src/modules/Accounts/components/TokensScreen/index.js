import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { useAccountTokens } from 'modules/Accounts/hooks/useAccounts/useAccountTokens';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import TokensTab from '../TokensTab';
import getStyles from './styles';

const TokensScreen = () => {
  const [currAccount] = useCurrentAccount();
  const { address } = currAccount.metadata;
  const { tokens } = useAccountTokens(address);
  const { styles } = useTheme({ styles: getStyles });

  return <SafeAreaView >
    <View style={[styles.container]} >
      <TokensTab tokens={tokens} fullScreen />
    </View>
  </SafeAreaView>;
};

export default TokensScreen;
