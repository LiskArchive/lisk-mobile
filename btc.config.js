import bitcoin from 'bitcoinjs-lib';
import URLs from './src/constants/URLs';

const isTestnet = process.env.network === 'testnet';

export default {
  isTestnet,
  url: isTestnet ? URLs.BTCTestnet : URLs.BTCMainnet,
  minerFeesURL: URLs.BTCMinerFees,
  network: isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
  derivationPath: isTestnet ? "m/44'/1'/0'/0/0" : "m/44'/0'/0'/0/0",
  transactionExplorerURL: `https://www.blockchain.com/${
    isTestnet ? 'btctest' : 'btc'
  }/tx`,
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
