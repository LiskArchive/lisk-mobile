import { API_VERSION } from '../constants';
import { INVOKE_QUERY } from '../queries';
import { useCustomQuery } from './useCustomQuery';

/**
 * Query that acts as proxy to call direct invoke methods to blockchain application client.
 * @param {object} params.config - Query custom configs.
 * @param {string} params.options - Query custom options.
 */
export function useInvokeQuery({ config: customConfig = {}, options }) {
  const config = {
    url: `/api/${API_VERSION}/invoke`,
    method: 'post',
    event: 'post.invoke',
    ...customConfig,
  };
  return useCustomQuery({
    keys: [INVOKE_QUERY, config, options],
    config,
    options,
  });
}
