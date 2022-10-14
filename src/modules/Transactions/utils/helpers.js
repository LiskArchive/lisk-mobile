import * as Lisk from '@liskhq/lisk-client';
import i18next from 'i18next';

import { themes } from 'constants/styleGuide';
import txUnknownLight from 'assets/images/txDetail/tx-unknown-light.png';
import txUnknownDark from 'assets/images/txDetail/tx-unknown-dark.png';

import { BASE_TRANSACTION_SCHEMA, MODULE_COMMAND_MAP, TRANSACTIONS } from './constants';

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

export const getTxConstant = ({ moduleAssetId }) => {
  const result = TRANSACTIONS[moduleAssetId] ?? {};
  return {
    ...result,
    title: result?.title ?? i18next.t('Transaction'),
    image: result?.image
      ? result?.image
      : (theme) => (theme === themes.light ? txUnknownLight : txUnknownDark),
  };
};

export const isTransfer = ({ moduleAssetId }) => moduleAssetId === MODULE_COMMAND_MAP.transfer;
