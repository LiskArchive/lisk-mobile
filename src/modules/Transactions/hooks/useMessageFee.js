import { useInvokeQuery } from 'utilities/api/hooks/useInvokeQuery';

/**
 * Gets the minimum fee required to calculate a cross-chain transfer message fee.
 * @param {Object} params.options - Query custom options.
 * @returns {Object} Query state: data ({fee: string}), isLoading, isError, error, isSuccess and more.
 */
export function useMessageFee({ options = {} } = {}) {
  const config = {
    data: {
      endpoint: 'interoperability_getMinimumMessageFee',
      params: {},
    },
  };

  return useInvokeQuery({
    config,
    options,
  });
}
