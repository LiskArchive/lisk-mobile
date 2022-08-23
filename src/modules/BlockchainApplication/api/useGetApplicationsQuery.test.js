import { renderHook } from '@testing-library/react-hooks';

import { mockApplications } from '../__fixtures__';

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
      data: mockApplications,
      isLoading: false,
      error: undefined,
    });
  });
});
