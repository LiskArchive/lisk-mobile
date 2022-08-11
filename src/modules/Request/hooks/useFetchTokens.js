import { useEffect, useRef, useState } from 'react';
import { TOKENS_MOCK } from 'modules/BlockchainApplication/mocks';

export const useFetchTokens = (applicationId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const timeout = useRef();
  const fetchTokensById = () => {
    setIsLoading(true);
    timeout.current = setTimeout(() => {
      setTokens(TOKENS_MOCK);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!applicationId) {
      setTokens(null);
    } else {
      fetchTokensById();
    }
    return () => clearTimeout(timeout.current);
  }, [applicationId]);

  return { tokens, isLoading };
};
