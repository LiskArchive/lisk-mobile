/* eslint-disable no-undef */
import * as Lisk from '@liskhq/lisk-client';
import i18next from 'i18next';

import { findMaxBigInt } from 'utilities/helpers';
import { TRANSACTION_VERIFY_RESULT } from './constants';

export const getCommandParamsSchema = (module, command, schema = []) => {
  const moduleCommand = module.concat(':', command);

  const commandSchema = schema.find((meta) => meta.moduleCommand === moduleCommand);

  if (!commandSchema?.schema) {
    throw new Error(`Module: ${module} and Command: ${command} is not registered.`);
  }

  return commandSchema.schema;
};

export const decodeBaseTransaction = (encodedTransaction, baseTransactionSchema) =>
  Lisk.codec.codec.decode(baseTransactionSchema, encodedTransaction);

export const decodeTransaction = (encodedTransaction, paramsSchema) => {
  const transaction = decodeBaseTransaction(encodedTransaction);
  const params = paramsSchema ? Lisk.codec.codec.decode(paramsSchema, transaction.params) : {};
  const id = Lisk.cryptography.utils.hash(encodedTransaction);
  return {
    ...transaction,
    params,
    id,
  };
};

export const encodeTransaction = (transaction, paramsSchema, baseTransactionSchema) => {
  let encodedParams;

  if (!Buffer.isBuffer(transaction.params)) {
    encodedParams = paramsSchema
      ? Lisk.codec.codec.encode(paramsSchema, transaction.params)
      : Buffer.alloc(0);
  } else {
    encodedParams = transaction.params;
  }

  const decodedTransaction = Lisk.codec.codec.encode(baseTransactionSchema, {
    ...transaction,
    params: encodedParams,
  });

  return decodedTransaction;
};

export const fromTransactionJSON = (transaction, paramsSchema, baseTransactionSchema) => {
  const tx = Lisk.codec.codec.fromJSON(baseTransactionSchema, {
    ...transaction,
    params: '',
  });

  let params;

  if (typeof transaction.params === 'string') {
    params = paramsSchema
      ? Lisk.codec.codec.decode(paramsSchema, Buffer.from(transaction.params, 'hex'))
      : {};
  } else {
    params = paramsSchema ? Lisk.codec.codec.fromJSON(paramsSchema, transaction.params) : {};
  }

  return {
    ...tx,
    id: transaction.id ? Buffer.from(transaction.id, 'hex') : Buffer.alloc(0),
    params,
  };
};

export const toTransactionJSON = (transaction, paramsSchema, baseTransactionSchema) => {
  if (Buffer.isBuffer(transaction.params)) {
    return {
      ...Lisk.codec.codec.toJSON(baseTransactionSchema, transaction),
      params: paramsSchema ? Lisk.codec.codec.decodeJSON(paramsSchema, transaction.params) : {},
      id: transaction.id.toString('hex'),
    };
  }
  return {
    ...Lisk.codec.codec.toJSON(baseTransactionSchema, {
      ...transaction,
      params: Buffer.alloc(0),
    }),
    params: paramsSchema ? Lisk.codec.codec.toJSON(paramsSchema, transaction.params) : {},
    id: transaction.id && transaction.id.toString('hex'),
  };
};

/**
 * Computes the valid nonce to use for a transaction given an account on-chain nonce (auth nonce)
 * and the account transactions in mem pool.
 * @param {string} authNonce - Account on-chain nonce.
 * @param {Array<Transaction>} transactionPool - Account transactions in mem pool.
 * @returns {string} The calculated max nonce.
 */
export function computeNonce(authNonce, transactionPool) {
  if (transactionPool.length === 0) {
    return authNonce;
  }

  const transactionNonces = transactionPool.map((transaction) => BigInt(transaction.nonce));

  const poolMaxNonce = findMaxBigInt(transactionNonces).toString();

  return poolMaxNonce;
}

/**
 * Interprets a transaction dry-run error result. Generates an Error instance with descriptive
 * message if transaction verification failed or is invalid.
 * @param {Object} responseData - Dry-run transaction response.
 * @returns {Error} Error with message based on data.result value.
 * @TODO - Calculate properly the error message and integrate it with UI.
 * See https://github.com/LiskHQ/lisk-mobile/issues/1578 for details.
 */
export function getDryRunTransactionError(responseData) {
  const isError = responseData.result === TRANSACTION_VERIFY_RESULT.INVALID;

  if (!isError) {
    return null;
  }

  let message = i18next.t('transactions.errors.dryRunErrorMainMessage');

  const responseErrorMessage = responseData.errorMessage;

  if (responseErrorMessage && responseData.result) {
    message += ` ${i18next.t('transactions.errors.dryRunErrorReasonMessage', {
      message: responseErrorMessage,
    })}`;
  }

  return new Error(message);
}
