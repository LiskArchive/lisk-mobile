/* eslint-disable max-statements */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Linking } from 'react-native';

import { useGetNetworkStatusQuery } from 'modules/Network/api/useGetNetworkStatusQuery';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { SUPPORT_EMAIL_ADDRESS } from 'constants/mail';
import { API_VERSION } from 'utilities/api/constants';
import { useState } from 'react';

export function useEmailReport({ errorMessage, error } = {}) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorOnLinking, setErrorOnLinking] = useState();

  const [currentApplication] = useCurrentBlockchainApplication();

  const {
    data: networkStatusData,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData
  } = useGetNetworkStatusQuery();

  let baseBody = '';

  if (networkStatusData) {
    baseBody = `
      \nImportant metadata for the team, please do not edit:
      \r
      Lisk Core Version: ${networkStatusData.data.networkVersion}
      \r
      NetworkIdentifier: ${networkStatusData.data.networkIdentifier}
    `;
  }

  if (currentApplication?.apis) {
    const stringifiedAppApis = currentApplication.apis.reduce(
      (acc, api) => `${acc} - ${api.rest}`, ''
    );

    baseBody += `
      \r
      ServiceURL: ${stringifiedAppApis}
    `;
  }

  if (errorMessage) {
    baseBody += `
      \r
      Error Message: ${errorMessage}
    `;
  }

  if (error) {
    baseBody += `
      \r
      Transaction: ${JSON.stringify(error)}
    `;
  }

  const receiver = SUPPORT_EMAIL_ADDRESS;
  const subject = `User Reported Error - Lisk - ${API_VERSION}`;
  const body = encodeURIComponent(baseBody);
  const url = `mailto:${receiver}?subject=${subject}&body=${body}`;

  async function handleSend() {
    setIsFetching(true);

    return Linking.openURL(url).then(
      () => setIsFetching(false)
    )
      .catch(_error => {
        setErrorOnLinking(_error);
        setIsFetching(false);
      });
  }

  console.log({
    url,
    handleSend,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData || errorOnLinking,
    isFetching,
  });

  return {
    url,
    handleSend,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData || errorOnLinking,
    isFetching,
  };
}
