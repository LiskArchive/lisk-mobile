import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { METHOD, LIMIT, API_URL } from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';

export function useAccountTokensQuery(address, { config: customConfig = {}, options = {} } = {}) {
  const [currentAccount] = useCurrentBlockchainApplication();

  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.accountTokens',
    ...customConfig,
    params: {
      address: 'lskezo8pcrbsoceuuu64rpc8w2qkont2ec3n772yu',
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = [GET_ACCOUNT_TOKENS_QUERY, METHOD, address, currentAccount.chainID, config];

  const query = useCustomInfiniteQuery({ config, options, keys });

  return {
    ...query,
    data: query.data?.data,
  };
}
