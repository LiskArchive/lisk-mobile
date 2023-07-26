import { useEffect, useRef, useState } from 'react';

import { setValueToClipboard } from 'utilities/clipboard.utils';

export function useCopyToClipboard(value, { autoCleanup = false }) {
  const [copied, setCopied] = useState(false);

  const timeout = useRef();

  const handleCopy = () => {
    setValueToClipboard(value);

    setCopied(true);

    timeout.current = setTimeout(() => {
      setCopied(false);

      if (autoCleanup) {
        setValueToClipboard('');
      }
    }, 10000);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [copied, handleCopy];
}
