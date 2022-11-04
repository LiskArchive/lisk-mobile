import { renderHook, act } from '@testing-library/react-hooks';

import { mockApplicationsMeta } from 'modules/BlockchainApplication/__fixtures__';

import { useEmailReport } from './useEmailReport';
import { mockNetworkStatus } from '../modules/Network/__fixtures__';
import { applicationsWrapper } from '../tests/applicationsWrapper';

jest.useRealTimers();

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
}));

describe('useEmailReport hook', () => {
  const wrapper = ({ children }) => applicationsWrapper({ children });

  it('should be defined', () => {
    expect(useEmailReport).toBeDefined();
  });

  it('should insert correctly the network data on body', async () => {
    const { result, waitFor } = renderHook(() => useEmailReport(), { wrapper });

    const expectedNetworkVersionPattern = encodeURIComponent(
      `Lisk Core Version: ${mockNetworkStatus.data.networkVersion}`
    );
    const expectedNetworkIdentifierPattern = encodeURIComponent(
      `NetworkIdentifier: ${mockNetworkStatus.data.networkIdentifier}`
    );

    expect(result.current.isLoading).toBeTruthy();

    expect(result.current.url).toBeFalsy();
    expect(result.current.url).toBeFalsy();

    await waitFor(() => !result.current.isLoading);

    expect(result.current.isLoading).toBeFalsy();

    expect(result.current.url).toMatch(new RegExp(expectedNetworkVersionPattern));
    expect(result.current.url).toMatch(new RegExp(expectedNetworkIdentifierPattern));
  });

  it('should insert correctly the current application data on body', async () => {
    const { result, waitFor } = renderHook(() => useEmailReport(), { wrapper });

    const expectedAppsApisPattern = encodeURIComponent(mockApplicationsMeta[0].serviceURLs[0].http);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.url).toMatch(new RegExp(expectedAppsApisPattern));
  });

  it('should insert correctly the error data on body', async () => {
    const props = {
      errorMessage: 'The custom error message',
      error: { message: 'The error message' },
    };

    const { result, waitFor } = renderHook(() => useEmailReport(props), { wrapper });

    const expectedErrorMessagePattern = encodeURIComponent(props.errorMessage);
    const expectedErrorPattern = encodeURIComponent(props.error.message);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.url).toMatch(new RegExp(expectedErrorMessagePattern));
    expect(result.current.url).toMatch(new RegExp(expectedErrorPattern));
  });

  it('should fall in error when no url is defined when triggering handleSend', async () => {
    const { result } = renderHook(() => useEmailReport(), { wrapper });

    await act(() => result.current.handleSend());

    expect(result.current.error).toBeFalsy();
  });
});
