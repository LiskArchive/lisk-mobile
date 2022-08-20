import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import TokensTab from '../TokensTab';
import getStyles from './styles';

const TokensScreen = () => {
  const { styles } = useTheme({ styles: getStyles });

  return <SafeAreaView >
    <View style={[styles.container]} >
      <TokensTab fullScreen />
    </View>
  </SafeAreaView>;
};

export default TokensScreen;
