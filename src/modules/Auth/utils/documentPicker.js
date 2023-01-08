import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const selectEncryptedFile = async () => {
  const file = await DocumentPicker.pickSingle({
    type: DocumentPicker.types.allFiles,
  });
  const encryptedData = await RNFS.readFile(file.uri);
  return encryptedData;
};
