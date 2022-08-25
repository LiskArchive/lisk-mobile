// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { mockCustomInfiniteQueryData, mockCustomInfiniteQuery, mockCustomQuery } from '../__fixtures__';

export const customInfiniteQueryMockHandler = rest.get(
  `*/api/${API_VERSION}/mock/custom-infinite-query`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: mockCustomInfiniteQueryData.slice(offset, offset + limit),
      meta: {
        ...mockCustomInfiniteQuery.meta,
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(500), ctx.json(response));
  },
);

export const customQueryMockHandler = rest.get(
  `*/api/${API_VERSION}/mock/custom-query`,
  async (req, res, ctx) => {
    const response = mockCustomQuery;

    return res(ctx.delay(500), ctx.json(response));
  },
);

export const webSocketHandler = rest.get(
  '*/socket.io/',
  (_, res, ctx) => res(
    ctx.status(200),
    ctx.set('Connection', 'keep-alive'),
    ctx.set('Content-Type', 'text/event-stream'),
    ctx.body('data: SUCCESS\n\n'),
  ),
);
