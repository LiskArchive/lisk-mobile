/* eslint-disable max-statements */
import { useEffect, useState } from 'react';

import { getTransactionFee } from '../helpers';
import useTransactionPriorities from './useTransactionPriorities';

export default function useTransactionFeeCalculator({
  tokenID, amount, priority, message,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const {
    data: prioritiesData,
    isLoading: isLoadingPrioritiesData,
    error: errorOnPriorities
  } = useTransactionPriorities(amount, message);

  useEffect(() => {
    if (!isLoadingPrioritiesData && prioritiesData) {
      const priorityFee = prioritiesData.reduce((acc, _priority) => {
        if (_priority.code === priority) return _priority.fee;

        return acc;
      }, 0);

      try {
        const fee = getTransactionFee({
          tokenID, amount, priorityFee
        });

        setData(fee);

        setIsLoading(false);
      } catch (_error) {
        setError(_error);

        setIsLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPrioritiesData, priority, tokenID, amount]);

  return { data, isLoading, error: error || errorOnPriorities };
}
