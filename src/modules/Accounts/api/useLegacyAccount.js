import { useQuery } from '@tanstack/react-query';
import { useCurrentAccount } from '../hooks/useCurrentAccount';

async function fetchLegacyAccount(address) {
  const response = await fetch(`https://legacy.lisk.com/accounts/${address}.json`);
  const data = await response.json();
  return data;
}

export default function useLegacyAccount(options = {}) {
  const [currentAccount] = useCurrentAccount();
  const address = currentAccount.metadata.address;

  const query = useQuery({
    queryKey: ['GET_ACCOUNT_BALANCE_LEGACY', address],
    queryFn: () => fetchLegacyAccount(address),
    ...options,
  });

  return query;
}
