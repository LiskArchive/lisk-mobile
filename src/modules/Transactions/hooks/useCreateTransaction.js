/* eslint-disable complexity */
/* eslint-disable max-statements */
import { useEffect, useRef } from 'react';

import { useAuth } from 'modules/Auth/hooks/useAuth';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';

import { Transaction } from '../utils/Transaction';
import { usePriorityFee } from './usePriorityFee';
import { useInitializationFee } from './useInitializationFee';

/**
 * Creates a transaction object with all required build-in
 * functionalities (sign, encode, decode, update and more).
 * @param {Object} params
 * @param {String} params.module - Module of the transaction (optional).
 * @param {String} params.command - Command of the transaction (optional).
 * @param {String} params.encodedTransaction - Encoded transaction to create a transaction object from (optional).
 * @returns {Object} The created transaction data, isLoading, isSuccess and isError states.
 */
export function useCreateTransaction({ module = null, command = null, encodedTransaction = null }) {
  const transactionRef = useRef(new Transaction());
  const [currentAccount] = useCurrentAccount();
  const transaction = transactionRef.current;
  const { address, pubkey } = currentAccount?.metadata ?? {};

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
  } = useAuth(address);

  const {
    data: commandParametersSchemasData,
    isLoading: isCommandParametersSchemasLoading,
    isSuccess: isCommandParametersSchemasSuccess,
    isError: isErrorOnCommandParametersSchemas,
  } = useCommandParametersSchemasQuery();

  const {
    data: priorityFeeData,
    isLoading: isPriorityFeeLoading,
    isSuccess: isPriorityFeeSuccess,
    isError: isErrorPriorityFee,
  } = usePriorityFee();

  const {
    data: initializationFeeData,
    isLoading: isInitializationFeeLoading,
    isSuccess: isInitializationFeeSuccess,
    isError: isErrorInitializationFee,
  } = useInitializationFee();

  const isLoading =
    isNetworkStatusLoading ||
    isAuthLoading ||
    isCommandParametersSchemasLoading ||
    isPriorityFeeLoading ||
    isInitializationFeeLoading;

  const isSuccess =
    isNetworkStatusSuccess &&
    isAuthSuccess &&
    isCommandParametersSchemasSuccess &&
    isPriorityFeeSuccess &&
    isInitializationFeeSuccess;

  const isError =
    isErrorOnNetworkStatus ||
    isErrorOnAuth ||
    isErrorOnCommandParametersSchemas ||
    isErrorPriorityFee ||
    isErrorInitializationFee;

  const transactionSchema = commandParametersSchemasData?.data?.transaction?.schema;

  useEffect(
    () => {
      if (isSuccess && transactionSchema) {
        transaction.init({
          pubkey,
          networkStatus: networkStatusData?.data,
          auth: authData,
          priorityFee: priorityFeeData,
          extraCommandFee: initializationFeeData,
          commandParametersSchemas: commandParametersSchemasData?.data.commands,
          module,
          command,
          encodedTransaction,
          schema: transactionSchema,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSuccess, transaction, encodedTransaction, module, pubkey, command, transactionSchema]
  );

  return { data: transaction, isLoading, isSuccess, isError };
}
