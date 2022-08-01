import { renderHook } from '@testing-library/react-hooks';

import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';

import { useGetApplicationsMetaQuery } from './useGetApplicationsQuery';

describe('useGetApplicationsMetaQuery hook', () => {
  it('should return loading state and empty data before mounting', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetApplicationsMetaQuery());

    expect(result.current).toMatchObject({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    await waitForNextUpdate();
  });

  it('should return the correct data after mounting', async () => {
    const
      { result, waitForNextUpdate } = renderHook(() => useGetApplicationsMetaQuery());

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: BLOCKCHAIN_APPLICATIONS_MOCK,
      isLoading: false,
      error: undefined,
    });
  });
});
