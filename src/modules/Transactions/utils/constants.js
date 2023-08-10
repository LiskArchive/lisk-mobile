import { t } from 'locales/helpers';

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
