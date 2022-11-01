import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';

import { ApplicationsProvider } from 'modules/BlockchainApplication/context/ApplicationsContext';
import {
  mockApplicationsFullData,
  mockCurrentApplication,
} from 'modules/BlockchainApplication/__fixtures__';

import { mockNetworkStatus } from '../__fixtures__';
import { useNetworkStatusQuery } from './useNetworkStatusQuery';

jest.useRealTimers();

describe('useNetworkStatusQuery hook', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <ApplicationsProvider
        value={{
          applications: {
            data: mockApplicationsFullData,
            isLoading: false,
            isError: false,
            error: undefined,
          },
          dispatchApplications: jest.fn(),
          currentApplication: mockCurrentApplication,
          setCurrentApplication: jest.fn(),
        }}
      >
        {children}
      </ApplicationsProvider>
    </QueryClientProvider>
  );

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
