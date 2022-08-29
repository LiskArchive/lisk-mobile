import { renderHook } from '@testing-library/react-hooks';

import {
  LIMIT,
  API_BASE_URL,
  API_URL,
} from 'utilities/api/constants';
import { queryWrapper } from 'tests/queryWrapper';
import * as useCurrentBlockchainApplication from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { mockCustomQuery } from '../__fixtures__';
import { useCustomQuery } from './useCustomQuery';

jest.useRealTimers();

jest.spyOn(useCurrentBlockchainApplication, 'useCurrentBlockchainApplication').mockImplementation(
  () => [{
    chainID: 'chainIdMock'
  }]
);

describe('useCustomQuery hook', () => {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/mock/custom-query`,
    method: 'get',
    params: {
      limit: LIMIT,
    },
  };
  const keys = ['CUSTOM_QUERY'];

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(
      () => useCustomQuery({ config, keys }), { wrapper: queryWrapper }
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = mockCustomQuery;

    expect(result.current.data).toEqual(expectedResponse);
  });
});
