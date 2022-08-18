import { themes } from 'constants/styleGuide';
import {
  createThemedStyles,
  merge,
  stringShortener,
  removeUndefinedKeys,
  isEmpty,
  setColorOpacity,
  isNumeric
} from './helpers';

describe('helpers', () => {
  describe('createThemedStyles', () => {
    const styles = {
      common: {
        wrapper: {
          flex: 1,
        },
      },

      [themes.light]: {
        wrapper: {
          backgroundColor: 'white',
        },
      },

      [themes.dark]: {
        common: {
          backgroundColor: 'black',
        },
      },
    };

    it('creates themed styles as expected', () => {
      expect(createThemedStyles(themes.light, styles)).toEqual({
        wrapper: {
          flex: 1,
        },
        theme: {
          wrapper: {
            backgroundColor: 'white',
          },
        },
      });
    });

    it('fills common key with empty object if not present', () => {
      const stylesWithoutCommonKey = { ...styles };
      delete stylesWithoutCommonKey.common;

      expect(createThemedStyles(themes.light, stylesWithoutCommonKey)).toEqual({
        theme: {
          wrapper: {
            backgroundColor: 'white',
          },
        },
      });
    });

    it('fills requested theme key with empty object if not present', () => {
      const stylesWithoutThemeKey = { ...styles };
      delete stylesWithoutThemeKey[themes.light];
      expect(createThemedStyles(themes.light, stylesWithoutThemeKey)).toEqual({
        wrapper: {
          flex: 1,
        },
        theme: {},
      });
    });

    it('uses light theme by default if noTheme argument is passed', () => {
      expect(createThemedStyles(themes.dark, styles, true)).toEqual({
        wrapper: {
          flex: 1,
        },
        theme: {
          wrapper: {
            backgroundColor: 'white',
          },
        },
      });
    });
  });

  describe('merge', () => {
    it('merges the given objects correctly', () => {
      const obj1 = {
        a: '1',
        b: '2',
      };

      const obj2 = {
        a: '0',
        c: '3',
      };

      const result = merge(obj1, obj2);
      const expectedResult = {
        a: '0',
        b: '2',
        c: '3',
      };

      expect(result.a).toBe(expectedResult.a);
      expect(result.b).toBe(expectedResult.b);
      expect(result.c).toBe(expectedResult.c);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('stringShortener', () => {
    it('does not modify input if length is less than 15', () => {
      expect(stringShortener('test')).toBe('test');
    });

    it('generates correct output with default params', () => {
      expect(stringShortener('test_test_test_test')).toBe('test_test_...');
    });

    it('generates correct output with given params', () => {
      expect(stringShortener('test_test_test_test', 10, 5)).toBe(
        'test_test_..._test'
      );
    });

    it('should return undefined/null when str is undefined or null', () => {
      expect(stringShortener(null)).toBeNull();
      expect(stringShortener()).toBeUndefined();
    });
  });

  describe('removeUndefinedKeys', () => {
    it('removes undefined keys from the source object', () => {
      const source = { a: undefined, b: 'b', c: 0 };
      expect(removeUndefinedKeys(source)).toEqual({ b: 'b', c: 0 });
    });
  });

  describe('isEmpty', () => {
    it('works properly with arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('works properly with objects', () => {
      expect(isEmpty({ test: 'test' })).toBe(false);
    });
  });

  describe('setColorOpacity', () => {
    it('should return color if length is not 4 or 7', () => {
      expect(setColorOpacity('#2345', 0.15)).toBe('#2345');
      expect(setColorOpacity('#2345678', 0.15)).toBe('#2345678');
    });

    it('Should turn #000 into rgba(0, 0, 0, 0.15) with alpha 0.15', () => {
      expect(setColorOpacity('#000', 0.15)).toBe('rgba(0, 0, 0, 0.15)');
    });

    it('Should turn #ff00ff into rgba(255, 0, 255, 0.15) with alpha 0.15', () => {
      expect(setColorOpacity('#ff00ff', 0.15)).toBe('rgba(255, 0, 255, 0.15)');
    });

    it('Should turn #0000ff into rgba(0, 0, 255, 1) with no alpha passed', () => {
      expect(setColorOpacity('#0000ff')).toBe('rgba(0, 0, 255, 1)');
    });
  });

  describe('isNumeric', () => {
    it('should return false for invalid decimal numbers', () => {
      expect(isNumeric('12..4')).toBe(false);
    });

    it('should return true for valid decimal numbers', () => {
      expect(isNumeric('12.4')).toBe(true);
    });

    it('should return true for integers', () => {
      expect(isNumeric('123456789')).toBe(true);
    });
  });
});
