import moment from 'moment';

import apiClient from 'utilities/api/APIClient';
import { getTokensMetaQueryConfig } from 'modules/BlockchainApplication/api/useTokensMetaQuery';

export const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};

export async function transformTokensResult(res) {
  const transformTokens = async (tokens) => {
    try {
      const tokensIDs = tokens?.map(({ tokenID }) => tokenID).join(',');

      if (!tokensIDs) {
        return tokens;
      }

      const metaConfig = getTokensMetaQueryConfig({
        params: {
          tokenID: tokensIDs,
        },
      });

      const tokenMetaRes = await apiClient.call(metaConfig);

      return tokens.map((tokenData) => {
        const selectedTokenMetaData = tokenMetaRes?.data?.find(
          (tokenMetaData) => tokenMetaData.tokenID === tokenData.tokenID
        );

        return { ...(selectedTokenMetaData ?? {}), ...tokenData };
      });
    } catch (error) {
      return tokens;
    }
  };

  const tokensData = await transformTokens(res.data);

  return {
    ...res,
    data: tokensData,
  };
}
