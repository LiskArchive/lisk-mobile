import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export const downloadJSON = async (data, fileName = 'download.json', cb) => {
  try {
    let path = `${RNFS.CachesDirectoryPath}/${fileName}`;
    if (Platform.OS === 'android') {
      await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      path = `${RNFS.DownloadDirectoryPath}/encrypted_secret_recovery_phrase.json`;
      await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
    } else {
      await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
      await Share.open({
        filename: 'encrypted_secret_recovery_phrase.json',
        saveToFiles: true,
        url: path
      });
    }
    cb();
  } catch (error) {
    cb(error);
  }
};
