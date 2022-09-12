import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { fromRawLsk } from 'utilities/conversions';
import FormattedNumber from 'components/shared/formattedNumber';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import CheckSvg from 'assets/svgs/CheckSvg';
import SandClockSvg from 'assets/svgs/SandClockSvg';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';

export function TransactionAmount({ transaction, style }) {
  const transactionAssets = useTransactionAssets(transaction);

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

export function TransactionStatus({ transaction }) {
  let children = null;

  const props = { height: 14, width: 14 };

  switch (transaction.executionStatus) {
    case 'success':
      children = <CheckSvg {...props} />;
      break;

    case 'pending':
      children = <SandClockSvg {...props} />;
      break;

    case 'fail':
      children = <CircleCrossedSvg {...props} />;
      break;

    default:
      break;
  }

  return children;
}
