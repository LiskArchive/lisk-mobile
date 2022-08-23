import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TransactionList from '../TransactionList';

import getTransactionsHistoryStyles from './styles';

export default function TransactionsHistory() {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getTransactionsHistoryStyles });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title="Transaction history"
        onPress={navigation.goBack}
      />

      {/* <Text>pico</Text> */}

      <TransactionList mode="full"/>
    </SafeAreaView>
  );
}
