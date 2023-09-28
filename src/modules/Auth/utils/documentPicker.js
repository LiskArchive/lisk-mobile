import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const selectEncryptedFile = async (onError) => {
  try {
    const file = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.allFiles,
    });
    if (file.type !== 'application/json') {
      throw new Error('Invalid file type');
    }
    const encryptedData = await RNFS.readFile(file.uri);
    return encryptedData;
  } catch (error) {
    return onError();
  }
};
