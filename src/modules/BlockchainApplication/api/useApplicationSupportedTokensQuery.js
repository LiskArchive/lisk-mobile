import { useMemo, useRef } from 'react';

import { APIClient } from 'utilities/api/APIClient';
import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import { useSupportedTokensQuery } from './useSupportedTokensQuery';

export function useApplicationSupportedTokensQuery(application) {
  const apiClient = useRef(new APIClient());

  if (application?.serviceURLs?.length) {
    apiClient.current.create(application.serviceURLs[0]);
  }

  const { data: { data: accountTokensData = [] } = {}, isSuccess: isAccountTokensSuccess } =
    useAccountTokensQuery();

  const {
    data: { data: { supportedTokensData = [] } = {} } = {},
    isSuccess: isSupportedTokensSuccess,
  } = useSupportedTokensQuery({ client: apiClient.current });

  const isSuccess = isAccountTokensSuccess && isSupportedTokensSuccess;

  const tokens = useMemo(() => {
    const isSupportAllToken = supportedTokensData.length === 0;

    return isSupportAllToken
      ? accountTokensData
      : accountTokensData.filter(
          (token) =>
            supportedTokensData.find((supportedToken) => supportedToken.symbol === token.symbol)
              .length
        );
  }, [accountTokensData, supportedTokensData]);

  console.log('tokens', tokens, isSuccess, isAccountTokensSuccess, isSupportedTokensSuccess);

  return isSuccess ? tokens : [];
}
