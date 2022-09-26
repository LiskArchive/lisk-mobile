import { useEffect, useState } from 'react';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';

import { Transaction } from '../utils/Transaction';

export function useCreateTransaction({ module = null, command = null, encodedTransaction = null }) {
  const [transaction] = useState(new Transaction());

  const [currentAccount] = useCurrentAccount();

  const { data: networkStatusData, isLoading: isNetworkStatusLoading } = useNetworkStatusQuery();

  const { pubkey, address } = currentAccount.metadata;

  const { data: authData, isLoading: isAuthLoading } = useAuthQuery({
    config: { params: { address } },
  });

  const { data: commandParametersSchemasData, isLoading: isSchemasLoading } =
    useCommandParametersSchemasQuery();

  useEffect(() => {
    if (!isNetworkStatusLoading && !isAuthLoading && !isSchemasLoading) {
      transaction.init({
        pubkey,
        networkStatus: networkStatusData.data,
        auth: authData.data,
        commandParametersSchemas: commandParametersSchemasData.data,
        module,
        command,
        encodedTransaction,
      });
    }
  }, [
    authData.data,
    commandParametersSchemasData.data,
    networkStatusData.data,
    transaction,
    encodedTransaction,
    module,
    pubkey,
    command,
    isNetworkStatusLoading,
    isAuthLoading,
    isSchemasLoading,
  ]);

  return transaction;
}
