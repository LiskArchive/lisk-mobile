import Lisk from '@liskhq/lisk-client';
import LiskAPIClient from './apiClient';

export const get = ({
  id,
  senderAddress,
  recipientAddress,
  senderOrRecipientAddress,
  limit,
  offset,
}) => {
  const data = {
    id,
    senderId: senderAddress,
    recipientId: recipientAddress,
    senderOrRecipientId: senderOrRecipientAddress,
    sort: 'timestamp:desc',
    limit,
    offset,
  };

  return LiskAPIClient.transactions.get(data);
};

export const create = ({
  passphrase,
  recipientAddress,
  amount,
  secondPassphrase,
}) => new Promise((resolve) => {
  const transaction = Lisk.transaction.transfer({
    passphrase,
    secondPassphrase,
    recipientId: recipientAddress,
    amount,
  });

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
