// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import {
  mockGetAccountTokensQuery,
  mockGetTransactionsQuery,
  mockGetTransactionQuery,
  mockTransactions,
  mockTokensMeta,
} from '../__fixtures__';

export const getAccountTokensMockHandler = rest.get(
  `*/api/${API_VERSION}/token/balances`,
  async (_, res, ctx) => {
    const response = mockGetAccountTokensQuery;

    return res(ctx.delay(20), ctx.json(response));
  }
);

export const getTransactionsMockHandler = rest.get(
  `*/api/${API_VERSION}/transactions`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);
    const transactionID = req.url.searchParams.get('transactionID');

    const response = transactionID
      ? mockGetTransactionQuery
      : {
          data: mockTransactions.slice(offset, offset + limit),
          meta: {
            ...mockGetTransactionsQuery.meta,
            count: limit,
            offset,
          },
        };

    return res(ctx.delay(20), ctx.json(response));
  }
);

export const getTokensMetaMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps/meta/tokens`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: mockTokensMeta.slice(offset, offset + limit),
      meta: {
        total: mockTokensMeta.length,
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(20), ctx.json(response));
  }
);
