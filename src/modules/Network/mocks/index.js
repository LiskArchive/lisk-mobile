// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'

import { API_VERSION } from 'utilities/api/constants'
import { mockNetworkStatus } from '../__fixtures__'

export const getNetworkStatusMockHandler = rest.get(
  `*/api/${API_VERSION}/network/status`,
  async (_, res, ctx) => res(ctx.delay(20), ctx.json(mockNetworkStatus))
)
