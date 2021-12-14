import config from '../../../../lsk.config';

class LiskAPIClient {
  constructor(url) {
    this._url = url;
  }

  // eslint-disable-next-line max-statements
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
    if (data.length === 0) {
      return {
        address,
        balance: 0,
        nonce: 0,
        initialized: true
      };
    }
    const lockedBalance = data[0].dpos.unlocking?.reduce?.((a, b) => a + Number(b.amount), 0) ?? 0;
    return {
      ...data[0].summary,
      initialized: true,
      nonce: data[0].sequence.nonce,
      lockedBalance,
      unlocking: data[0].dpos.unlocking,
      sentVotes: data[0].dpos.sentVotes
    };
  }

  async getNetworkInfo() {
    const resp = await fetch(`${this._url}/v2/network/status`, config.requestOptions);
    if (!resp.ok) {
      throw new Error('Failed to request account from server.');
    }
    const { data } = await resp.json();
    return {
      height: data.height,
      blockTime: data.blockTime
    };
  }

  async getTransaction(id) {
    const resp = await fetch(
      `${this._url}/v2/transactions?transactionId=${id}`,
      config.requestOptions
    );
    if (!resp.ok && resp.status === 404) {
      return [];
    }
    if (!resp.ok) {
      throw new Error('Failed to request transactions from server.');
    }
    const { data } = await resp.json();
    return data;
  }

  async getTransactions(address, limit = 10, offset = 0) {
    const resp = await fetch(
      `${this._url}/v2/transactions?address=${address}&limit=${limit}&offset=${offset}&includePending=false&sort=timestamp:desc`,
      config.requestOptions
    );
    if (!resp.ok && resp.status === 404) {
      return [];
    }
    if (!resp.ok) {
      throw new Error('Failed to request transactions from server.');
    }
    const { data } = await resp.json();
    return data;
  }

  async getFees() {
    const resp = await fetch(`${this._url}/v2/fees`, config.requestOptions);
    if (!resp.ok) {
      throw new Error('Failed to request fees from server.');
    }
    const { data } = await resp.json();
    return data;
  }

  async sendTransaction(tx) {
    const resp = await fetch(`${this._url}/v2/transactions`, {
      ...config.requestOptions,
      method: 'POST',
      body: JSON.stringify(tx)
    });
    if (!resp.ok) {
      throw new Error('Failed to send transactions to server.');
    }
    const { transactionId, message } = await resp.json();
    return { id: transactionId, message };
  }
}

export const apiClient = new LiskAPIClient(
  config.isTestnet ? config.testnetURL : config.serviceURL
);

export default apiClient;
