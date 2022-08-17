// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { API_VERSION } from '../../../utilities/api/constants';

import { BROADCASTED_TRANSACTION_MOCK } from './index';

export const sendTokenMockHandler = rest.post(
  `http://104.248.241.229:9901/api/${API_VERSION}/transactions`,
  (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(BROADCASTED_TRANSACTION_MOCK),
    );
  }
);

export const sendTokenMockHandlers = [
  sendTokenMockHandler
];
