/* eslint-disable max-statements */
import { useState } from 'react';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export function useDownloadFile({ data, fileName, onCompleted, onError }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [error, setError] = useState();

  async function handleDownload() {
    try {
      setIsSuccess();
      setError();
      setIsError();

      setIsLoading(true);

      let path = `${RNFS.CachesDirectoryPath}/${fileName}`;

      if (Platform.OS === 'android') {
        await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
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
      setIsLoading(false);
      setIsSuccess(false);
      setError(_error);
      setIsError(true);

      if (onError) {
        onError(_error);
      }
    }
  }

  return [handleDownload, { isLoading, error, isError, isSuccess }];
}
