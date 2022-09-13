import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as useCurrentAccount from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { mockApplicationsMeta, mockMappedApplicationsMeta } from 'modules/BlockchainApplication/__fixtures__';
import { mockSavedAccounts } from 'modules/Accounts/__fixtures__';
import { mockGetTransactionsQuery } from '../__fixtures__';
import { useGetTransactionsQuery } from './useGetTransactionsQuery';

jest.useRealTimers();

const queryClient = new QueryClient();
const mockStore = configureMockStore();
const mockDispatch = jest.fn();
const mockState = {
  blockchainApplications: {
    current: mockApplicationsMeta[0],
    applications: mockMappedApplicationsMeta,
    pins: [],
  },
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((fn) => fn(mockState)),
  useDispatch: () => mockDispatch,
}));

jest.spyOn(useCurrentAccount, 'useCurrentAccount').mockImplementation(
  () => ([
    {
      metadata: {
        address: mockSavedAccounts[0].metadata.address
      }
    }
  ])
);

describe('useGetTransactionsQuery hook', () => {
  const limit = 2;
  const config = { params: { limit } };

  const store = mockStore(mockState);

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    </QueryClientProvider>
  );

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(
      () => useGetTransactionsQuery({ config }), { wrapper }
    );

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
