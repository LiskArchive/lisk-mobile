// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { mockApplications, mockApplicationsMeta } from '../__fixtures__';

export const getApplicationsMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);

    const response = {
      data: mockApplications.slice(offset, offset + limit),
      meta: {
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(20), ctx.json(response));
  }
);

export const getApplicationsMetaMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps/meta`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);
    const isDefault = req.url.searchParams.get('isDefault')
      ? Boolean(req.url.searchParams.get('isDefault'))
      : null;

    const data = mockApplicationsMeta.slice(offset, offset + limit).reduce((acc, appMeta) => {
      switch (isDefault) {
        case null:
          return [...acc, appMeta];

        case false:
          if (appMeta.isDefault === false) {
            return [...acc, appMeta];
          }
          return acc;

        case true:
          if (appMeta.isDefault === true) {
            return [...acc, appMeta];
          }
          return acc;

        default:
          return [...acc, appMeta];
      }
    }, []);

    const response = {
      data,
      meta: {
        count: limit,
        offset,
      },
    };

    return res(ctx.delay(20), ctx.json(response));
  }
);
