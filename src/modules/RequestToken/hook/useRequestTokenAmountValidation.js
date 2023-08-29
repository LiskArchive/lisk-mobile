import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';
import { validateTransactionAmount } from 'utilities/validators';

export function useRequestTokenAmountValidation({ recipientApplication, selectedTokenID, amount }) {
  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === selectedTokenID);

  let isAmountValid = true;

  try {
    selectedToken && validateTransactionAmount(amount)
      ? BigInt(
          fromDisplayToBaseDenom({
            amount,
            displayDenom: selectedToken.displayDenom,
            denomUnits: selectedToken.denomUnits,
          })
        )
      : BigInt(0);
  } catch (error) {
    isAmountValid = false;
  }

  return { isAmountValid };
}
