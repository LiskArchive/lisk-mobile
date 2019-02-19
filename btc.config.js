import bitcoin from 'bitcoinjs-lib';

const istestNet = process.env.network === 'testnet';
export default {
  url: istestNet ? 'https://testnet.blockchain.info' : 'https://blockchain.info',
  network: istestNet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
  requestOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};
