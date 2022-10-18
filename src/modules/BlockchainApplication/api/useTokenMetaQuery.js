import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_TOKENS_METADATA_QUERY } from 'utilities/api/queries';
import { LIMIT, API_URL, NETWORK } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import blockchainAppsMetaAPIClient from 'utilities/api/BlockchainAppsMetaAPIClient';

/**
 * Fetch list of blockchain applications tokens off-chain metadata.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useTokenMetaQuery(tokenID, { config: customConfig = {}, options = {} } = {}) {
  const [{ chainID }] = useCurrentBlockchainApplication();

  const config = {
    url: `${API_URL}/blockchain/apps/meta/tokens`,
    method: 'get',
    event: 'get.blockchain.apps.meta.tokens',
    ...customConfig,
    params: { network: NETWORK, limit: LIMIT, tokenID, chainID, ...customConfig.params },
  };

  // console.log({ blockchainAppsMetaAPIClient });

  const keys = useQueryKeys([GET_TOKENS_METADATA_QUERY]);

  return useCustomQuery({ config, options, keys, client: blockchainAppsMetaAPIClient });
}
