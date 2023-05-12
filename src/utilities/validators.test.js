import { validateAddress, isTransactionAmountValid } from './validators';

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

describe('isTransactionAmountValid', () => {
  it('returns true for valid transaction amounts', () => {
    expect(isTransactionAmountValid('123')).toBe(true);
    expect(isTransactionAmountValid('123.456')).toBe(true);
    expect(isTransactionAmountValid('0')).toBe(true);
  });

  it('returns false for transaction amounts with invalid format', () => {
    expect(isTransactionAmountValid('123.')).toBe(false);
    expect(isTransactionAmountValid('.456')).toBe(false);
    expect(isTransactionAmountValid('123.456.789')).toBe(false);
    expect(isTransactionAmountValid('abc')).toBe(false);
  });

  it('returns false for non-positive transaction amounts', () => {
    expect(isTransactionAmountValid('-123')).toBe(false);
  });
});
