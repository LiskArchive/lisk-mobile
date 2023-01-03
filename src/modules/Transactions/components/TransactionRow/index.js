import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import { stringShortener } from 'utilities/helpers';
import { fromRawLsk } from 'utilities/conversions';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import TransactionTimestamp from '../TransactionTimestamp';

import getTransactionRowStyles from './styles';
import { TransactionAmount, TransactionStatus } from './components';
import DiscreteModeComponent from '../../../../components/shared/DiscreteModeComponent';

export default function TransactionRow({ transaction }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  const transactionAssets = useTransactionAssets(transaction);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TransactionDetails', { transactionId: transaction.id })}
      style={[styles.container, styles.theme.container]}
    >
      <View style={[styles.row]}>
        <Image source={transactionAssets.image} style={[styles.image]} />

        <View style={[styles.titleContainer, styles.theme.titleContainer]}>
          <Text style={[styles.addressText, styles.theme.addressText]}>
            {stringShortener(transaction.params.recipientAddress, 5, 5)}
          </Text>

          <TransactionTimestamp
            timestamp={transaction.block.timestamp}
            format="MMM D, YYYY"
            styles={styles}
          />
        </View>
      </View>

      <View style={[styles.statusContainer, styles.theme.statusContainer]}>
        <DiscreteModeComponent
          blurVariant={transactionAssets.amount.sign === '-' ? 'outgoing' : 'incoming'}
          data={transaction.notRawLisk ? transaction.amount : fromRawLsk(transaction.params.amount)}
        >
          <TransactionAmount transaction={transaction} style={{ marginBottom: 4 }} />
        </DiscreteModeComponent>

        <TransactionStatus transaction={transaction} />
      </View>
    </TouchableOpacity>
  );
}
