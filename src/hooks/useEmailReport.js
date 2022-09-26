/* eslint-disable max-statements */
import { useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { SUPPORT_EMAIL_ADDRESS } from 'constants/mail';
import { API_VERSION } from 'utilities/api/constants';
import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';

export function useEmailReport({ errorMessage, error } = {}) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorOnLinking, setErrorOnLinking] = useState();

  const [currentApplication] = useCurrentBlockchainApplication();

  const {
    data: networkStatusData,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData,
  } = useNetworkStatusQuery();

  const url = useMemo(() => {
    let value;
    let baseBody;

    if (networkStatusData?.data) {
      baseBody = `
        \r
        Lisk Core Version: ${networkStatusData.data.networkVersion}
        \r
        NetworkIdentifier: ${networkStatusData.data.networkIdentifier}
      `;
    }

    if (currentApplication?.serviceURLs) {
      const stringifiedAppApis = currentApplication.serviceURLs.reduce(
        (acc, serviceURL) => `${acc} - ${serviceURL.http}`,
        ''
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

    if (baseBody) {
      baseBody = `\nImportant metadata for the team, please do not edit:${baseBody}`;

      const receiver = SUPPORT_EMAIL_ADDRESS;
      const subject = `User Reported Error - Lisk - ${API_VERSION}`;
      const body = encodeURIComponent(baseBody);

      value = `mailto:${receiver}?subject=${subject}&body=${body}`;
    }

    return value;
  }, [networkStatusData?.data, currentApplication?.serviceURLs, errorMessage, error]);

  async function handleSend() {
    if (!url) return setErrorOnLinking(new Error('Not URL defined before sending.'));

    setIsFetching(true);

    return Linking.openURL(url)
      .then(() => setIsFetching(false))
      .catch((_error) => {
        setErrorOnLinking(_error);
        setIsFetching(false);
      });
  }

  return {
    url,
    handleSend,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData || errorOnLinking,
    isFetching,
  };
}
