import { useEffect, useRef } from 'react';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';

import { Transaction } from '../utils/Transaction';

export function useCreateTransaction({ module = null, command = null, encodedTransaction = null }) {
  const transactionRef = useRef(new Transaction());
  const transaction = transactionRef.current;

  const [currentAccount] = useCurrentAccount();
  const { pubkey, address } = currentAccount.metadata;

  const { data: networkStatusData, isLoading: isNetworkStatusLoading } = useNetworkStatusQuery();

  const { data: authData, isLoading: isAuthLoading } = useAuthQuery({
    config: { params: { address } },
  });

  const { data: commandParametersSchemasData, isLoading: isCommandParametersSchemasLoading } =
    useCommandParametersSchemasQuery();

  useEffect(
    () => {
      if (!isNetworkStatusLoading && !isAuthLoading && !isCommandParametersSchemasLoading) {
        transaction.init({
          pubkey,
          networkStatus: networkStatusData?.data,
          auth: authData?.data,
          commandParametersSchemas: commandParametersSchemasData?.data,
          module,
          command,
          encodedTransaction,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isNetworkStatusLoading,
      isAuthLoading,
      isCommandParametersSchemasLoading,
      transaction,
      encodedTransaction,
      module,
      pubkey,
      command,
    ]
  );

  const isLoading = isNetworkStatusLoading || isAuthLoading || isCommandParametersSchemasLoading;

  return [transaction, isLoading];
}
