import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { getMaxTransactionsNonce } from 'modules/Transactions/utils/helpers';
import { useAccountPoolTransactionsQuery } from '../api/useAccountPoolTransactionsQuery';

/**
 * Retrieves the nonce for a given account address from the on-chain data and transaction pool data.
 *
 * @param {string} address - The account address to retrieve the nonce for.
 * @param {string} moduleCommand - The module command to retrieve the transaction pool data with.
 * @returns {{
 *   data: number | null,
 *   isLoading: boolean,
 *   isSuccess: boolean,
 *   isError: boolean,
 *   error: Error | null,
 * }} An object with properties representing the current state of the hook:
 * - `data`: The account nonce, or `null` if it could not be retrieved.
 * - `isLoading`: A boolean indicating whether the hook is currently loading data.
 * - `isSuccess`: A boolean indicating whether the hook has successfully retrieved data.
 * - `isError`: A boolean indicating whether the hook has encountered an error.
 * - `error`: An error object representing any error that the hook has encountered, or `null` if there is no error.
 */
export function useAccountNonce(address, moduleCommand) {
  const accountAuthQueryResult = useAuthQuery(address, { options: { cacheTime: 0 } });

  const accountPoolTransactionsQueryResult = useAccountPoolTransactionsQuery(
    address,
    moduleCommand,
    { options: { cacheTime: 0 } }
  );

  const isLoading =
    accountAuthQueryResult.isLoading || accountPoolTransactionsQueryResult.isLoading;

  const isSuccess =
    accountAuthQueryResult.isSuccess && accountPoolTransactionsQueryResult.isSuccess;

  const isError = accountAuthQueryResult.isError || accountPoolTransactionsQueryResult.isError;

  const error = accountAuthQueryResult.error || accountPoolTransactionsQueryResult.error;

  const onChainNonce =
    accountAuthQueryResult.data && parseFloat(accountAuthQueryResult.data.data.nonce);

  const poolMaxNonce =
    accountPoolTransactionsQueryResult.data &&
    getMaxTransactionsNonce(accountPoolTransactionsQueryResult.data.data);

  const accountNonce = poolMaxNonce || onChainNonce;

  return {
    data: accountNonce,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
