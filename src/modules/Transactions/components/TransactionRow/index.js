import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { stringShortener } from 'utilities/helpers';
import { TimeStamp } from 'components/shared/imessage/txDetail/dataRows';

import getTransactionRowStyles from './styles';

export default function TransactionRow({ transaction }) {
  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.column, styles.theme.column]}>
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
  );
}
