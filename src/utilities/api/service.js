import getMappedFunction from './functionMapper';

/**
 * Contains conversion rate for a token.
 * @typedef {Object} PriceTicker
 * @property {String} EUR
 * @property {String} USD
 */

/**
 * Retrieves price ticker for given token from the related service API.
 * @param {String} tokenType
 * @returns {Promise<PriceTicker>}
 */
const getPriceTicker = tokenType => getMappedFunction(tokenType, 'service.getPriceTicker')();

export default {
  getPriceTicker,
};
