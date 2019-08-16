import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';
import { removeUndefinedKeys } from '../../helpers';

/**
 * Converts Lisk timestamp to absolute timestamp
 * @param {Number} value Timestamp retrieved from Lisk Core API
 * @returns {Number}
 */
const normalizeTimestamp = value => ((Date.UTC(2016, 4, 24, 17, 0, 0, 0) / 1000) + value) * 1000;

/**
 * Normalizes transaction data retrieved from Lisk Core API
 * https://lisk.io/documentation/lisk-core/user-guide/api#/Transactions/getTransactions
 */
const normalizeTransactionsResponse = list => list.map(tx => ({
  id: tx.id,
  senderAddress: tx.senderId,
  recipientAddress: tx.recipientId,
  amount: tx.amount,
  fee: tx.fee,
  timestamp: normalizeTimestamp(tx.timestamp),
  confirmations: tx.confirmations,
  type: tx.type,
  data: tx.asset.data || '',
  votes: tx.asset.votes || [],
}));

export const get = ({
  id,
  address,
  limit,
  offset,
}) => new Promise(async (resolve, reject) => {
  const parameters = removeUndefinedKeys({
    id,
    senderIdOrRecipientId: address,
    sort: 'timestamp:desc',
    limit,
    offset,
  });

  try {
    const { data, meta } = await LiskAPIClient.transactions.get(parameters);
    resolve({
      data: normalizeTransactionsResponse(data),
      meta,
    });
  } catch (error) {
    reject(error);
  }
});

export const create = ({
  passphrase,
  recipientAddress,
  amount,
  secondPassphrase,
  reference,
}) => new Promise((resolve) => {
  const transaction = Lisk.transaction.transfer(removeUndefinedKeys({
    passphrase,
    secondPassphrase,
    recipientId: recipientAddress,
    amount,
    data: reference,
  }));

  resolve(transaction);
});

export const broadcast = transaction => new Promise((resolve, reject) => {
  setTimeout(async () => {
    try {
      await LiskAPIClient.transactions.broadcast(transaction);
      resolve(transaction);
    } catch (error) {
      reject(error);
    }
  }, 1001);
});
