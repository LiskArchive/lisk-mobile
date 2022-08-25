import { useInfiniteQuery } from '@tanstack/react-query';

import {
  METHOD,
  API_METHOD,
  APPLICATION
} from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

/**
 * Adaptation of useInfiniteQuery with custom configs already set up.
 * @param {Object} config - Query function custom options.
 * @param {Object} options - Query hook general custom options.
 * @param {Array | String} keys - Query hook keys.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export const useCustomInfiniteQuery = ({
  keys,
  config,
  options = {},
}) => {
  const [{ chainID }] = useCurrentBlockchainApplication();

  return useInfiniteQuery(
    [chainID, config, APPLICATION, METHOD, ...keys],
    async ({ pageParam }) => API_METHOD[METHOD]({
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
      select: (data) => data.pages.reduce((prevPages, page) => {
        const newData = page?.data || [];
        return {
          ...page,
          data: prevPages.data ? [...prevPages.data, ...newData] : newData,
        };
      }),
      ...options,
    },
  );
};
