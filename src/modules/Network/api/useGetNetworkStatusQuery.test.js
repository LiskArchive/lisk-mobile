import { renderHook } from '@testing-library/react-hooks';

import { queryWrapper } from 'tests/queryWrapper';
import * as useCurrentBlockchainApplication from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

import { mockNetworkStatus } from '../__fixtures__';
import { useGetNetworkStatusQuery } from './useGetNetworkStatusQuery';

jest.useRealTimers();

jest.spyOn(useCurrentBlockchainApplication, 'useCurrentBlockchainApplication').mockImplementation(
  () => [{
    chainID: 'chainIdMock'
  }]
);

describe('useNetworkStatusQuery hook', () => {
  it('fetches data correctly', async () => {
    const { result, waitFor } = renderHook(
      () => useGetNetworkStatusQuery(), { wrapper: queryWrapper }
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    expect(result.current.data).toEqual(mockNetworkStatus);
  });
});
