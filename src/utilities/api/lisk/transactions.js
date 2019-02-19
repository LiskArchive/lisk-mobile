import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';
import { removeUndefinedKeys } from '../../helpers';

const normalizeTransactionsResponse = list => list.map(tx => ({
  id: tx.id,
  senderAddress: tx.senderId,
  recipientAddress: tx.recipientId,
  amount: tx.amount,
  fee: tx.fee,
  timestamp: tx.timestamp,
  confirmations: tx.confirmations,
  extra: {
    type: tx.type,
    data: tx.asset.data || '',
  },
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
  data,
}) => new Promise((resolve) => {
  const transaction = Lisk.transaction.transfer(removeUndefinedKeys({
    passphrase,
    secondPassphrase,
    recipientId: recipientAddress,
    amount,
    data,
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
