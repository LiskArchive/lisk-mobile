// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { BROADCASTED_TRANSACTION_MOCK } from '.';

export const broadcastTransactionMockHandler = rest.post('http://104.248.241.229:9901/api/v3/transactions', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(BROADCASTED_TRANSACTION_MOCK),
  );
});

export const sendTokenMockHandlers = [
  broadcastTransactionMockHandler
];
