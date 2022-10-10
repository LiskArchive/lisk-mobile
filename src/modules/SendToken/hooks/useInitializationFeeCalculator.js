/* eslint-disable max-statements */
import { useEffect, useState } from 'react';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';

export default function useInitializationFeeCalculator({ tokenID, recipientAccountAddress }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { accounts } = useAccounts();

  useEffect(() => {
    if (accounts) {
      try {
        const fee = 0;

        setData(fee);

        setIsLoading(false);
      } catch (_error) {
        setError(_error);

        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientAccountAddress, accounts, tokenID]);

  return { data, isLoading, error };
}
