import ApiClient from 'utilities/api/lisk/apiClient';
import { useQuery } from '@tanstack/react-query';

export function useAccountTokens(address) {
  const query = useQuery([`accountTokens-${address}`], () => ApiClient.getTokens(address));

  return query;
}
