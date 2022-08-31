import {
  METHOD,
  LIMIT,
  API_URL,
} from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY } from 'utilities/api/queries';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';

/**
 * Fetch user account transactions in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useGetTransactionsQuery({ config: customConfig = {}, options = {} } = {}) {
  const [currentAccount] = useCurrentAccount();

  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      senderAddress: currentAccount.metadata.address,
      ...(customConfig?.params || {})
    },
  };

  const keys = [GET_TRANSACTIONS_QUERY, METHOD, config];

  const query = useCustomInfiniteQuery({ config, options, keys });

  return query;
}
