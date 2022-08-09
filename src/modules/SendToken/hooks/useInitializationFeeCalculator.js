/* eslint-disable max-statements */
import { useEffect, useState } from 'react';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { getInitializationFee } from '../helpers';

export default function useInitializationFeeCalculator({
  tokenID, amount, priority, recipientAccountAddress
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { accounts } = useAccounts();

  useEffect(() => {
    if (accounts) {
      const recipientAccount = accounts.find(
        account => account.metadata.address === recipientAccountAddress
      );

      try {
        const fee = getInitializationFee({
          tokenID, amount, recipientAccount
        });

        setData(fee);

        setIsLoading(false);
      } catch (_error) {
        setError(_error);

        setIsLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, priority, tokenID, amount]);

  return { data, isLoading, error };
}
