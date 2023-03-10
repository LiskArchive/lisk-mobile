import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

/**
 * @typedef {object} InboxOutboxJSON
 * @property {string[]} appendPath
 * @property {number} size
 * @property {string} root
 */

/**
 * @typedef {object} ChannelDataJSON
 * @property {InboxOutboxJSON} inbox
 * @property {InboxOutboxJSON} outbox
 * @property {string} partnerChainOutboxRoot
 * @property {string} messageFeeTokenID
 * @property {string} minReturnFeePerByte
 */

/**
 * Gets channel info of a given blockchain.
 * @param {string} chainID - ID of the chain to query the channel info from.
 * @param {object} configs - Query custom configs.
 * @param {QueryOptions} configs.options - Query config options.
 * @returns {QueryResult<ChannelDataJSON>} Query state: data (ChannelDataJSON), isLoading, isError, error, isSuccess and more.
 */
export function useChainChannelQuery(chainID, { options = {} } = {}) {
  const config = {
    data: {
      endpoint: 'interoperability_getChannel',
    },
    params: {
      chainID: Buffer.from(chainID, 'hex'),
    },
  };

  return useInvokeQuery({
    config,
    options,
  });
}
