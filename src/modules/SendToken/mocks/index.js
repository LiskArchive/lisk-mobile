// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'

import { API_VERSION } from 'utilities/api/constants'
import { mockSendTokenResponse } from '../__fixtures__'

export const sendTokenMockHandler = rest.post(
  `*/api/${API_VERSION}/transactions`,
  (_, res, ctx) => {
    return res(ctx.delay(20), ctx.status(201), ctx.json(mockSendTokenResponse))
  }
)
