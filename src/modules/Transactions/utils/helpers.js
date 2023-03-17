import * as Lisk from '@liskhq/lisk-client';

import { BASE_TRANSACTION_SCHEMA, TRANSACTION_EXECUTION_RESULT } from './constants';

export const getCommandParamsSchema = (module, command, schema) => {
  const moduleCommand = module.concat(':', command);

  const commandSchema = schema.find((meta) => meta.moduleCommand === moduleCommand);

  if (!(commandSchema && commandSchema.schema)) {
    throw new Error(`Module: ${module} and Command: ${command} is not registered.`);
  }

  return commandSchema.schema;
};

export const decodeBaseTransaction = (encodedTransaction) =>
  Lisk.codec.codec.decode(BASE_TRANSACTION_SCHEMA, encodedTransaction);

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

export const encodeTransaction = (transaction, paramsSchema) => {
  let encodedParams;

  if (!Buffer.isBuffer(transaction.params)) {
    encodedParams = paramsSchema
      ? Lisk.codec.codec.encode(paramsSchema, transaction.params)
      : Buffer.alloc(0);
  } else {
    encodedParams = transaction.params;
  }

  const decodedTransaction = Lisk.codec.codec.encode(BASE_TRANSACTION_SCHEMA, {
    ...transaction,
    params: encodedParams,
  });

  return decodedTransaction;
};

export const fromTransactionJSON = (transaction, paramsSchema) => {
  const tx = Lisk.codec.codec.fromJSON(BASE_TRANSACTION_SCHEMA, {
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

export const toTransactionJSON = (transaction, paramsSchema) => {
  if (Buffer.isBuffer(transaction.params)) {
    return {
      ...Lisk.codec.codec.toJSON(BASE_TRANSACTION_SCHEMA, transaction),
      params: paramsSchema ? Lisk.codec.codec.decodeJSON(paramsSchema, transaction.params) : {},
      id: transaction.id.toString('hex'),
    };
  }
  return {
    ...Lisk.codec.codec.toJSON(BASE_TRANSACTION_SCHEMA, {
      ...transaction,
      params: Buffer.alloc(0),
    }),
    params: paramsSchema ? Lisk.codec.codec.toJSON(paramsSchema, transaction.params) : {},
    id: transaction.id && transaction.id.toString('hex'),
  };
};

/**
 * Returns the maximum nonce value of an array of transactions.
 *
 * @param {Array.<Transaction>} transactions - An array of transaction objects with `nonce` properties.
 * @returns {number} The maximum nonce value in the array, or 0 if the array is empty.
 */
export function getMaxTransactionsNonce(transactions) {
  if (transactions.length === 0) {
    return 0;
  }

  const nonces = transactions.map((transaction) => parseFloat(transaction.nonce));

  return Math.max(nonces);
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
  let error = null;

  const errorMessage = responseData.errorMessage;

  switch (responseData.result) {
    case TRANSACTION_EXECUTION_RESULT.invalid:
      error = new Error(`Transaction is invalid. Reason: ${errorMessage}`);

      break;

    case TRANSACTION_EXECUTION_RESULT.fail:
      error = new Error(`Transaction failed. Reason: ${errorMessage}`);
      break;

    default:
      break;
  }

  return error;
}
