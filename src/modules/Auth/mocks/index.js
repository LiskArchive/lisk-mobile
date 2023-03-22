// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { API_VERSION } from 'utilities/api/constants';
import { mockAuth } from '../__fixtures__';

export const getAuthMockHandler = rest.get(`*/api/${API_VERSION}/auth`, async (req, res, ctx) => {
  const address = req.url.searchParams.get('address');

  const response = { data: mockAuth, meta: { address } };

  return res(ctx.delay(20), ctx.json(response));
});
