import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';

import getTransactionDetailsStyles from './styles';

export default function TransactionDetails({ route }) {
  const navigation = useNavigation();

  const { transactionId } = route.params;

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title="Transaction details"
        onPress={navigation.goBack}
      />

      <Text>{transactionId}</Text>
    </SafeAreaView>
  );
}
