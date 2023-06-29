import { Clipboard } from 'react-native';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCopyToClipboard } from './useCopyToClipboard';

jest.mock('react-native/Libraries/Components/Clipboard/Clipboard', () => ({
  setString: jest.fn(),
}));

jest.useFakeTimers();

describe('useCopyToClipboard', () => {
  it('should handle copying to clipboard', () => {
    const mockValue = 'testValue';

    const { result } = renderHook(() => useCopyToClipboard(mockValue));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(Clipboard.setString).toHaveBeenCalledWith(mockValue);
    expect(result.current[0]).toBe(true);
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useCopyToClipboard('testValue'));
    const spy = jest.spyOn(global, 'clearTimeout');

    unmount();

    expect(spy).toHaveBeenCalled();
  });
});
