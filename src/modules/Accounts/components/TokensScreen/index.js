import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TokenList from '../TokenList/TokenList';

import tokensTabStyles from './styles';

export default function TokensScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: tokensTabStyles });

  const accountAddress = route.params?.accountAddress;

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title={i18next.t('accounts.allTokens')} onPress={navigation.goBack} />

      <TokenList
        mode="full"
        accountAddress={accountAddress}
        style={{ container: styles.tokenListContainer }}
      />
    </SafeAreaView>
  );
}
