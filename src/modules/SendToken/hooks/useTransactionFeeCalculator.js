/* eslint-disable max-statements */
import { useMemo } from 'react'
import { useAccountInfo } from '../../Accounts/hooks/useAccounts/useAccountInfo'
import { useCurrentAccount } from '../../Accounts/hooks/useAccounts/useCurrentAccount'
import { calculateTransactionFees } from './transactionFee/transactionFeeCalculation'
import useTransactionPriorities from './useTransactionPriorities'

export default function useTransactionFeeCalculator({ tokenID, amount, priority, message }) {
  const { summary: account } = useAccountInfo()
  const [currAccount] = useCurrentAccount()

  const { data: prioritiesData, isLoading: isLoadingPrioritiesData } = useTransactionPriorities()

  const data = useMemo(() => {
    const priorityFee =
      prioritiesData?.reduce((acc, _priority) => {
        if (_priority.code === priority) return _priority.fee

        return acc
      }, 0) ?? 0

    const fee = calculateTransactionFees({
      transaction: { amount },
      account: { ...account, publicKey: currAccount.metadata.pubkey, balance: 100000000000 },
      priorityOptions: prioritiesData,
      selectedPriority: { fee: priorityFee },
    }).value

    return fee
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPrioritiesData, priority, tokenID, amount, message])

  return { data, isLoading: isLoadingPrioritiesData }
}
