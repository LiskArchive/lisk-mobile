// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'

import { LIMIT, API_VERSION } from 'utilities/api/constants'
import { mockApplications, mockApplicationsMeta } from '../__fixtures__'

export const getApplicationsMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT))
    const offset = Number(req.url.searchParams.get('offset') || 0)

    const response = {
      data: mockApplications.slice(offset, offset + limit),
      meta: {
        count: limit,
        offset,
      },
    }

    return res(ctx.delay(20), ctx.json(response))
  }
)

export const getApplicationsMetaMockHandler = rest.get(
  `*/api/${API_VERSION}/blockchain/apps/meta`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit' || LIMIT))
    const offset = Number(req.url.searchParams.get('offset') || 0)

    const response = {
      data: mockApplicationsMeta.slice(offset, offset + limit),
      meta: {
        count: limit,
        offset,
      },
    }

    return res(ctx.delay(20), ctx.json(response))
  }
)
