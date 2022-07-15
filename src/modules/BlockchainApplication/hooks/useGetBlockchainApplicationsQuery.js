import { useCallback, useEffect, useState } from 'react';

import { APPLICATIONS_MOCK } from '../mocks';

export function useGetBlockchainApplicationsQuery() {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const query = useCallback(() => {
    // TODO: Replace to real call when API is available.

    new Promise((resolve) =>
      setTimeout((() =>
        resolve({ data: APPLICATIONS_MOCK })
      ), 2000)).then(res => {
      setData(res.data);

      setLoading(false);
    }).catch(err => setError(err));
  }, []);

  useEffect(() => {
    query();
  }, []);

  return { data, loading, error };
}
