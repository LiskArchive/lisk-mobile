/* eslint-disable max-statements */
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccountTokenBalancesQuery } from 'modules/Accounts/api/useAccountTokenBalancesQuery';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';
import { validateTransactionAmount } from 'utilities/validators';

export function useSendTokenAmountChecker({
  recipientApplication,
  selectedTokenID,
  amount,
  transactionFee,
}) {
  const [currentAccount] = useCurrentAccount();

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === selectedTokenID);

  const { data: tokenBalanceData } = useAccountTokenBalancesQuery(currentAccount.metadata.address, {
    params: { tokenID: selectedTokenID },
  });

  const tokenBalance = BigInt(tokenBalanceData?.data[0]?.availableBalance || 0);

  const maxAllowedAmount = tokenBalance - transactionFee;

  if (!amount) {
    return { maxAllowedAmount, isMaxAllowedAmountExceeded: false };
  }

  let validatedAmount;

  try {
    validatedAmount =
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
    validatedAmount = BigInt(0);
  }

  const isMaxAllowedAmountExceeded = maxAllowedAmount - validatedAmount <= 0;

  return { maxAllowedAmount, isMaxAllowedAmountExceeded };
}
