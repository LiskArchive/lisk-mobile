import { renderHook } from '@testing-library/react-hooks';

import {
  LIMIT,
  API_VERSION,
  API_BASE_URL
} from 'utilities/api/constants';
import { queryWrapper } from 'utilities/tests/queryWrapper';
import { CUSTOM_INFINITE_QUERY_MOCK } from '../mocks';
import { useCustomInfiniteQuery } from './useCustomInfiniteQuery';

jest.useRealTimers();

describe('useCustomInfiniteQuery hook', () => {
  const config = {
    baseURL: API_BASE_URL,
    url: `/api/${API_VERSION}/custom-infinite-query`,
    method: 'get',
    params: {
      limit: LIMIT,
    },
  };
  const keys = ['CUSTOM_INFINITE_QUERY'];

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(
      () => useCustomInfiniteQuery({ config, keys }), { wrapper: queryWrapper }
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: CUSTOM_INFINITE_QUERY_MOCK.data.slice(0, LIMIT),
      meta: {
        ...CUSTOM_INFINITE_QUERY_MOCK.meta,
        count: LIMIT,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
