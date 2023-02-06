import { renderHook } from '@testing-library/react-hooks';

import { queryWrapper } from 'tests/queryWrapper';
import { mockInvokeQuery } from '../__fixtures__';
import { useInvokeQuery } from './useInvokeQuery';

jest.useRealTimers();

describe('useInvokeQuery hook', () => {
  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useInvokeQuery({}), { wrapper: queryWrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockInvokeQuery);
  });
});
