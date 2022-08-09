import { useEffect } from 'react';

import { getTransactionFee } from '../helpers';

export default function useTransactionFeesCalculator({
  amount,
  recipientAccountAddress,
  priority,
  senderApplicationChainID,
  recipientApplicationChainID,
  tokenID,
  onFeeChange
}) {
  useEffect(() => {
    async function calculateTransactionFees(params) {
      const fee = await getTransactionFee(params);

      onFeeChange(fee);

      console.log({ fee });
    }

    calculateTransactionFees({
      amount,
      recipientAccountAddress,
      priority,
      senderApplicationChainID,
      recipientApplicationChainID,
      tokenID
    });
  }, [
    amount,
    recipientAccountAddress,
    priority,
    senderApplicationChainID,
    recipientApplicationChainID,
    tokenID,
    onFeeChange
  ]);
}
