import { tokenMap } from 'constants/tokens'
import deepLinkMapper from './deepLink'

describe('Deep Link Handler', () => {
  it('returns null if given url is falsy', () => {
    expect(deepLinkMapper('')).toBeNull()
  })

  it('returns null if given url path is not mapped', () => {
    expect(deepLinkMapper('lisk://test')).toBeNull()
  })

  it('handles urls with /transactions/send path', () => {
    const url = 'lisk://main/transactions/send?recipient=1L&amount=1&reference=test'
    const expectedResult = {
      name: 'Send',
      params: {
        activeToken: tokenMap.LSK.key,
        query: {
          address: '1L',
          amount: '1',
          reference: 'test',
        },
      },
    }

    expect(deepLinkMapper(url)).toEqual(expectedResult)
  })

  it('handles urls starting with wallet', () => {
    const url = 'lisk://wallet?recipient=1L&amount=1&reference=test'
    const expectedResult = {
      name: 'Send',
      params: {
        activeToken: tokenMap.LSK.key,
        query: {
          address: '1L',
          amount: '1',
          reference: 'test',
        },
      },
    }

    expect(deepLinkMapper(url)).toEqual(expectedResult)
  })

  it('handles urls for request page', () => {
    const url = 'lisk://request'
    const expectedResult = {
      name: 'Request',
    }

    expect(deepLinkMapper(url)).toEqual(expectedResult)
  })

  it('handles urls with transactions path', () => {
    const url = 'lisk://transactions?id=1'
    const expectedResult = {
      name: 'TransactionDetails',
      params: {
        transactionId: '1',
      },
    }

    expect(deepLinkMapper(url)).toEqual(expectedResult)
  })
})
