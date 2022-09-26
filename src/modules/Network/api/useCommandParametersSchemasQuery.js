import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { API_URL } from 'utilities/api/constants';
import { GET_COMMAND_PARAMETERS_SCHEMAS_QUERY } from 'utilities/api/queries';

/**
 * Creates a custom hook for command parameters schemas queries
 *
 * @param {object} configuration - the custom query configuration object
 * @param {Object} configuration.config - the query config
 * @param {Object} configuration.config.params - the query config params
 * @param {string} [configuration.config.params.moduleCommandID] - the transaction type
 * @param {string} [configuration.config.params.moduleCommandName] - the transaction name
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
export function useCommandParametersSchemasQuery({ config: customConfig = {}, options } = {}) {
  const config = {
    url: `${API_URL}/commands/parameters/schemas`,
    method: 'get',
    event: 'get.commands.parameters.schemas',
    ...customConfig,
    params: { ...customConfig.params },
  };
  return useCustomQuery({
    keys: [GET_COMMAND_PARAMETERS_SCHEMAS_QUERY],
    config,
    options,
  });
}
