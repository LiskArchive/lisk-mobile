/* eslint-disable max-statements */
import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { getMaxTransactionsNonce } from 'modules/Transactions/utils/helpers';
import { useTransactionPoolQuery } from 'modules/Transactions/api/useTransactionPoolQuery';

/**
 * Retrieves the nonce for a given account address from the on-chain data and transaction pool data.
 * @param {string} address - The account address to retrieve the nonce from.
 * @param {object} configurations - useAuthQuery and useTransactionPoolQuery queries optional configs.
 * @param {object} configurations.config - The queries config.
 * @param {QueryOptions} configuration.options - The queries options.
 * @returns {QueryResult<string>} The query result with the data field as the account nonce.
 */
export function useAccountNonce(address, { config = {}, options = {} } = {}) {
  const accountAuthQueryResult = useAuthQuery(address, {
    config,
    options: { cacheTime: 0, ...options },
  });

  const transactionPoolQueryResult = useTransactionPoolQuery({
    config: { ...config, params: { address, ...config.params } },
    options: { cacheTime: 0, ...options },
  });

  const computeNonce = (_accountAuthQueryResult, _accountPoolTransactionsQueryResult) => {
    const onChainNonce = _accountAuthQueryResult.data && _accountAuthQueryResult.data.data.nonce;

    const poolMaxNonce =
      _accountPoolTransactionsQueryResult.data &&
      getMaxTransactionsNonce(_accountPoolTransactionsQueryResult.data.data);

    return poolMaxNonce || onChainNonce;
  };

  const refetch = async () => {
    const _accountAuthQueryResult = await accountAuthQueryResult.refetch();

    const _accountPoolTransactionsQueryResult = await transactionPoolQueryResult.refetch();

    return computeNonce(_accountAuthQueryResult, _accountPoolTransactionsQueryResult);
  };

  const data = computeNonce(accountAuthQueryResult, transactionPoolQueryResult);
  const isLoading = accountAuthQueryResult.isLoading || transactionPoolQueryResult.isLoading;
  const isSuccess = accountAuthQueryResult.isSuccess && transactionPoolQueryResult.isSuccess;
  const isError = accountAuthQueryResult.isError || transactionPoolQueryResult.isError;
  const error = accountAuthQueryResult.error || transactionPoolQueryResult.error;

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
