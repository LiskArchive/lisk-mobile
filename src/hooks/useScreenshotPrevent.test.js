import { renderHook } from '@testing-library/react-hooks';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';

import useScreenshotPrevent from './useScreenshotPrevent';

jest.mock('react-native-screenshot-prevent', () => ({
  enabled: jest.fn(),
}));

describe('useScreenshotPrevent hook', () => {
  it('should be defined', () => {
    expect(useScreenshotPrevent).toBeDefined();
  });

  it('enables/disables properly the functionality when mounting/unmounting', () => {
    const { unmount } = renderHook(() => useScreenshotPrevent());

    expect(RNScreenshotPrevent.enabled).toBeCalledTimes(1);
    expect(RNScreenshotPrevent.enabled).toBeCalledWith(true);

    unmount();

    expect(RNScreenshotPrevent.enabled).toBeCalledTimes(2);
    expect(RNScreenshotPrevent.enabled).toBeCalledWith(false);
  });
});
