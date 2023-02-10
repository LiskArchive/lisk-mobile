// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { API_VERSION } from 'utilities/api/constants';
import { mockMarketPrices } from '../__fixtures__';

export const getMarketPricesMockHandler = rest.get(
  `*/api/${API_VERSION}/market/prices`,
  async (req, res, ctx) => {
    return res(ctx.delay(20), ctx.json(mockMarketPrices));
  }
);
