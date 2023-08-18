/* eslint-disable complexity */
/* eslint-disable max-statements */
import { useEffect, useRef, useState } from 'react';

import { useAuth } from 'modules/Auth/hooks/useAuth';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';

import { Transaction } from '../utils/Transaction';

/**
 * Creates a transaction object with all required build-in
 * functionalities (sign, encode, decode, update and more).
 * @param {Object} params
 * @param {String} params.module - Module of the transaction (optional).
 * @param {String} params.command - Command of the transaction (optional).
 * @param {String} params.encodedTransaction - Encoded transaction to create a transaction object from (optional).
 * @returns {Object} The created transaction data, isLoading and error states.
 */
export function useCreateTransaction({ module = null, command = null, encodedTransaction = null }) {
  const transactionRef = useRef(new Transaction());
  const [isSuccess, setIsSuccess] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentAccount] = useCurrentAccount();
  const { address, pubkey } = currentAccount?.metadata ?? {};

  const transaction = transactionRef.current;

  const {
    data: networkStatusData,
    isSuccess: isNetworkStatusSuccess,
    isError: isErrorOnNetworkStatus,
  } = useNetworkStatusQuery();

  const { data: authData, isSuccess: isAuthSuccess, isError: isErrorOnAuth } = useAuth(address);

  const {
    data: commandParametersSchemasData,
    isSuccess: isCommandParametersSchemasSuccess,
    isError: isErrorOnCommandParametersSchemas,
  } = useCommandParametersSchemasQuery();

  const isInitDataSuccess =
    isNetworkStatusSuccess && isAuthSuccess && isCommandParametersSchemasSuccess;

  const isErrorOnInitData =
    isErrorOnNetworkStatus || isErrorOnAuth || isErrorOnCommandParametersSchemas;

  const baseSchema = commandParametersSchemasData?.data?.transaction?.schema;

  useEffect(
    () => {
      if (isInitDataSuccess && baseSchema) {
        try {
          transaction.init({
            pubkey,
            networkStatus: networkStatusData?.data,
            auth: authData,
            commandParametersSchemas: commandParametersSchemasData?.data.commands,
            module,
            command,
            encodedTransaction,
            baseSchema,
          });

          setIsLoading(false);
          setIsSuccess(true);
        } catch (e) {
          setError(new Error('Error on transaction initialization.'));
          setIsLoading(false);
          setIsSuccess(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isInitDataSuccess, transaction, encodedTransaction, module, pubkey, command, baseSchema]
  );

  useEffect(() => {
    if (isErrorOnInitData) {
      setError(new Error('Error during transaction data initialization.'));
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isErrorOnInitData]);

  return { data: transaction, isLoading, isSuccess, error };
}
