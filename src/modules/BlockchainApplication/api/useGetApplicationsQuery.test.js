import { renderHook } from '@testing-library/react-hooks';
import { queryWrapper } from 'tests/queryWrapper';

import { mockApplications } from '../__fixtures__';

import { useGetApplicationsMetaQuery } from './useGetApplicationsQuery';

describe('useGetApplicationsMetaQuery hook', () => {
  it('should fetch data correctly', async () => {
    const
      { result, waitForNextUpdate, waitFor } = renderHook(() =>
        useGetApplicationsMetaQuery(), { wrapper: queryWrapper });

    await waitForNextUpdate();

    expect(result.current.isLoading).not.toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockApplications,
      meta: {
        count: 20,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
