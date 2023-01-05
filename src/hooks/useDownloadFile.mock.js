/* eslint-disable max-statements */
import { useCallback, useState } from 'react';

/**
 * Provides a stateful callback to download data as files.
 * @param {Object} data - Data to be saved into the File.
 * @param {String} fileName - Name to put to the downloaded file.
 * @param {Function} onCompleted - Optional callback to execute if the download success.
 * @param {Function} onError - Optional callback to execute if the download fails.
 * @returns {[Function, Object]} - The download trigger function and the download process state (loading, error and success flags).
 */
export function useDownloadFile({ onCompleted, onError }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [error, setError] = useState();

  const resetState = useCallback(() => {
    if (isSuccess !== undefined) {
      setIsSuccess();
    }
    if (isError !== undefined) {
      setIsError();
    }
    if (error !== undefined) {
      setError();
    }
  }, [error, isError, isSuccess]);

  const downloadFile = useCallback(async () => {
    try {
      resetState();

      setIsLoading(true);

      setIsLoading(false);
      setIsSuccess(true);

      if (onCompleted) {
        onCompleted();
      }
    } catch (_error) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(_error);
      setIsError(true);

      if (onError) {
        onError(_error);
      }
    }
  }, [onCompleted, onError, resetState]);

  return [downloadFile, { isLoading, error, isError, isSuccess }];
}
