import { NativeModules, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const { SensitiveClipboardModule } = NativeModules;

export function setValueToClipboard(value) {
  if (Platform.OS === 'android') {
    SensitiveClipboardModule.copyToClipboardSensitive(value);
  } else {
    Clipboard.setString(value);
  }
}
