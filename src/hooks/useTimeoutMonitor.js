import { useRef, useEffect, useCallback } from 'react';

export function useTimeoutMonitor(maxTime, onTimeout) {
  const timerRef = useRef(null);

  const initialize = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (onTimeout && typeof onTimeout === 'function') {
        onTimeout();
      }
    }, maxTime);
  }, [maxTime, onTimeout]);

  const destroy = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { initialize, destroy };
}
