import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';

/**
 * Checks if an account is available or not to send tokens based on its balance.
 * @param {string} address - Address of the account to query the tokens from.
 * @returns {QueryResult<boolean>} - The state of the account query and if has or not balance to transfer tokens (as data field).
 */
export function useAccountCanSendTokens(address) {
  const accountTokensQuery = useAccountTokensQuery(address);

  const hasBalance = accountTokensQuery.data?.data.reduce(
    (acc, token) => acc || BigInt(token.availableBalance) > 0,
    false
  );

  return { ...accountTokensQuery, data: hasBalance };
}
