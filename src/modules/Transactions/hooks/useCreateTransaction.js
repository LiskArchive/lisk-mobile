/* eslint-disable max-statements */
import { useEffect, useRef } from 'react';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';
import { useTransactionFeeEstimateQuery } from '../api/useTransactionFeeEstimateQuery';

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
    isError: isErrorOnNetworkStatus,
  } = useNetworkStatusQuery();

  const {
    data: authData,
    isLoading: isAuthLoading,
    isSuccess: isAuthSuccess,
    isError: isErrorOnAuth,
  } = useAuthQuery();

  const {
    data: commandParametersSchemasData,
    isLoading: isCommandParametersSchemasLoading,
    isSuccess: isCommandParametersSchemasSuccess,
    isError: isErrorOnCommandParametersSchemas,
  } = useCommandParametersSchemasQuery();

  const {
    data: transactionFeeEstimateData,
    isLoading: isTransactionFeeEstimateLoading,
    isSuccess: isTransactionFeeEstimateSuccess,
    isError: isErrorOnTransactionFeeEstimate,
  } = useTransactionFeeEstimateQuery();

  const isLoading =
    isNetworkStatusLoading ||
    isAuthLoading ||
    isCommandParametersSchemasLoading ||
    isTransactionFeeEstimateLoading;

  const isSuccess =
    isNetworkStatusSuccess &&
    isAuthSuccess &&
    isCommandParametersSchemasSuccess &&
    isTransactionFeeEstimateSuccess;

  const isError =
    isErrorOnNetworkStatus ||
    isErrorOnAuth ||
    isErrorOnCommandParametersSchemas ||
    isErrorOnTransactionFeeEstimate;

  useEffect(
    () => {
      if (isSuccess) {
        transaction.init({
          pubkey,
          networkStatus: networkStatusData?.data,
          auth: authData?.data,
          feeEstimatePerByte: transactionFeeEstimateData?.data.feeEstimatePerByte,
          commandParametersSchemas: commandParametersSchemasData?.data.commands,
          module,
          command,
          encodedTransaction,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSuccess, transaction, encodedTransaction, module, pubkey, command]
  );

  return { data: transaction, isLoading, isSuccess, isError };
}
