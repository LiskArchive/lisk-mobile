// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { mockGetTransactionsQuery, mockGetTransactionQuery, mockTransactions } from '../__fixtures__';

export const getTransactionsMockHandler = rest.get(
  `*/api/${API_VERSION}/transactions`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: mockTransactions.slice(offset, offset + limit),
      meta: {
        ...mockGetTransactionsQuery.meta,
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(20), ctx.json(response));
  },
);

export const getTransactionMockHandler = rest.get(
  `*/api/${API_VERSION}/transactions`,
  async (_, res, ctx) => {
    const response = mockGetTransactionQuery;

    return res(ctx.delay(20), ctx.json(response));
  },
);
