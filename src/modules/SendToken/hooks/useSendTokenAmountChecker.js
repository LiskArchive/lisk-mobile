/* eslint-disable max-statements */
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccountTokenBalancesQuery } from 'modules/Accounts/api/useAccountTokenBalancesQuery';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';
import { validateTransactionAmount } from 'utilities/validators';
import { useTransferableTokens } from '../../BlockchainApplication/api/useTransferableTokens';

export function useSendTokenAmountChecker({
  recipientApplication,
  selectedTokenID,
  amount,
  transactionFee,
}) {
  const [currentAccount] = useCurrentAccount();

  const { data: supportedTokensData } = useTransferableTokens(recipientApplication);

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === selectedTokenID);

  const { data: tokenBalanceData, isLoading } = useAccountTokenBalancesQuery(
    currentAccount.metadata.address,
    {
      params: { tokenID: selectedTokenID },
    }
  );

  const tokenBalance = BigInt(tokenBalanceData?.data[0]?.availableBalance || 0);

  const maxAllowedAmount = tokenBalance - transactionFee;
  let isAmountValid = true;

  if (!amount || isLoading) {
    return { isAmountValid, maxAllowedAmount, isMaxAllowedAmountExceeded: false };
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
    isAmountValid = false;
  }

  const isMaxAllowedAmountExceeded = maxAllowedAmount - validatedAmount <= 0;

  return { isAmountValid, maxAllowedAmount, isMaxAllowedAmountExceeded };
}
