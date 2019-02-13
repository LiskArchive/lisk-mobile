import bitcoin from 'bitcoinjs-lib';

export default {
  url: 'https://blockchain.info',
  network: process.env.network === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
