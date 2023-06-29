import { toSecureRecoveryPhraseString } from './recoveryPhrase';

describe('toSecureRecoveryPhraseString', () => {
  it('should return a secured recovery phrase', () => {
    const input = 'attract squeeze option inflict dynamic';
    const expectedOutput = '****** ****** ****** ****** ******';
    expect(toSecureRecoveryPhraseString(input)).toBe(expectedOutput);
  });

  it('should handle an empty string', () => {
    expect(toSecureRecoveryPhraseString('')).toBe('');
  });

  it('should handle a single word', () => {
    expect(toSecureRecoveryPhraseString('singleword')).toBe('******');
  });
});
