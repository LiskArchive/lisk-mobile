import { useInfiniteQuery } from '@tanstack/react-query';

import defaultClient from 'utilities/api/APIClient';
import { METHOD } from 'utilities/api/constants';

/**
 * Creates a custom hook for infinite queries
 *
 * @param {object} configuration - The custom query configuration object
 * @param {string[]} configuration.keys - The query keys
 * @param {object} configuration.config - The query config
 * @param {object} configuration.config.params - The query config params
 * @param {number} [configuration.config.params.limit] - The query limit
 * @param {number} [configuration.config.params.offset] - The query offset
 * @param {string} [configuration.config.params.sort] - The query sort
 * @param {string} configuration.options - The query options
 *
 * @returns The query object
 */
export const useCustomInfiniteQuery = ({ keys, config, options = {}, client = defaultClient }) => {
  return useInfiniteQuery(
    keys,
    async ({ pageParam }) =>
      client[METHOD]({
        ...config,
        params: {
          ...(config.params || {}),
          ...pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage = {}) => {
        const lastPageCount = lastPage.meta?.count || 0;
        const lastPageOffset = lastPage.meta?.offset || 0;

        const offset = lastPageCount + lastPageOffset;
        const hasMore = offset < (lastPage.meta?.total ?? Infinity);
        return !hasMore ? undefined : { offset };
      },
      select: (data) =>
        data.pages.reduce((prevPages, page) => {
          const newData = page?.data || [];
          return {
            ...page,
            data: prevPages.data ? [...prevPages.data, ...newData] : newData,
          };
        }),
      ...options,
    }
  );
};
