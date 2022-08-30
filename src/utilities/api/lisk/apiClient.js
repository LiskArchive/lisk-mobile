/* eslint-disable no-undef */
import config from '../../../../lsk.config';
import errorHandler from '../errorHandler';

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
        initialized: true
      };
    }
    if (!resp.ok) {
      throw new Error('Failed to request account from server.');
    }
    const { data } = await resp.json();

    return data;
  }

  async getNetworkInfo() {
    const resp = await fetch(`${this._url}/v3/network/status`, config.requestOptions);
    if (!resp.ok) {
      throw new Error('Failed to request network info from server.');
    }
    const { data } = await resp.json();
    return {
      height: data.height,
      blockTime: data.blockTime
    };
  }

  async sendTransaction(tx) {
    const resp = await fetch(`${this._url}/v3/transactions`, {
      ...config.requestOptions,
      method: 'POST',
      body: JSON.stringify(tx)
    });
    if (!resp.ok) {
      const response = await resp.json();
      throw new Error(errorHandler(response));
    }
    const { transactionId, message } = await resp.json();
    return { id: transactionId, message };
  }

  async getLatestBlock() {
    const options = {
      ...config.requestOptions,
      params: {
        limit: 1
      },
    };
    const resp = await fetch(`${this._url}/v3/blocks`, options);
    if (!resp.ok) {
      throw new Error('Failed to retrieve the latest block from server.');
    }
    const { data } = await resp.json();
    return data[0];
  }
}

export const apiClient = new LiskAPIClient(
  config.isTestnet ? config.testnetURL : config.serviceURL
);

export default apiClient;
