/* eslint-disable max-statements */
import { useState, useEffect, useRef } from 'react';

import { FEES_BY_PRIORITIES_MOCK } from '../mocks';

export function useGetFeesByPriorityQuery() {
  // TODO: Replace data, isLoading and error
  // by React Query when package integration is done.
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const timer = useRef();

  function fetchData() {
    // TODO: Replace with real API call when backend is available.
    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        resolve({
          data: { feeEstimatePerByte: FEES_BY_PRIORITIES_MOCK },
        });
      }, 250);
    });
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res.data.feeEstimatePerByte);
        setIsLoading(false);
      })
      .catch((e) => setError(e));

    return () => {
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    isError: !!error,
    refetch: fetchData,
  };
}
