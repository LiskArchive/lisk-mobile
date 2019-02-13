import { tokenTypes, getMappedFunction } from './index';

describe('api/index', () => {
  describe('getMappedFunction utility', () => {
    it('maps existing functions correctly', () => {
      const result = getMappedFunction(tokenTypes.BTC, 'account.getSummary');
      expect(result).toBeDefined();
    });

    it('throws error for non-existing functions', () => {
      expect(() => {
        getMappedFunction(tokenTypes.BTC, 'account.unMappableFunction');
      }).toThrow();
    });

    it('throws error for invalid path', () => {
      expect(() => {
        getMappedFunction(tokenTypes.BTC, 'invalidPath');
      }).toThrow();
    });
  });
});
