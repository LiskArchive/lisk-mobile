import { useState } from 'react';

import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';

export function useExternalApplicationConnectedChains(requiredNamespaces) {
  const [chains, setChains] = useState([]);

  const connectingChainIDs = requiredNamespaces?.lisk.chains.map((chain) =>
    chain.replace('lisk:', '')
  );

  const { isLoading, isError } = useApplicationsMetaQuery({
    options: {
      enabled: !!connectingChainIDs,
      onSuccess: ({ data }) => {
        const chainsData = connectingChainIDs.map((chainID) => ({
          ...(data.find((app) => app.chainID === chainID) || []),
          chainID,
        }));

        setChains(chainsData);
      },
    },
    config: {
      params: { chainID: connectingChainIDs?.join(','), network: undefined, limit: undefined },
    },
  });

  return { chains, isLoading, isError };
}
