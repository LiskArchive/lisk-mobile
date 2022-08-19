// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY_MOCK, TRANSACTIONS_MOCK } from './index';

export const getTransactionsMockHandler = rest.get(
  `*/api/${API_VERSION}/transactions`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: TRANSACTIONS_MOCK.slice(offset, offset + limit),
      meta: {
        ...GET_TRANSACTIONS_QUERY_MOCK.meta,
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(500), ctx.json(response));
  },
);
