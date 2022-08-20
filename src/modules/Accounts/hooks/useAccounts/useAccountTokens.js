import ApiClient from 'utilities/api/lisk/apiClient';
import { useQuery } from '@tanstack/react-query';

export function useAccountTokens(address) {
  const {
    isLoading, error, data, refetch
  } = useQuery([`accountTokens-${address}`], () => ApiClient.getTokens(address));

  return {
    isLoading, error, tokens: data, refetch
  };
}
