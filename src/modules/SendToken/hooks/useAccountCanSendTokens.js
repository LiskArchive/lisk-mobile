/* eslint-disable max-statements */
import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useFeesQuery } from '../../Transactions/api/useFeesQuery';
import { useCurrentApplication } from '../../BlockchainApplication/hooks/useCurrentApplication';

/**
 * Checks if an account is available or not to send tokens based on its balance.
 * @param {string} address - Address of the account to query the tokens from.
 * @returns {QueryResult<boolean>} - The state of the account query and if has or not balance to transfer tokens (as data field).
 */
export function useAccountCanSendTokens(address) {
  const accountTokensQuery = useAccountTokensQuery(address);
  const [currentApplication] = useCurrentApplication();
  const feesQuery = useFeesQuery();
  const { data: tokensData } = useApplicationSupportedTokensQuery(currentApplication?.data);

  if (!address) {
    return { isLoading: true };
  }

  const feeTokenID = feesQuery.data?.data?.feeTokenID;
  const selectedToken = tokensData?.find((token) => token.tokenID === feeTokenID);

  const tokenName = selectedToken?.tokenName ?? '';

  const hasBalance = accountTokensQuery.data?.data.reduce(
    (acc, token) => acc || (BigInt(token.availableBalance) > 0 && token.tokenID === feeTokenID),
    false
  );

  return { ...accountTokensQuery, data: hasBalance, tokenName };
}
