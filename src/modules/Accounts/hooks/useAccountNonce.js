import { useAuthQuery } from 'modules/Auth/api/useAuthQuery';
import { useTransactionPoolQuery } from 'modules/Transactions/api/useTransactionPoolQuery';
import { computeNonce } from 'modules/Transactions/utils/helpers';

/**
 * Retrieves the nonce for a given account address from the on-chain data and transaction pool data.
 * @param {string} address - The account address to retrieve the nonce from.
 * @param {object} configurations - useAuthQuery and useTransactionPoolQuery queries optional configs.
 * @param {object} configurations.config - The queries config.
 * @param {QueryOptions} configuration.options - The queries options.
 * @returns {QueryResult<string>} The query result with the data field as the account nonce.
 */
export function useAccountNonce(address, { config = {}, options = {} } = {}) {
  const authQuery = useAuthQuery(address, {
    config,
    options: { cacheTime: 0, ...options },
  });

  const transactionPoolQuery = useTransactionPoolQuery({
    config: { ...config, params: { address, ...config.params } },
    options: { cacheTime: 0, ...options, enabled: !!address },
  });

  const prepareData = (accountAuthData, transactionPoolData) => {
    if (!accountAuthData || !transactionPoolData) {
      return null;
    }

    return computeNonce(accountAuthData.nonce, transactionPoolData);
  };

  const refetch = async () => {
    const { data: authRefetchData } = await authQuery.refetch();
    const { data: transactionPoolRefetchData } = await transactionPoolQuery.refetch();

    return prepareData(authRefetchData?.data, transactionPoolRefetchData?.data);
  };

  const data = prepareData(authQuery.data?.data, transactionPoolQuery.data?.data);
  const isLoading = authQuery.isLoading || transactionPoolQuery.isLoading;
  const isSuccess = authQuery.isSuccess && transactionPoolQuery.isSuccess;
  const isError = authQuery.isError || transactionPoolQuery.isError;
  const error = authQuery.error || transactionPoolQuery.error;

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
