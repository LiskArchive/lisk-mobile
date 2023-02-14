import { renderHook } from '@testing-library/react-hooks';

import { mockGetTransactionsQuery } from 'modules/Transactions/__fixtures__';
import { mockSavedAccounts } from '../__fixtures__';
import { useAccountTransactionsQuery } from './useAccountTransactionsQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.useRealTimers();

describe('useAccountTransactionsQuery hook', () => {
  const address = mockSavedAccounts[0].metadata.address;
  const limit = 2;
  const config = { params: { limit } };

  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useAccountTransactionsQuery(address, { config }), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = {
      data: mockGetTransactionsQuery.data.slice(0, limit),
      meta: {
        ...mockGetTransactionsQuery.meta,
        count: limit,
        offset: 0,
      },
    };

    expect(result.current.data).toEqual(expectedResponse);
  });
});
