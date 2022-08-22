// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { CUSTOM_INFINITE_QUERY_DATA, CUSTOM_INFINITE_QUERY_MOCK } from './index';

export const customInfiniteQueryMockHandler = rest.get(
  `*/api/${API_VERSION}/custom-infinite-query`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: CUSTOM_INFINITE_QUERY_DATA.slice(offset, offset + limit),
      meta: {
        ...CUSTOM_INFINITE_QUERY_MOCK.meta,
        count: limit,
        offset,
      },
    };

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
