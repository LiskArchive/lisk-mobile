/* eslint-disable max-statements */
import { useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { SUPPORT_EMAIL_ADDRESS } from 'constants/mail';
import { API_VERSION } from 'utilities/api/constants';

/**
 * Allows to send an email report based on provided error.
 * Opens email app of device and prefill error metadata.
 * @param {Error} error - Error instance that generates the email report.
 * @param {String} errorMessage - Error message to add to the email metadata (optional).
 * @returns {Object} - The send email callback and its execution state (loading, error and data).
 */
export function useEmailReport({ error, errorMessage } = {}) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorOnLinking, setErrorOnLinking] = useState();

  const [currentApplication] = useCurrentApplication();

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

    if (currentApplication.data?.serviceURLs) {
      const stringifiedAppApis = currentApplication.data.serviceURLs.reduce(
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
  }, [networkStatusData?.data, currentApplication.data?.serviceURLs, errorMessage, error]);

  const handleResetState = () => {
    setIsFetching(false);
    setErrorOnLinking(undefined);
  };

  const handleSend = () => {
    handleResetState();

    setIsFetching(true);

    if (!url) {
      setErrorOnLinking(new Error('Not URL defined before sending.'));
      return setIsFetching(false);
    }

    return Linking.canOpenURL(url)
      .then((isURLSupported) => {
        if (!isURLSupported) {
          setErrorOnLinking(new Error(`Can't handle url: ${url}`));
          setIsFetching(false);
        } else {
          Linking.openURL(url)
            .then(() => setIsFetching(false))
            .catch((_error) => {
              setErrorOnLinking(_error);
              setIsFetching(false);
            });
        }
      })
      .catch((_error) => {
        setErrorOnLinking(_error);
        setIsFetching(false);
      });
  };

  return {
    url,
    handleSend,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData || errorOnLinking,
    isFetching,
  };
}
