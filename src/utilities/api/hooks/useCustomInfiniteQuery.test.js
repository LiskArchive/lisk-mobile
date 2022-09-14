import { renderHook } from '@testing-library/react-hooks';

import { LIMIT, API_BASE_URL, API_URL } from 'utilities/api/constants';
import { queryWrapper } from 'tests/queryWrapper';
import * as useCurrentBlockchainApplication from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { mockCustomInfiniteQuery } from '../__fixtures__';
import { useCustomInfiniteQuery } from './useCustomInfiniteQuery';

jest.useRealTimers();

jest
  .spyOn(useCurrentBlockchainApplication, 'useCurrentBlockchainApplication')
  .mockImplementation(() => [
    {
      chainID: 'chainIdMock',
    },
  ]);

describe('useCustomInfiniteQuery hook', () => {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/mock/custom-infinite-query`,
    method: 'get',
    params: {
      limit: LIMIT,
    },
  };
  const keys = ['CUSTOM_INFINITE_QUERY'];

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useCustomInfiniteQuery({ config, keys }), {
      wrapper: queryWrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockCustomInfiniteQuery.data.slice(0, LIMIT),
      meta: {
        ...mockCustomInfiniteQuery.meta,
        count: LIMIT,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
