import { useQuery } from '@tanstack/react-query';

import defaultClient from 'utilities/api/APIClient';
import { METHOD } from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { APPLICATION } from '../queries';

/**
 * Creates a custom hook for queries.
 *
 * @param {object} configuration - The custom query configuration object
 * @param {string[]} configuration.keys - The query keys
 * @param {object} configuration.config - The query config
 * @param {object} configuration.config.params - The query config params
 * @param {string} configuration.options - The query options
 *
 * @returns The query object
 */
export function useCustomQuery({ keys, config, options = {}, client = defaultClient }) {
  const [{ chainID }] = useCurrentBlockchainApplication();

  return useQuery(
    [chainID, config, APPLICATION, METHOD, ...keys],
    async () => client[METHOD](config),
    options
  );
}
