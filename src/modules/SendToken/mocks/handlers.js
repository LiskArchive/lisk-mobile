// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { API_VERSION } from '../../../utilities/api/constants';

import { BROADCASTED_TRANSACTION_MOCK } from './index';

export const broadcastTransactionMockHandler = rest.post(
  `*/api/${API_VERSION}/transactions`,
  (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(BROADCASTED_TRANSACTION_MOCK),
    );
  }
);

export const sendTokenMockHandlers = [
  broadcastTransactionMockHandler
];
