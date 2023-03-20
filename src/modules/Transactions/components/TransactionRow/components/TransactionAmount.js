import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { fromRawLsk } from 'utilities/conversions.utils';
import FormattedNumber from 'components/shared/formattedNumber';
import { useTransactionAssets } from '../../../hooks/useTransactionAssets';

export function TransactionAmount({ transaction, style, address }) {
  const transactionAssets = useTransactionAssets({ transaction, address });

  const language = useSelector((state) => state.settings.language);

  const { sign } = transactionAssets.amount;

  // Add fee to transaction amount shown on list for outgoing transactions
  const rawLiskAmount =
    sign === '-'
      ? fromRawLsk((BigInt(transaction.params.amount) + BigInt(transaction.fee)).toString())
      : fromRawLsk(BigInt(transaction.params.amount ?? 0).toString());
  const transactionAmount = transaction.notRawLisk ? transaction.amount : rawLiskAmount;

  if (
    transactionAssets.type === 'tokenTransfer' &&
    transaction.params.recipientAddress !== transaction.sender.address
  ) {
    return (
      <Text style={[transactionAssets.amount.style, style]}>
        {transactionAssets.amount.sign}

        <FormattedNumber language={language}>{transactionAmount}</FormattedNumber>
      </Text>
    );
  }

  return null;
}
