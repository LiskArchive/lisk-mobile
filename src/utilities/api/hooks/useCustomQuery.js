import { useQuery } from '@tanstack/react-query';

import defaultClient from 'utilities/api/APIClient';

/**
 * @typedef {unknown[]} QueryKeys
 * The keys to use for the query.
 * The query will automatically update when this key changes.
 */

/**
 * @template Data, Error
 * @typedef {Object} QueryOptions
 * Optional configs to pass to the query. For details see React Query official docs.
 * @property {boolean | undefined} enabled
 * @property {number | Infinity | undefined} cacheTime
 * @property {((data: Data) => void) | undefined} onSuccess - This function will fire any time the query successfully fetches new data.
 * @property {((error: Error) => void) | undefined} onError - This function will fire if the query encounters an error and will be passed the error.
 * @property {((data?: Data, error?: Error) => void) | undefined} onSettled - This function will fire any time the query is either successfully fetched or errors and be passed either the data or error.
 * @property {Data | () => Data | undefined} initialData
 * @property {(React.Context<QueryClient | undefined>) | undefined} context - Use this to use a custom React Query context. Otherwise, defaultContext will be used.
 */

/**
 * @template Data, Error
 * @typedef {object} QueryResult - Query result. For details see React Query official docs.
 * @property {'loading'|'error'|'success'} status
 * @property {Data | undefined} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {boolean} isSuccess
 * @property {boolean} isError
 * @property {boolean} isLoadingError
 * @property {boolean} isFetching
 * @property {boolean} isRefetchError
 * @property {boolean} isStale
 * @property {boolean} isFetching
 * @property {boolean} isPaused
 * @property {boolean} isRefetching
 * @property {boolean} isFetched
 * @property {'fetching'|'paused'|'idle'} fetchStatus
 * @property {Function} refetch
 */

/**
 * Creates a custom hook for queries.
 *
 * @param {object} configuration - The custom query configuration object.
 * @param {QueryKeys} configuration.keys - The query keys.
 * @param {object} configuration.config - The query function configs.
 * @param {object} configuration.config.params - The query function config params.
 * @param {QueryOptions} configuration.options - The query options.
 *
 * @returns {QueryResult} The query result object.
 */
export function useCustomQuery({ keys, config, options = {}, client = defaultClient }) {
  return useQuery(keys, async () => client.call(config), options);
}
