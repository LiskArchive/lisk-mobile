import { isColorBright } from './colors.utils';

describe('colors utils', () => {
  describe('isColorBright', () => {
    it('should return true for bright colors', () => {
      expect(isColorBright('#ffffff')).toBe(true);
    });

    it('should return true for slightly bright colors', () => {
      expect(isColorBright('#d4ff00')).toBe(true);
    });

    it('should return false for dark colors', () => {
      expect(isColorBright('#000000')).toBe(false);
    });
  });
});
