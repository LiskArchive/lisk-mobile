import { useCallback, useState } from 'react';

import { APPLICATIONS_MOCK } from '../mocks';

export function useGetBlockchainApplicationByChainIdQuery(externalChainId) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const query = useCallback((internalChainId) => {
    const chainId = externalChainId || internalChainId;

    setLoading(true);

    // TODO: Replace to real call when API is available.
    new Promise((resolve) =>
      setTimeout((() =>
        resolve({ data: APPLICATIONS_MOCK.find(MOCK => MOCK.chainID === chainId) })
      ), 2000)).then(res => {
      setData(res);

      setLoading(false);
    }).catch(err => setError(err));
  }, []);

  return [query, { data, loading, error }];
}
