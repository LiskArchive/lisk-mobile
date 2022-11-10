import { renderHook } from '@testing-library/react-hooks';

import * as useCurrentAccount from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { mockSavedAccounts } from 'modules/Accounts/__fixtures__';
import { mockGetTransactionsQuery } from '../__fixtures__';
import { useTransactionsQuery } from './useTransactionsQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.spyOn(useCurrentAccount, 'useCurrentAccount').mockImplementation(() => [
  {
    metadata: {
      address: mockSavedAccounts[0].metadata.address,
    },
  },
]);

describe('useTransactionsQuery hook', () => {
  const limit = 2;
  const config = { params: { limit } };

  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useTransactionsQuery({ config }), { wrapper });

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
