import { useEffect, useMemo, useState } from 'react';
import { account as accountAPI } from 'utilities/api';
import { useCurrentAccount } from './useCurrentAccount';

// eslint-disable-next-line
export const useCurrentAccountDetails = () => {
  const [account] = useCurrentAccount();

  const address = useMemo(() => account.metadata.address, [account]);

  const [accountDetails, setAccountDetails] = useState({});

  // TODO: Replace with react query
  const fetchAccountDetails = async () => {
    const details = await accountAPI.getSummary('LSK', { address });
    setAccountDetails(details);
  };

  useEffect(() => {
    fetchAccountDetails(address);
  }, [address]);

  return accountDetails;
};
