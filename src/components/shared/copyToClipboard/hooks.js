import { useEffect, useRef, useState } from 'react';
import { Clipboard } from 'react-native';

export function useCopyToClipboard(value) {
  const [copied, setCopied] = useState(false);

  let timeout = useRef();

  function handleCopy() {
    setCopied(prevState => !prevState);

    Clipboard.setString(value);

    timeout = setTimeout(() => {
      setCopied(prevState => !prevState);
    }, 4000);
  }

  useEffect(() => () => clearTimeout(timeout), []);

  return [copied, handleCopy];
}
