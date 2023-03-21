/* eslint-disable max-statements */
import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { getMaxTransactionsNonce } from 'modules/Transactions/utils/helpers';
import { useAccountPoolTransactionsQuery } from '../api/useAccountPoolTransactionsQuery';

/**
 * Retrieves the nonce for a given account address from the on-chain data and transaction pool data.
 * @param {string} address - The account address to retrieve the nonce from.
 * @param {object} configurations - useAuthQuery and useAccountPoolTransactionsQuery queries optional configs.
 * @param {object} configurations.config - The queries config.
 * @param {QueryOptions} configuration.options - The queries options.
 * @returns {QueryResult<string>} The query result with the data field as the account nonce.
 */
export function useAccountNonce(address, { config = {}, options = {} } = {}) {
  const accountAuthQueryResult = useAuthQuery(address, {
    config,
    options: { cacheTime: 0, ...options },
  });

  const accountPoolTransactionsQueryResult = useAccountPoolTransactionsQuery(address, {
    config,
    options: { cacheTime: 0, ...options },
  });

  const isLoading =
    accountAuthQueryResult.isLoading || accountPoolTransactionsQueryResult.isLoading;

  const isSuccess =
    accountAuthQueryResult.isSuccess && accountPoolTransactionsQueryResult.isSuccess;

  const isError = accountAuthQueryResult.isError || accountPoolTransactionsQueryResult.isError;

  const error = accountAuthQueryResult.error || accountPoolTransactionsQueryResult.error;

  const computeNonce = (_accountAuthQueryResult, _accountPoolTransactionsQueryResult) => {
    const onChainNonce =
      _accountAuthQueryResult.data && parseFloat(_accountAuthQueryResult.data.data.nonce);

    const poolMaxNonce =
      _accountPoolTransactionsQueryResult.data &&
      getMaxTransactionsNonce(_accountPoolTransactionsQueryResult.data.data);

    const accountNonce = poolMaxNonce || onChainNonce;

    return accountNonce && accountNonce.toString();
  };

  const refetch = async () => {
    const _accountAuthQueryResult = await accountAuthQueryResult.refetch();

    const _accountPoolTransactionsQueryResult = await accountPoolTransactionsQueryResult.refetch();

    return computeNonce(_accountAuthQueryResult, _accountPoolTransactionsQueryResult);
  };

  const data = computeNonce(accountAuthQueryResult, accountPoolTransactionsQueryResult);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
