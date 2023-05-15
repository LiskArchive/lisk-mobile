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
