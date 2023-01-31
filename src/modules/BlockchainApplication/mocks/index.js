// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { LIMIT, API_VERSION } from 'utilities/api/constants';
import { mockApplications, mockApplicationsMeta } from '../__fixtures__';

export const getApplicationsMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT));
    const offset = Number(req.url.searchParams.get('offset') || 0);
    const chainIDs =
      req.url.searchParams.get('chainID') && req.url.searchParams.get('chainID').split(',');

    let data = mockApplications.slice(offset, offset + limit);

    if (chainIDs) {
      data = data.filter((app) => chainIDs.includes(app.chainID));
    }

    const response = {
      data,
      meta: {
        count: data.length,
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
    const chainIDs =
      req.url.searchParams.get('chainID') && req.url.searchParams.get('chainID').split(',');

    let data = mockApplicationsMeta.slice(offset, offset + limit).reduce((acc, appMeta) => {
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

    if (chainIDs) {
      data = data.filter((app) => chainIDs.includes(app.chainID));
    }

    const response = {
      data,
      meta: {
        count: data.length,
        offset,
      },
    };

    return res(ctx.delay(20), ctx.json(response));
  }
);
