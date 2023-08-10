/* eslint-disable max-statements */
import { useEffect, useState, useRef } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

export function usePasteFromClipboard({ onSuccess, onError } = {}) {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [pasted, setPasted] = useState(false);

  const timeout = useRef();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const text = await Clipboard.getString();

      setPasted((prevState) => !prevState);

      if (onSuccess) {
        onSuccess(text);
      }

      setData(text);

      setIsLoading(false);

      timeout.current = setTimeout(() => {
        setPasted((prevState) => !prevState);
      }, 4000);
    } catch (e) {
      if (onError) {
        onError(e);
      }

      setError(e);
      setIsLoading(false);
    }
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [fetchData, { data, isLoading, error, isError: !!error, pasted }];
}
