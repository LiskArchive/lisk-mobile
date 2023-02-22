import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { fromRawLsk } from 'utilities/conversions.utils';
import FormattedNumber from 'components/shared/formattedNumber';
import { useTransactionAssets } from '../../../hooks/useTransactionAssets';

export function TransactionAmount({ transaction, style, address }) {
  const transactionAssets = useTransactionAssets({ transaction, address });

  const language = useSelector((state) => state.settings.language);

  let children = null;

  if (
    transactionAssets.type === 'tokenTransfer' &&
    transaction.params.recipientAddress !== transaction.sender.address
  ) {
    children = (
      <Text style={[transactionAssets.amount.style, style]}>
        {transactionAssets.amount.sign}

        <FormattedNumber language={language}>
          {transaction.notRawLisk ? transaction.amount : fromRawLsk(transaction.params.amount)}
        </FormattedNumber>
      </Text>
    );
  }

  return children;
}
