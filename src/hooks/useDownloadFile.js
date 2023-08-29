/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { Platform, ToastAndroid } from 'react-native';
import i18next from 'i18next';

/**
 * Provides a stateful callback to download data as files.
 * @param {Object} data - Data to be saved into the File.
 * @param {String} fileName - Name to put to the downloaded file.
 * @param {Function} onCompleted - Optional callback to execute if the download success.
 * @param {Function} onError - Optional callback to execute if the download fails.
 * @returns {[Function, Object]} - The download trigger function and the download process state (loading, error and success flags).
 */
export function useDownloadFile({ data, fileName, onCompleted, onError }) {
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
      // delete added isBiometricsEnabled field
      delete data.isBiometricsEnabled;

      resetState();

      setIsLoading(true);

      let path = `${RNFS.CachesDirectoryPath}/-${fileName}`;

      if (Platform.OS === 'android') {
        await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        const fileExists = await RNFS.exists(path);

        if (fileExists) {
          await RNFS.unlink(path);
        }
        await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
        ToastAndroid.showWithGravity(
          i18next.t('auth.setup.downloaded'),
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else {
        await RNFS.writeFile(path, JSON.stringify(data), 'utf8');

        await Share.open({
          filename: fileName,
          saveToFiles: true,
          url: path,
        });
      }

      setIsLoading(false);
      setIsSuccess(true);

      if (onCompleted) {
        onCompleted();
      }
    } catch (_error) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          i18next.t('auth.setup.enablePermissions'),
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
      setIsLoading(false);
      setIsSuccess(true);
      setError(_error);
      setIsError(true);

      if (onError) {
        onError(_error);
      }
    }
  }, [data, fileName, onCompleted, onError, resetState]);

  return [downloadFile, { isLoading, error, isError, isSuccess }];
}
