import { renderHook } from '@testing-library/react-hooks';

import { mockGetTransactionQuery, mockTransactions } from '../__fixtures__';
import { useTransactionQuery } from './useTransactionQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.useRealTimers();

describe('useTransactionQuery hook', () => {
  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => useTransactionQuery(mockTransactions[0].id), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = mockGetTransactionQuery;

    expect(result.current.data).toEqual(expectedResponse);
  });
});
