import config from '../../../../btc.config';

/**
 * Normalizes transaction data retrieved from Blockchain.info API
 * @param {Object} data
 * @param {String} data.address Base address to use for formatting transactions
 * @param {Array} data.list Transaction list
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
