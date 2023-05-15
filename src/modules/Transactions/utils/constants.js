import { t } from 'locales/helpers';

// TODO: Use from service endpoint/elements.
// (details on https://github.com/LiskHQ/lisk-mobile/issues/1612).
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

export const PRIORITY_NAMES_MAP = {
  low: t('sendToken.tokenSelect.lowPriorityLabel'),
  medium: t('sendToken.tokenSelect.mediumPriorityLabel'),
  high: t('sendToken.tokenSelect.highPriorityLabel'),
};

export const TRANSACTION_VERIFY_RESULT = {
  invalid: -1,
  pending: 0,
  ok: 1,
};

export const TRANSACTION_EVENTS = {
  newTransactions: 'new.transactions',
};
