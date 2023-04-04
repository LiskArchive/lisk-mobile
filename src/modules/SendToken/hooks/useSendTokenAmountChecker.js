import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { fromDisplayToBaseDenom } from '../../../utilities/conversions.utils';

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

  const isMaxAllowedAmountExceeded =
    maxAllowedAmount -
      (selectedToken
        ? BigInt(
            fromDisplayToBaseDenom({
              amount,
              displayDenom: selectedToken.displayDenom,
              denomUnits: selectedToken.denomUnits,
            })
          )
        : BigInt(0)) <=
    0;

  return { maxAllowedAmount, isMaxAllowedAmountExceeded };
}
