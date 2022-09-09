import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery'
import { GET_APPLICATION_STATS } from 'utilities/api/queries'
import { API_URL, API_BASE_URL } from 'utilities/api/constants'

export function useBlockchainApplicationStats() {
  const query = useCustomQuery({
    keys: [GET_APPLICATION_STATS],
    config: {
      baseURL: API_BASE_URL,
      url: `${API_URL}/blockchain/apps/statistics`,
      method: 'get',
    },
  })

  return {
    ...query,
    data: query.data?.data ?? {},
  }
}
