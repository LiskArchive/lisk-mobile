import bitcoin from 'bitcoinjs-lib';

const isTestnet = process.env.network === 'testnet';

export default {
  isTestnet,
  url: isTestnet ? 'https://ams1-bitcoin-test-001.ed148.net' : 'https://ams1-bitcoin-001.ed148.net',
  minerFeesURL: 'https://bitcoinfees.earn.com/api/v1/fees/recommended',
  network: isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
  derivationPath: isTestnet ? "m/44'/1'/0'/0/0" : "m/44'/0'/0'/0/0",
  transactionExplorerURL: `https://www.blockchain.com/${isTestnet ? 'btctest' : 'btc'}/tx`,
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
