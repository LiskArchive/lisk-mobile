import React from 'react';
import { View, Text, Image } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { stringShortener } from 'utilities/helpers';
import { TimeStamp } from 'components/shared/imessage/txDetail/dataRows';

import getTransactionRowStyles from './styles';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import { TransactionAmount, TransactionStatus } from './components';

export default function TransactionRow({ transaction }) {
  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  const transactionAssets = useTransactionAssets(transaction);

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.row]}>
        <Image
          source={transactionAssets.image }
          style={[styles.image]}
        />

        <View style={[styles.titleContainer, styles.theme.titleContainer]}>
          <Text style={[styles.addressText, styles.theme.addressText]}>
            {stringShortener(transaction.params.recipientAddress, 5, 5)}
          </Text>

          <TimeStamp
            timestamp={transaction.block.timestamp}
            format="MMM D, YYYY"
            styles={styles}
          />
        </View>
      </View>

      <View style={[styles.statusContainer, styles.theme.statusContainer]}>
        <TransactionAmount transaction={transaction} style={{ marginBottom: 4 }} />

        <TransactionStatus transaction={transaction}/>
      </View>
    </View>
  );
}
