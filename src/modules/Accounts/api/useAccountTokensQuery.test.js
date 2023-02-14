import { renderHook } from '@testing-library/react-hooks';

import { mockGetAccountTokensQuery } from 'modules/Transactions/__fixtures__/mockGetAccountTokensQuery';
import { mockSavedAccounts } from '../__fixtures__';
import { useAccountTokensQuery } from './useAccountTokensQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.useRealTimers();

describe('useAccountTokensQuery hook', () => {
  const address = mockSavedAccounts[0].metadata.address;
  const limit = 2;
  const config = { params: { limit } };

  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useAccountTokensQuery(address, { config }), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = mockGetAccountTokensQuery;

    expect(result.current.data).toEqual(expectedResponse);
  });
});
