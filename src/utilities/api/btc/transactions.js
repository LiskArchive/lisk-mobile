import bitcoin from 'bitcoinjs-lib';
import config from '../../../../btc.config';
import { extractAddress, getDerivedPathFromSeed } from './account';
import { getDynamicFees } from './service';
import { merge } from '../../helpers';

/**
 * Normalizes transaction data retrieved from Blockchain.info API
 * @param {Object} data
 * @param {String} data.address Base address to use for formatting transactions
 * @param {Array} data.list Transaction list retrieved from API
 * @param {Number} data.blockHeight Latest block height for calculating confirmation count
 */
const normalizeTransactionsResponse = ({
  address,
  list,
  blockHeight,
}) => list.map((tx) => {
  const data = {
    id: tx.hash,
    timestamp: Number(tx.time),
    confirmations: blockHeight > 0 ? (blockHeight - tx.block_height) + 1 : tx.block_height,
    type: 0,
    data: '',
  };

  const totalInput = tx.inputs.reduce((total, t) => total + t.prev_out.value, 0);
  const totalOutput = tx.out.reduce((total, t) => total + t.value, 0);
  data.fee = totalInput - totalOutput;

  const ownedInput = tx.inputs.find(i => i.prev_out.addr === address);

  if (ownedInput) {
    data.senderAddress = address;
    data.recipientAddress = tx.out[0].addr;
    data.amount = tx.out[0].value;
  } else {
    const output = tx.out.find(out => out.addr === address);
    data.senderAddress = tx.inputs[0].prev_out.addr;
    data.recipientAddress = address;
    data.amount = output.value;
  }

  return data;
});

/**
 * Retrieves latest block from the Blockchain.info API and returns the height.
 * @returns {Promise<Number>}
 */
export const getLatestBlockHeight = () => new Promise(async (resolve) => {
  try {
    const response = await fetch(`${config.url}/latestblock`);
    const json = await response.json();

    if (response.ok) {
      resolve(json.height);
    } else {
      resolve(0);
    }
  } catch (error) {
    resolve(0);
  }
});

export const get = ({
  id,
  address,
  limit = 50,
  offset = 0,
}) => new Promise(async (resolve, reject) => {
  try {
    let response;

    if (id) {
      response = await fetch(`${config.url}/rawtx/${id}`, config.requestOptions);
    } else {
      response = await fetch(`${config.url}/rawaddr/${address}?limit=${limit}&offset=${offset}`, config.requestOptions);
    }

    const json = await response.json();

    if (response.ok) {
      const blockHeight = await exports.getLatestBlockHeight();

      resolve({
        data: normalizeTransactionsResponse({
          address,
          list: id ? [json] : json.txs,
          blockHeight,
        }),
        meta: {
          count: id ? 1 : json.n_tx,
        },
      });
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

/**
 * Normalizes transaction data retrieved from Blockchain.info API
 * @param {Object} data
 * @param {Number} data.inputCount
 * @param {Number} data.outputCount
 * @param {Number} data.minerFeeByte selected minerFee option, in satoshis/byte.
 */
const calculateTransactionFee = ({
  inputCount,
  outputCount,
  minerFeePerByte,
}) => ((inputCount * 180) + (outputCount * 34) + 10 + inputCount) * minerFeePerByte;

/**
 * Retrieves unspent tx outputs of a BTC address from Blockchain.info API
 * @param {String} address
 * @returns {Promise<Array>}
 */
export const getUnspentOuts = address => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${config.url}/unspent?active=${address}`);
    const json = await response.json();

    if (response.ok) {
      resolve(json.unspent_outputs);
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

export const create = ({
  passphrase,
  recipientAddress,
  amount,
}) => new Promise(async (resolve, reject) => {
  try {
    const senderAddress = extractAddress(passphrase);
    const unspentTxOuts = await exports.getUnspentOuts(senderAddress);
    const minerFees = await getDynamicFees();
    const minerFeePerByte = minerFees.medium;

    // Estimate total cost (currently estimates max cost by assuming the worst case)
    const estimatedMinerFee = calculateTransactionFee({
      inputCount: unspentTxOuts.length,
      outputCount: 2,
      minerFeePerByte,
    });

    const estimatedTotal = amount + estimatedMinerFee;

    // Check if balance is sufficient
    const unspentTxOutsTotal = unspentTxOuts.reduce((total, tx) => {
      total += tx.value;
      return total;
    }, 0);

    if (unspentTxOutsTotal < estimatedTotal) {
      reject(new Error('Insufficient (estimated) balance'));
    }

    // Find unspent txOuts to spend for this tx
    let txOutIndex = 0;
    let sumOfConsumedOutputs = 0;
    const txOutsToConsume = [];

    while (sumOfConsumedOutputs <= estimatedTotal) {
      const tx = unspentTxOuts[txOutIndex];
      txOutsToConsume.push(tx);
      txOutIndex += 1;
      sumOfConsumedOutputs += tx.value;
    }

    const txb = new bitcoin.TransactionBuilder(config.network);

    // Add inputs from unspent txOuts
    // eslint-disable-next-line
    for (const tx of txOutsToConsume) {
      txb.addInput(tx.tx_hash_big_endian, tx.tx_output_n);
    }

    // Output to Recipient
    txb.addOutput(recipientAddress, amount);

    // Calculate final fee
    const calculatedMinerFee = calculateTransactionFee({
      inputCount: txOutsToConsume.length,
      outputCount: 2,
      minerFeePerByte,
    });

    // Calculate total
    const calculatedTotal = amount + calculatedMinerFee;

    // Output to Change Address
    const change = sumOfConsumedOutputs - calculatedTotal;
    txb.addOutput(senderAddress, change);

    // Sign inputs
    const derivedPath = getDerivedPathFromSeed(passphrase);
    const keyPair = bitcoin.ECPair.fromWIF(derivedPath.toWIF(), config.network);
    for (let i = 0; i < txOutsToConsume.length; i++) {
      txb.sign(i, keyPair);
    }

    resolve(txb.build().toHex());
  } catch (error) {
    reject(error);
  }
});

export const broadcast = transaction => new Promise(async (resolve, reject) => {
  try {
    const body = new FormData();
    body.append('tx', transaction);

    const response = await fetch(`${config.url}/pushtx`, merge(config.requestOptions, {
      method: 'POST',
      body,
    }));

    if (response.ok) {
      resolve(response.body);
    } else {
      reject(response.body);
    }
  } catch (error) {
    reject(error);
  }
});
