import { useMemo } from 'react';
import { useAccountInfo } from '../../Accounts/hooks/useAccounts/useAccountInfo';
import { useCurrentAccount } from '../../Accounts/hooks/useAccounts/useCurrentAccount';
import { useGetFeesByPriorityQuery } from '../api/useGetFeesByPriorityQuery';
import { getPriorityFee } from '../helpers';
import { useTransactionFeeCalculation } from './transactionFee';

export default function useTransactionPriorities(amount, message) {
  const feesByPriorityQuery = useGetFeesByPriorityQuery();
  const {summary: account} = useAccountInfo()
  const data = useMemo(() => {
    if (feesByPriorityQuery.data) {
      return Object.entries(feesByPriorityQuery.data).map(
        ([priorityCode, priorityBaseFee]) => (
          {
            code: priorityCode,
            fee: getPriorityFee({
              amount, priorityCode, priorityBaseFee, message
            })
          }
        )
      );
    }
    return [];
  }, [feesByPriorityQuery.data]);

  const { fee, minFee, maxAmount } = useTransactionFeeCalculation(
    {
      transaction: { amount },
      account,
      priorityOptions: data,
      selectedPriority: { fee: 0.07 }
    }
  );

  // console.log('fee', fee)
  // console.log('minFee', minFee)
  // console.log('maxAmount', maxAmount)

  return {
    ...feesByPriorityQuery,
    data
  };
}
