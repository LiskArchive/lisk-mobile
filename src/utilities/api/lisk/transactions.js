import * as Lisk from '@liskhq/lisk-client';
import { apiClient } from './apiClient';
import {
  isTransfer,
  moduleAssetNameIdMap,
  transferAssetSchema
} from '../../../constants/transactions';
import config from '../../../../lsk.config';

const getAmount = (tx) => {
  if (moduleAssetNameIdMap.transfer === tx.moduleAssetId) {
    return tx.asset.amount;
  }
  if (moduleAssetNameIdMap.unlockToken === tx.moduleAssetId) {
    // eslint-disable-next-line no-undef
    return tx.asset?.unlockObjects?.reduce?.((a, b) => a + BigInt(b.amount), BigInt(0)).toString();
  }
  return 0;
};

/**
 * Normalizes transaction data retrieved from Lisk Core API
 * https://lisk.com/documentation/lisk-core/reference/api.html#/Transactions/get_transactions__id_
 */
const normalizeTransactionsResponse = (list, block) =>
  list.map((tx) => ({
    id: tx.id,
    senderAddress: tx.sender.address,
    recipientAddress: isTransfer({ moduleAssetId: tx.moduleAssetId })
      ? tx.asset.recipient.address
      : tx.sender.address,
    amount: getAmount(tx),
    fee: tx.fee,
    timestamp: tx.block?.timestamp,
    confirmations: block ? block.height - tx.block?.height + 1 : 0,
    nonce: tx.nonce,
    type: tx.moduleAssetName,
    moduleAssetId: tx.moduleAssetId,
    moduleAssetName: tx.moduleAssetName,
    data: tx.moduleAssetName === 'token:transfer' ? tx.asset.data : '',
    votes: tx.moduleAssetName === 'dpos:voteDelegate' ? tx.asset.votes : [],
    delegate: tx.moduleAssetName === 'dpos:registerDelegate' ? tx.asset.username : '',
    blockId: tx.block?.id,
    blockHeight: tx.block?.height,
  }));

export const get = async ({
  id, address, limit, offset
}) => {
  const block = await apiClient.getLatestBlock();
  if (id !== undefined) {
    const txs = await apiClient.getTransaction(id);
    return { data: normalizeTransactionsResponse(txs, block), meta: {} };
  }
  const txs = await apiClient.getTransactions(address, limit, offset);
  return {
    data: normalizeTransactionsResponse(txs, block),
    meta: {
      limit,
      offset,
      count: txs.length
    }
  };
};

export const create = async ({
  nonce, passphrase, recipientAddress, amount, fee, reference
}) => {
  const {
    publicKey: senderPublicKey
  } = Lisk.cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  const recipient = Lisk.cryptography.getAddressFromLisk32Address(recipientAddress);
  const tx = {
    moduleID: 2,
    assetID: 0,
    senderPublicKey,
    // eslint-disable-next-line no-undef
    fee: BigInt(fee),
    // eslint-disable-next-line no-undef
    nonce: BigInt(nonce),
    asset: {
      // eslint-disable-next-line no-undef
      amount: BigInt(amount),
      data: reference || '',
      recipientAddress: recipient
    },
    signatures: []
  };

  const networkIdentifier = Buffer.from(
    config.isTestnet ? config.testnetNetworkID : config.networkID,
    'hex'
  );
  return Lisk.transactions.signTransaction(transferAssetSchema, tx, networkIdentifier, passphrase);
};

export const broadcast = async (transaction) => {
  const txBytes = Lisk.transactions.getBytes(transferAssetSchema, transaction).toString('hex');
  return apiClient.sendTransaction({ transaction: txBytes });
};
