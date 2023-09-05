import { t } from 'locales/helpers';

export const PRIORITY_NAMES_MAP = {
  low: t('sendToken.tokenSelect.lowPriorityLabel'),
  medium: t('sendToken.tokenSelect.mediumPriorityLabel'),
  high: t('sendToken.tokenSelect.highPriorityLabel'),
};

export const TRANSACTION_VERIFY_RESULT = {
  INVALID: -1,
  PENDING: 0,
  OK: 1,
};

export const TRANSACTION_EVENTS = {
  newTransactions: 'new.transactions',
};

export const TOKEN_TRANSFER_VALIDATION_SCHEMA = {
  $id: '/lisk/token-transfer',
  title: 'Token transfer params',
  type: 'object',
  required: ['recipient', 'amount', 'token', 'recipientChain'],
  properties: {
    token: {
      dataType: 'string',
      minLength: 16,
      maxLength: 16,
    },
    amount: {
      dataType: 'string',
      format: 'double',
    },
    recipient: {
      dataType: 'string',
      minLength: 41,
      maxLength: 41,
    },
    recipientChain: {
      dataType: 'string',
      minLength: 8,
      maxLength: 8,
    },
    reference: {
      dataType: 'string',
      minLength: 0,
      maxLength: 20,
    },
  },
};

export const BASE_TRANSACTION_SCHEMA = {
  $id: '/lisk/baseTransaction',
  type: 'object',
  required: ['module', 'command', 'nonce', 'fee', 'senderPublicKey', 'params'],
  properties: {
    module: {
      dataType: 'string',
      fieldNumber: 1,
    },
    command: {
      dataType: 'string',
      fieldNumber: 2,
    },
    nonce: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    fee: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    senderPublicKey: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    params: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    signatures: {
      type: 'array',
      items: {
        dataType: 'bytes',
      },
      fieldNumber: 7,
    },
  },
};

export const ERROR_EVENTS = {
  insufficientFee: t('transactions.errors.insufficientFee'),
  invalidSignature: t('transactions.errors.invalidSignature'),
};

export const EVENT_DATA_RESULT = {
  1: t('transactions.errors.insufficientBalance'),
  2: t('transactions.errors.messageTooLong'),
  3: t('transactions.errors.invalidTokenID'),
  4: t('transactions.errors.unsupportedToken'),
  5: t('transactions.errors.insufficientLockedAmount'),
  11: t('transactions.errors.tokenUnavailable'),
  12: t('transactions.errors.tokenNotNative'),
  13: t('transactions.errors.insufficientEscrowBalance'),
  14: t('transactions.errors.invalidReceivingChain'),
};
