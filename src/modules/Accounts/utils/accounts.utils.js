import moment from 'moment';

import apiClient from 'utilities/api/APIClient';
import { getTokensMetaQueryConfig } from 'modules/BlockchainApplication/api/useTokensMetaQuery';

export const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};

/**
 * Merges tokens data and metadata query results.
 * @param {Array} tokens - Tokens on-chain data obtained from the GET /tokens endpoint.
 * @returns {Array} List of tokens containing its off-chain and on-chain data merged.
 */
export async function addTokensMetaData(tokens) {
  try {
    const tokensIDs = tokens?.map(({ tokenID }) => tokenID).join(',');

    if (!tokensIDs) {
      return tokens;
    }

    const metaDataQueryConfig = getTokensMetaQueryConfig({
      params: {
        tokenID: tokensIDs,
      },
    });

    const tokenMetaRes = await apiClient.call(metaDataQueryConfig);

    return tokens.map((tokenData) => {
      const selectedTokenMetaData = tokenMetaRes?.data?.find(
        (tokenMetaData) => tokenMetaData.tokenID === tokenData.tokenID
      );

      return { ...(selectedTokenMetaData ?? {}), ...tokenData };
    });
  } catch (error) {
    return tokens;
  }
}
