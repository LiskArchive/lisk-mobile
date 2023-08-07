import Clipboard from '@react-native-clipboard/clipboard';
import { renderHook, act } from '@testing-library/react-hooks';

import { usePasteFromClipboard } from './usePasteFromClipboard'; // update with correct path

jest.mock('@react-native-clipboard/clipboard', () => ({
  getString: jest.fn(),
}));

describe('usePasteFromClipboard', () => {
  it('should handle successful fetching from clipboard', async () => {
    const mockValue = 'testValue';
    Clipboard.getString.mockResolvedValue(mockValue);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      usePasteFromClipboard({ onSuccess, onError })
    );

    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[1].isError).toBe(false);

    act(() => {
      result.current[0]();
    });

    expect(result.current[1].isLoading).toBe(true);

    await waitForNextUpdate();

    expect(onSuccess).toHaveBeenCalledWith(mockValue);
    expect(result.current[1].data).toBe(mockValue);
    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[1].isError).toBe(false);
  });

  it('should handle failure in fetching from clipboard', async () => {
    const mockError = new Error('fetch error');
    Clipboard.getString.mockRejectedValue(mockError);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      usePasteFromClipboard({ onSuccess, onError })
    );

    act(() => {
      result.current[0]();
    });

    await waitForNextUpdate();

    expect(onError).toHaveBeenCalledWith(mockError);
    expect(result.current[1].error).toBe(mockError);
    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[1].isError).toBe(true);
  });
});
