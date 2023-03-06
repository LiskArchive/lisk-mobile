import { validateAddress } from './validators';

describe('Address validator', () => {
  it('returns -1 if no address is passed', () => {
    expect(validateAddress('')).toBe(-1);
  });

  it('returns 0 for valid lsk address', () => {
    expect(validateAddress('lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw')).toBe(0);
  });

  it('returns 1 for in-valid  lsk address', () => {
    expect(validateAddress('13746538517771550559')).toBe(1);
  });
});
