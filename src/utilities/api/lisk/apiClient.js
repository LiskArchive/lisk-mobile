/* eslint-disable no-undef */
import config from '../../../../lsk.config';

class LiskAPIClient {
  constructor(url) {
    this._url = url;
  }

  async getAccount(address) {
    const resp = await fetch(`${this._url}/v2/accounts?address=${address}`, config.requestOptions);
    if (!resp.ok && resp.status === 404) {
      return {
        address,
        balance: 0,
        nonce: 0,
        initialized: true,
      };
    }
    if (!resp.ok) {
      throw new Error('Failed to request account from server.');
    }
    const { data } = await resp.json();

    return data;
  }
}

export const apiClient = new LiskAPIClient(
  config.isTestnet ? config.testnetURL : config.serviceURL
);

export default apiClient;
