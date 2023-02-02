import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { stringShortener } from 'utilities/helpers';
import { fromRawLsk } from 'utilities/conversions';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import TransactionTimestamp from '../TransactionTimestamp';

import getTransactionRowStyles from './TransactionRow.styles';
import DiscreteModeComponent from '../../../../components/shared/DiscreteModeComponent';
import { TransactionAmount } from './components/TransactionAmount';
import { TransactionStatus } from './components/TransactionStatus';

export default function TransactionRow({ transaction }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  const transactionAssets = useTransactionAssets({ transaction, style: { icon: styles.icon } });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TransactionDetails', { transactionId: transaction.id })}
      style={[styles.container, styles.theme.container]}
    >
      <View style={[styles.row]}>
        {transactionAssets.icon}

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
          blurVariant={transactionAssets.amount?.sign === '-' ? 'outgoing' : 'incoming'}
          data={transaction.notRawLisk ? transaction.amount : fromRawLsk(transaction.params.amount)}
        >
          <TransactionAmount transaction={transaction} style={{ marginBottom: 4 }} />
        </DiscreteModeComponent>

        <TransactionStatus transaction={transaction} />
      </View>
    </TouchableOpacity>
  );
}