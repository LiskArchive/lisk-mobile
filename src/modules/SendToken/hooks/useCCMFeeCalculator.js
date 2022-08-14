/* eslint-disable max-statements */
import { useEffect, useState } from 'react';

import { getCCMFee } from '../helpers';

// TODO: Define props and calculation when is more clarity about the fee.
export default function useCCMFeeCalculator({
  senderApplicationChainID,
  recipientApplicationChainID
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      const fee = getCCMFee({
        senderApplicationChainID,
        recipientApplicationChainID
      });

      setData(fee);

      setIsLoading(false);
    } catch (_error) {
      setError(_error);

      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}
