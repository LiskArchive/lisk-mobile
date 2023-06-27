/* eslint-disable max-statements */
import { useState } from 'react';
import { Clipboard } from 'react-native';

export function usePasteFromClipboard({ onSuccess, onError } = {}) {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchValue = async () => {
    setIsLoading(true);

    try {
      const text = await Clipboard.getString();

      if (onSuccess) {
        onSuccess(text);
      }

      setData(text);

      setIsLoading(false);
    } catch (e) {
      if (onError) {
        onError(e);
      }

      setError(e);
      setIsLoading(false);
    }
  };

  return [fetchValue, { data, isLoading, error, isError: !!error }];
}
