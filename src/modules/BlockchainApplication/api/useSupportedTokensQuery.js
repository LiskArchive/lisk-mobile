import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { GET_SUPPORTED_TOKENS_QUERY } from 'utilities/api/queries';
import { LIMIT, API_BASE_URL } from 'utilities/api/constants';

export function useSupportedTokensQuery({ config: customConfig = {}, options, client } = {}) {
  const config = {
    url: `${API_BASE_URL}/tokens/supported`,
    method: 'get',
    event: 'get.tokens.supported',
    ...customConfig,
    params: { limit: LIMIT, ...(customConfig?.params || {}) },
  };

  const keys = [GET_SUPPORTED_TOKENS_QUERY];

  return useCustomInfiniteQuery({
    keys,
    config,
    options,
    client,
  });
}
