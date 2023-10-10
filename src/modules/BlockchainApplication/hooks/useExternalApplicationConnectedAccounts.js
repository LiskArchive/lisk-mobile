import { useAccounts } from 'modules/Accounts/hooks/useAccounts';

export function useExternalApplicationConnectedAccounts(namespaces) {
  const { accounts } = useAccounts();

  const connectionAccountsPubKeys = namespaces?.lisk.accounts.map((account) => {
    const parts = account.split(':');
    return parts[parts.length - 1];
  });

  const connectionAccounts = accounts.filter((account) =>
    connectionAccountsPubKeys.includes(account.metadata.pubkey)
  );

  return connectionAccounts;
}
