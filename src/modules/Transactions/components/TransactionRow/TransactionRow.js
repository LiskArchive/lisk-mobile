import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { stringShortener } from 'utilities/helpers';
import { fromBeddowsToLsk } from 'utilities/conversions.utils';
import { H4 } from 'components/shared/toolBox/typography';
import DiscreteModeComponent from 'components/shared/DiscreteModeComponent';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import TransactionTimestamp from '../TransactionTimestamp';

import getTransactionRowStyles from './TransactionRow.styles';
import { TransactionAmount } from './components/TransactionAmount';
import { TransactionStatus } from './components/TransactionStatus';

export default function TransactionRow({ transaction, address }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  const transactionAssets = useTransactionAssets({
    transaction,
    address,
    style: { icon: styles.icon },
  });

  const shownAddress = transaction.params.recipientAddress || transaction.sender.address;

  const blurVariant = transactionAssets.amount?.sign === '-' ? 'outgoing' : 'incoming';

  const handlePress = () =>
    navigation.navigate({
      name: 'TransactionDetails',
      params: { transactionId: transaction.id, address },
      key: transaction.id,
    });

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, styles.theme.container]}>
      <View style={[styles.row]}>
        {transactionAssets.icon}

        <View style={[styles.titleContainer, styles.theme.titleContainer]}>
          <H4 style={[styles.addressText, styles.theme.addressText]}>
            {stringShortener(shownAddress, 5, 5)}
          </H4>

          <TransactionTimestamp
            timestamp={transaction.block.timestamp}
            format="MMM D, YYYY"
            styles={styles}
          />
        </View>
      </View>

      <View style={[styles.statusContainer, styles.theme.statusContainer]}>
        {transaction.params.amount && (
          <DiscreteModeComponent
            blurVariant={blurVariant}
            data={fromBeddowsToLsk(transaction.params.amount)}
          >
            <TransactionAmount
              transaction={transaction}
              address={address}
              style={{ marginBottom: 4 }}
            />
          </DiscreteModeComponent>
        )}

        <TransactionStatus transaction={transaction} />
      </View>
    </TouchableOpacity>
  );
}
