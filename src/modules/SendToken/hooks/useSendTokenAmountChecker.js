import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';
import { isTransactionAmountValid } from 'utilities/validators';

export function useSendTokenAmountChecker({
  recipientApplication,
  selectedTokenID,
  amount,
  transactionFee,
}) {
  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === selectedTokenID);

  const tokenBalance = BigInt(selectedToken?.availableBalance || 0);

  const maxAllowedAmount = tokenBalance - transactionFee;

  if (!amount) {
    return { maxAllowedAmount, isMaxAllowedAmountExceeded: false };
  }

  const validatedAmount =
    selectedToken && isTransactionAmountValid(amount)
      ? BigInt(
          fromDisplayToBaseDenom({
            amount,
            displayDenom: selectedToken.displayDenom,
            denomUnits: selectedToken.denomUnits,
          })
        )
      : BigInt(0);

  const isMaxAllowedAmountExceeded = maxAllowedAmount - validatedAmount <= 0;

  return { maxAllowedAmount, isMaxAllowedAmountExceeded };
}
