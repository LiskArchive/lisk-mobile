import { renderHook, act } from '@testing-library/react-hooks';

import { useSearch } from './useSearch';

jest.useFakeTimers('legacy');

describe('useSearch hook', () => {
  const defaultProps = {
    delay: 1000,
    onSearch: jest.fn(),
    onDebounce: jest.fn()
  };

  it('should be defined', () => {
    expect(useSearch).toBeDefined();
  });

  it('returns correct values after on change', async () => {
    const { result } = renderHook(() => useSearch(defaultProps));

    // returns initially "" when mounting.
    expect(result.current.term).toBe('');
    expect(result.current.debouncedTerm).toBe('');

    act(() => {
      result.current.setTerm('value');
    });

    // returns the changed term instanly, but not the debounced term before delay time passed.
    expect(result.current.term).toBe('value');
    expect(result.current.debouncedTerm).toBe('');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('value');
  });

  it('triggers onSearch and onDebounce callbacks properly', async () => {
    const onSearch = jest.fn();
    const onDebounce = jest.fn();

    const { result } = renderHook(() => useSearch({
      ...defaultProps,
      onSearch,
      onDebounce
    }));

    // neither onSearch or onDebounce should be called on mount.
    expect(onSearch).not.toBeCalled();
    expect(onDebounce).not.toBeCalled();

    act(() => {
      result.current.setTerm('value');
    });

    // only onSearch should be called instantly on change (onDebounce should wait the delay).
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onDebounce).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // onDebounce should be called after the delay time passed.
    expect(onDebounce).toHaveBeenCalledTimes(1);
  });
});
