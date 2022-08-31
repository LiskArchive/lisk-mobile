import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_TRANSACTION_QUERY } from 'utilities/api/queries';
import {
  API_URL,
} from 'utilities/api/constants';
// import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';

/**
 * Fetch a transaction based on provided ID.
 * Executes the API call once the hook is mounted.
 * @param {String} id - ID of the transaction to be fetched.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data,
 * loading state, error state, and more.
 */
export function useGetTransactionQuery(id, { config: customConfig = {}, options = {} } = {}) {
  // const [currentAccount] = useCurrentAccount();

  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transaction',
    ...customConfig,
    params: {
      transactionID: id,
      // senderAddress: currentAccount.metadata.address,
      ...(customConfig?.params || {})
    },
  };

  const keys = [GET_TRANSACTION_QUERY];

  const query = useCustomQuery({
    keys,
    config,
    options
  });

  return query;
}
