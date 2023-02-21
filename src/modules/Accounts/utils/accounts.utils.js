import apiClient from 'utilities/api/APIClient';
import { getTokensMetaQueryConfig } from 'modules/BlockchainApplication/api/useTokensMetaQuery';

/**
 * Merges tokens data and metadata query results.
 * @param {Array} tokens - Tokens on-chain data obtained from the GET /tokens endpoint.
 * @returns {Array} List of tokens containing its off-chain and on-chain data merged.
 */
export async function addTokensMetaData(tokens) {
  try {
    const tokensIDs = tokens.map(({ tokenID }) => tokenID).join(',');

    const metaDataQueryConfig = getTokensMetaQueryConfig({
      params: {
        tokenID: tokensIDs,
      },
    });

    const tokenMetaRes = await apiClient.call(metaDataQueryConfig);

    const tokensFullData = tokens.reduce((acc, tokenData) => {
      const selectedTokenMetaData = tokenMetaRes?.data?.find(
        (tokenMetaData) => tokenMetaData.tokenID === tokenData.tokenID
      );

      if (selectedTokenMetaData) {
        return [...acc, { ...selectedTokenMetaData, ...tokenData }];
      }

      return acc;
    }, []);

    return tokensFullData;
  } catch (error) {
    return tokens;
  }
}
