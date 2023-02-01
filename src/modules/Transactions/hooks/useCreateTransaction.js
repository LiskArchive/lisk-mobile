/* eslint-disable max-statements */
import { useEffect, useRef } from 'react';

import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';
import { useTransactionFeeEstimateQuery } from '../api/useTransactionFeeEstimateQuery';

import { Transaction } from '../utils/Transaction';

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

  const transactionSchema = commandParametersSchemasData?.data?.transaction?.schema;

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
      if (isSuccess && transactionSchema) {
        transaction.init({
          pubkey,
          networkStatus: networkStatusData?.data,
          auth: authData?.data,
          feeEstimatePerByte: transactionFeeEstimateData?.data.feeEstimatePerByte,
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
