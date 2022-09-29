import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { METHOD, LIMIT, API_URL } from 'utilities/api/constants';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';

export function useAccountTokensQuery({ config: customConfig = {}, options = {}, client } = {}) {
  const [currentAccount] = useCurrentAccount();

  const address = currentAccount.metadata.address;

  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.accountTokens',
    ...customConfig,
    params: {
      address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = [GET_ACCOUNT_TOKENS_QUERY, METHOD, address, currentAccount.chainID, config];

  const query = useCustomInfiniteQuery({ config, options, keys, client });

  return {
    ...query,
    data: query.data?.data,
  };
}
