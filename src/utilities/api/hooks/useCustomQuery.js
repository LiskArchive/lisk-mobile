import { useQuery } from '@tanstack/react-query';

import defaultClient from 'utilities/api/APIClient';
import { METHOD } from 'utilities/api/constants';

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
  return useQuery(keys, async () => client[METHOD](config), options);
}
