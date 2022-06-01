import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export const downloadJSON = async (data, cb) => {
  try {
    const path = `${RNFS.CachesDirectoryPath}/encrypted_secret_recovery_phrase.json`;
    if (Platform.OS === 'android') {
      await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
    await RNFS.writeFile(path, data, 'utf8');
    await Share.open({
      filename: 'encrypted_secret_recovery_phrase.json',
      saveToFiles: true,
      url: path
    });
    cb();
  } catch (error) {
    cb(error);
  }
};
