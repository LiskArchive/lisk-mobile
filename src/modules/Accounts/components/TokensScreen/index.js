import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TokenList from '../TokenList';

import tokensTabStyles from './styles';

export default function TokensScreen() {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: tokensTabStyles });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title={i18next.t('accounts.allTokens')} onPress={navigation.goBack} />

      <TokenList mode="full" style={{ container: styles.tokenListContainer }} />
    </SafeAreaView>
  );
}
