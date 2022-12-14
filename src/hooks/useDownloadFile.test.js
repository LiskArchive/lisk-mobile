import { renderHook, act } from '@testing-library/react-hooks';

import { useDownloadFile } from './useDownloadFile';

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));
jest.mock('react-native-permissions', () => ({
  request: jest.fn(),
  PERMISSIONS: { ANDROID: { WRITE_EXTERNAL_STORAGE: true } },
}));
jest.mock('react-native-fs', () => ({
  CachesDirectoryPath: '',
  DownloadDirectoryPath: '',
  writeFile: jest.fn(),
}));

describe('useDownloadFile hook', () => {
  const defaultProps = {
    data: {},
    fileName: 'Test filename',
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };

  it('should be defined', () => {
    expect(useDownloadFile).toBeDefined();
  });

  it('returns correct values on mount', () => {
    const { result } = renderHook(() => useDownloadFile(defaultProps));

    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[1].isSuccess).toBeUndefined();
    expect(result.current[1].isError).toBeUndefined();
    expect(result.current[1].error).toBeUndefined();
  });

  it('sets correctly states on download', async () => {
    const { result, waitFor } = renderHook(() => useDownloadFile(defaultProps));

    act(() => {
      result.current[0]();
    });

    expect(result.current[1].isLoading).toBeTruthy();
    expect(result.current[1].isSuccess).toBeUndefined();
    expect(result.current[1].isError).toBeUndefined();
    expect(result.current[1].error).toBeUndefined();

    await waitFor(() => !result.current[1].isLoading);

    expect(result.current[1].isSuccess).toBeTruthy();
    expect(result.current[1].isError).toBeUndefined();
    expect(result.current[1].error).toBeUndefined();
  });

  it('calls onCompleted and onError callbacks properly', async () => {
    const onCompleted = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useDownloadFile({
        ...defaultProps,
        onCompleted,
        onError,
      })
    );

    expect(onCompleted).not.toBeCalled();
    expect(onError).not.toBeCalled();

    await act(() => {
      result.current[0]();
    });

    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onError).not.toBeCalled();
  });
});
