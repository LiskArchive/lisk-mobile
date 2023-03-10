import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

/**
 * @typedef {object} MessageFeeResult
 * @property {fee} string
 */

/**
 * Gets the minimum fee required to calculate a cross-chain transfer message fee.
 * @param {object} configs - Query custom configs.
 * @param {QueryOptions} configs.options - Query config options.
 * @returns {QueryResult<MessageFeeResult>} Query state: data (MessageFeeResult), isLoading, isError, error, isSuccess and more.
 */
export function useMessageFee({ options = {} } = {}) {
  const config = {
    data: {
      endpoint: 'interoperability_getMinimumMessageFee',
    },
  };

  return useInvokeQuery({
    config,
    options,
  });
}
