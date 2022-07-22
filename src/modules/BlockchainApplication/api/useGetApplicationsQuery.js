import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import { setApplications as setApplicationsAction } from '../store/actions';

/**
 * Hook for fetching blockchain applications metadata and manage the network
 * request state.
 * @returns {Object} - The applications data, a isLoading flag to indicate if
 * the data is loading (network request) and isError object containing an
 * error if occurred during the API call.
 */
export function useGetApplicationsMetaQuery() {
  // TODO: Replace data, isLoading and isError
  // by React Query when package integration is done.
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(undefined);

  const dispatch = useDispatch();

  function query() {
    // TODO: Replace with real API call when backend is available.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: BLOCKCHAIN_APPLICATIONS_MOCK });
      }, 250);
    });
  }

  useEffect(() => {
    query()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        dispatch(setApplicationsAction(res.data));
      })
      .catch((error) => setIsError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, isError };
}
