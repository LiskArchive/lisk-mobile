/* eslint-disable max-statements */
import { useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useNetworkStatusQuery } from 'modules/Network/api/useNetworkStatusQuery';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import liskAPIClient from 'utilities/api/LiskAPIClient';
import { API_VERSION } from 'utilities/api/constants';
import { SUPPORT_EMAIL_ADDRESS } from 'constants/mail';

/**
 * Allows to send an email report based on provided error.
 * Opens email app of device and prefill error metadata.
 * @param {Error} error - Error instance that generates the email report.
 * @param {String} errorMessage - Error message to add to the email metadata (optional).
 * @returns {Object} - The send email callback and its execution state (loading, error and data).
 */
export function useEmailReport({ error, errorMessage, onError } = {}) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorOnLinking, setErrorOnLinking] = useState();

  const [currentApplication] = useCurrentApplication();

  const {
    data: networkStatusData,
    isLoading: isLoadingNetworkStatusData,
    error: errorOnNetworkStatusData,
  } = useNetworkStatusQuery({ client: liskAPIClient });

  const url = useMemo(() => {
    let value;
    let baseBody;

    if (networkStatusData?.data) {
      baseBody = `
      \r
      - Lisk Core Version: ${networkStatusData.data.version}
      \r
      - Lisk Network Version: ${networkStatusData.data.networkVersion}
      \r
      - Chain ID: ${networkStatusData.data.chainID}`;
    }

    if (currentApplication.data?.serviceURLs) {
      const stringifiedAppApis = currentApplication.data.serviceURLs.reduce(
        (acc, serviceURL) => `${acc} - ${serviceURL.http}`,
        ''
      );

      baseBody += `- Service URL: ${stringifiedAppApis}`;
    }

    if (errorMessage) {
      baseBody += `- Error Message: "${errorMessage}".`;
    }

    if (error) {
      const stringifiedError = JSON.stringify({ message: error?.message, stack: error?.stack });

      baseBody += `- Error: "${stringifiedError}".`;
    }

    if (baseBody) {
      baseBody = `\nImportant metadata for the team, please do not edit:${baseBody}`;

      const receiver = SUPPORT_EMAIL_ADDRESS;
      const subject = `User Reported Error - Lisk - ${API_VERSION}`;
      const body = baseBody.replace(/&/g, '%26').replace(/\?/g, '%3F');

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
          const error = new Error(`Can't handle url: ${url}`);
          setErrorOnLinking(new Error(`Can't handle url: ${url}`));
          setIsFetching(false);
          onError && onError(error);
        } else {
          Linking.openURL(url)
            .then(() => setIsFetching(false))
            .catch((_error) => {
              console.log('error', _error);
              setErrorOnLinking(_error);
              setIsFetching(false);
              onError && onError(_error);
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
