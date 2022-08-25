import { renderHook } from '@testing-library/react-hooks';

import * as useAccountInfoHook from 'modules/Accounts/hooks/useAccounts/useAccountInfo';
import { queryWrapper } from 'tests/queryWrapper';
import { mockGetTransactionQuery, mockTransactions } from '../__fixtures__';
import { useGetTransactionQuery } from './useGetTransactionQuery';

jest.useRealTimers();

jest.spyOn(useAccountInfoHook, 'useAccountInfo').mockImplementation(
  () => ({
    summary: {
      address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw',
      balance: '10000',
      publicKey: 'cfc390b6e2dea236db4bfa8c7921e845e8fd54ab07e7c2db0af7ee93ef379b19',
      unconfirmedBalance: '10000',
      initialized: true,
    },
    sequence: { nonce: 0 },
    dpos: {
      unlocking: [],
      sentVotes: []
    }
  })
);

describe('useGetTransactionQuery hook', () => {
  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(
      () => useGetTransactionQuery(mockTransactions[0].id), { wrapper: queryWrapper }
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.isSuccess).toBeTruthy();

    const expectedResponse = mockGetTransactionQuery;

    expect(result.current.data).toEqual(expectedResponse);
  });
});
