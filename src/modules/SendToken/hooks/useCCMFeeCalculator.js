import { useEffect, useState } from 'react';

// TODO: Implement real calculation business logic.
export default function useCCMFeeCalculator({
  senderApplicationChainID,
  recipientApplicationChainID,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      const fee = 0;

      setData(fee);

      setIsLoading(false);
    } catch (_error) {
      setError(_error);

      setIsLoading(false);
    }
  }, [senderApplicationChainID, recipientApplicationChainID]);

  return { data, isLoading, error };
}
