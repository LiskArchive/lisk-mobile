import { useQuery } from '@tanstack/react-query'
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication'
import { METHOD, API_METHOD, API_URL } from 'utilities/api/constants'

export function useAccountTokens(address) {
  const [currApp] = useCurrentBlockchainApplication()
  const query = useQuery([`accountTokens-${address}-${currApp.chainID}`], () =>
    API_METHOD[METHOD]({
      url: `${API_URL}/tokens?address=${address}`,
      method: 'get',
    })
  )

  return {
    ...query,
    data: query.data?.data,
  }
}
