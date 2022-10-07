/* eslint-disable max-statements */
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
  const { pubkey } = currentAccount.metadata;

  const {
    data: networkStatusData,
    isLoading: isNetworkStatusLoading,
    isSuccess: isNetworkStatusSuccess,
  } = useNetworkStatusQuery();

  const { data: authData, isLoading: isAuthLoading, isSuccess: isAuthSuccess } = useAuthQuery();

  const {
    data: commandParametersSchemasData,
    isLoading: isCommandParametersSchemasLoading,
    isSuccess: isCommandParametersSchemasSuccess,
  } = useCommandParametersSchemasQuery();

  const isLoading = isNetworkStatusLoading || isAuthLoading || isCommandParametersSchemasLoading;

  const isSuccess = isNetworkStatusSuccess && isAuthSuccess && isCommandParametersSchemasSuccess;

  useEffect(
    () => {
      if (isSuccess) {
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
    [isSuccess, transaction, encodedTransaction, module, pubkey, command]
  );

  return { data: transaction, isLoading, isSuccess };
}
