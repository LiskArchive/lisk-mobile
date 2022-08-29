import { useQuery } from '@tanstack/react-query';

import {
  METHOD,
  API_METHOD,
  APPLICATION
} from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

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
export const useCustomQuery = ({
  keys,
  config,
  options = {},
}) => {
  const [{ chainID }] = useCurrentBlockchainApplication();

  return useQuery(
    [chainID, config, APPLICATION, METHOD, ...keys],
    async () => API_METHOD[METHOD](config),
    options,
  );
};
