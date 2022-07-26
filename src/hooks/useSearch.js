import { useState, useEffect, useRef } from 'react';

import { SEARCH_DEBOUNCE_DELAY } from 'constants/app';

import { useDebounce } from './useDebounce';

/**
 * Provides a debounced search state management.
 * @param delay - Optional delay for debouncing the search.
 * Default: 1000ms
 * @param onSearch - Optional callback to trigger when setting
 * the searched term.
 * @param onDebounce - Optional callback to trigger when debouncing happens.
 */
export function useSearch(props) {
  const [term, setTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const onSearchRef = useRef(props?.onSearch);
  const onDebounceRef = useRef(props?.onDebounce);

  const debouncedTerm = useDebounce(term, (props && props.delay) || SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    if (term) {
      setSearching(true);

      if (onSearchRef.current) {
        onSearchRef.current(term);
      }
    }
  }, [term, onSearchRef]);

  useEffect(() => {
    if (debouncedTerm) {
      setSearching(false);

      if (onDebounceRef.current) {
        onDebounceRef.current(debouncedTerm);
      }
    }
  }, [debouncedTerm, onDebounceRef]);

  return {
    term,
    debouncedTerm,
    searching,
    setTerm,
  };
}
