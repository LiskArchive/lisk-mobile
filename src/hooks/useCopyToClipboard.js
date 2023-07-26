import { useEffect, useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

export function useCopyToClipboard(value, { autoCleanup = false }) {
  const [copied, setCopied] = useState(false);

  const timeout = useRef();

  const handleCopy = () => {
    Clipboard.setString(value);
    setCopied(true);

    timeout.current = setTimeout(() => {
      setCopied(false);

      if (autoCleanup) {
        Clipboard.setString(''); // Clear the clipboard after 5 seconds
      }
    }, 5000);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [copied, handleCopy];
}
