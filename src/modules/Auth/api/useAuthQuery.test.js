import { renderHook } from '@testing-library/react-hooks';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';
import { mockSavedAccounts } from '../../Accounts/__fixtures__';

import { mockAuth } from '../__fixtures__';

import { useAuthQuery } from './useAuthQuery';

jest.useRealTimers();

describe('useAuthQuery hook', () => {
  const address = mockSavedAccounts[0].metadata.address;

  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetches data correctly', async () => {
    const { result, waitFor } = renderHook(() => useAuthQuery(address), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    expect(result.current.data.data).toEqual(mockAuth);
  });
});
