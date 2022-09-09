import { validateAddress } from './validators'

describe('Address validator', () => {
  it('returns -1 if no address is passed', () => {
    expect(validateAddress('tokenType', '')).toBe(-1)
  })

  it('returns 0 for valid lsk address', () => {
    expect(validateAddress('LSK', 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw')).toBe(0)
  })

  it('returns 1 for in-valid  lsk address', () => {
    expect(validateAddress('LSK', '13746538517771550559')).toBe(1)
  })

  it('returns 0 for valid btc address', () => {
    expect(validateAddress('BTC', '1PA2gjCNsjsNEMSfAk6QhY8SEEs1GsPRk6')).toBe(0)
  })

  it('returns 1 for in-valid btc address', () => {
    expect(validateAddress('BTC', '13746538517771550559')).toBe(1)
  })
})
