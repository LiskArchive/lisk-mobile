/* eslint-disable no-undef */
/* eslint-disable max-statements */
import * as Lisk from '@liskhq/lisk-client';

import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';

export function useSendTokenAmountCheck({
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
    maxAllowedAmount - BigInt(Lisk.transactions.convertLSKToBeddows(amount.toString())) <= 0;

  return { maxAllowedAmount, isMaxAllowedAmountExceeded };
}
