import { renderHook } from '@testing-library/react-hooks';

import * as useCurrentAccount from 'modules/Accounts/hooks/useCurrentAccount';
import { mockSavedAccounts, mockMarketPrices } from '../__fixtures__';
import { usePriceTickerQuery } from './usePriceTickerQuery';
import { applicationsWrapper } from '../../../tests/applicationsWrapper';

jest.useRealTimers();

jest.spyOn(useCurrentAccount, 'useCurrentAccount').mockImplementation(() => [
  {
    metadata: {
      address: mockSavedAccounts[0].metadata.address,
    },
  },
]);

describe('usePriceTickerQuery hook', () => {
  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('fetch data correctly', async () => {
    const { result, waitFor } = renderHook(() => usePriceTickerQuery(), {
      wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isFetched);

    expect(result.current.data).toEqual(mockMarketPrices);
  });
});
