import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';
import { removeUndefinedKeys } from '../../helpers';

export const get = ({
  id,
  address,
  limit,
  offset,
}) => {
  const data = removeUndefinedKeys({
    id,
    senderIdOrRecipientId: address,
    sort: 'timestamp:desc',
    limit,
    offset,
  });

  return LiskAPIClient.transactions.get(data);
};

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
