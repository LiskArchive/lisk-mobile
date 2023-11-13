import { renderHook } from '@testing-library/react-hooks';
import useTimeoutMonitor from './useTimeoutMonitor'; // adjust the import path as necessary

describe('useTimeoutMonitor', () => {
  let setTimeoutSpy;

  beforeAll(() => {
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
  });

  it('should initialize and set a timeout', () => {
    const onTimeoutMock = jest.fn();
    const { result } = renderHook(() => useTimeoutMonitor(1000, onTimeoutMock));

    result.current.initialize();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should call onTimeout after delay', () => {
    const onTimeoutMock = jest.fn();
    const { result } = renderHook(() => useTimeoutMonitor(1000, onTimeoutMock));

    result.current.initialize();
    jest.advanceTimersByTime(1000);

    expect(onTimeoutMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize and set a timeout', () => {
    const onTimeoutMock = jest.fn();
    const { result } = renderHook(() => useTimeoutMonitor(1000, onTimeoutMock));

    result.current.initialize();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should clear timeout on unmount', () => {
    const onTimeoutMock = jest.fn();
    const { result, unmount } = renderHook(() => useTimeoutMonitor(1000, onTimeoutMock));

    result.current.initialize();
    unmount();

    jest.advanceTimersByTime(1000);

    expect(onTimeoutMock).not.toHaveBeenCalled();
  });
  it('should clear the timeout when destroy is called', () => {
    const onTimeoutMock = jest.fn();
    const { result } = renderHook(() => useTimeoutMonitor(1000, onTimeoutMock));

    result.current.initialize();
    result.current.destroy();

    jest.advanceTimersByTime(1000);

    expect(onTimeoutMock).not.toHaveBeenCalled();
  });
});
