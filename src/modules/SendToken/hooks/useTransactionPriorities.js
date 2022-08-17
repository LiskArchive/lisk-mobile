import { useMemo } from 'react';
import { useGetFeesByPriorityQuery } from '../api/useGetFeesByPriorityQuery';

export default function useTransactionPriorities() {
  const feesByPriorityQuery = useGetFeesByPriorityQuery();

  const data = useMemo(() => {
    if (feesByPriorityQuery.data) {
      return Object.entries(feesByPriorityQuery.data).map(
        ([priorityCode, priorityBaseFee]) => (
          {
            code: priorityCode,
            fee: priorityBaseFee,
          }
        )
      );
    }
    return [];
  }, [feesByPriorityQuery.data]);

  // const params = {
  //   transaction: { amount },
  //   account: { ...account, publicKey: currAccount.metadata.pubkey, balance: 100000000000 },
  //   priorityOptions: data,
  //   selectedPriority: { fee: 0.07 }
  // }

  // console.log("calculateTransactionFees", calculateTransactionFees(params));

  return {
    ...feesByPriorityQuery,
    data
  };
}
