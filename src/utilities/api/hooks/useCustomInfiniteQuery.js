import { useInfiniteQuery } from '@tanstack/react-query';

import {
  METHOD,
  API_METHOD,
} from 'utilities/api/constants';

/**
 * Adaptation of useInfiniteQuery with custom configs already set up.
 * @param {Object} config - Query function custom options.
 * @param {Object} options - Query hook general custom options.
 * @param {Array | String} keys - Query hook keys.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useCustomInfiniteQuery({
  config = {},
  options = {},
  keys = [],
}) {
  const query = useInfiniteQuery(
    keys,
    async ({ pageParam }) => API_METHOD[METHOD]({
      ...config,
      params: {
        ...(config.params || {}),
        ...pageParam,
      },
    }),
    {
      ...options,
      select: (data) => data.pages.reduce((prevPages, page) => {
        const newData = page?.data || [];
        return {
          ...page,
          data: prevPages.data ? [...prevPages.data, ...newData] : newData,
        };
      }),
      getNextPageParam: (lastPage) => {
        const offset = lastPage.meta.count + lastPage.meta.offset;
        const hasMore = offset < lastPage.meta.total;
        return !hasMore ? undefined : { offset };
      },
    },
  );

  return query;
}
