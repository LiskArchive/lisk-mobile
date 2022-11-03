import { renderHook } from '@testing-library/react-hooks';

import { mockNetworkStatus } from '../__fixtures__';
import { useNetworkStatusQuery } from './useNetworkStatusQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.useRealTimers();

describe('useNetworkStatusQuery hook', () => {
  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetches data correctly', async () => {
    const { result, waitFor } = renderHook(() => useNetworkStatusQuery(), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    expect(result.current.data).toEqual(mockNetworkStatus);
  });
});
