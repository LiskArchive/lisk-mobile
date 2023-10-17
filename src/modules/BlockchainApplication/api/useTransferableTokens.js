import { useMemo } from 'react';

import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccountTokenBalancesQuery } from 'modules/Accounts/api/useAccountTokenBalancesQuery';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';

export function useTransferableTokens(application = {}) {
  const [currentAccount] = useCurrentAccount();
  const address = currentAccount?.metadata?.address;

  const networkSupportedTokens = useApplicationSupportedTokensQuery(application);
  const tokenBalances = useAccountTokenBalancesQuery(address, {
    options: { enabled: !!address && networkSupportedTokens.isSuccess },
  });

  const transferrableTokens = networkSupportedTokens.data
    ? networkSupportedTokens.data.filter((networkSupportedToken) =>
        tokenBalances.data?.data?.some(
          (tokenBalance) => tokenBalance.tokenID === networkSupportedToken.tokenID
        )
      )
    : [];

  const nonNativeTokens = transferrableTokens.filter(
    ({ chainID }) => chainID !== application.chainID
  );
  const nativeToken = transferrableTokens.filter(({ chainID }) => chainID === application.chainID);
  const resultTokens = useMemo(
    () => nativeToken.concat(nonNativeTokens),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [networkSupportedTokens.isSuccess, tokenBalances.isSuccess, application]
  );

  return {
    data: resultTokens,
    isLoading: tokenBalances.isLoading || networkSupportedTokens.isLoading,
    isSuccess:
      tokenBalances.isSuccess &&
      !networkSupportedTokens.isError &&
      !networkSupportedTokens.isLoading,
  };
}
