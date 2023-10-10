/* eslint-disable no-undef */
import { themes } from 'constants/styleGuide';
import {
  createThemedStyles,
  merge,
  stringShortener,
  removeUndefinedObjectKeys,
  fromPathToObject,
  setColorOpacity,
  joinArraysWithoutDuplicates,
  findMaxBigInt,
  spliceArray,
  countDecimals,
  addUniqueStringToArray,
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
      expect(stringShortener('test_test_test_test', 10, 5)).toBe('test_test_..._test');
    });

    it('should return undefined/null when str is undefined or null', () => {
      expect(stringShortener(null)).toBeNull();
      expect(stringShortener()).toBeUndefined();
    });
  });

  describe('removeUndefinedObjectKeys', () => {
    it('removes undefined keys from the source object', () => {
      const obj = { a: undefined, b: 'b', c: 0 };

      expect(removeUndefinedObjectKeys(obj)).toEqual({ b: 'b', c: 0 });
    });
  });

  describe('fromPathToObject', () => {
    it('updates properly an object nested value and returns the object updated', () => {
      const obj = { a: 'a', b: { b1: 'b1', b2: 'b2' }, c: 'c' };

      expect(fromPathToObject('b.b1', '_b1', obj)).toEqual({
        a: 'a',
        b: { b1: '_b1', b2: 'b2' },
        c: 'c',
      });
    });

    it('returns the object also updated if the specified path does not exist', () => {
      const obj = { a: 'a', b: { b1: 'b1', b2: 'b2' }, c: 'c' };

      expect(fromPathToObject('b.b3', 'b3', obj)).toEqual({
        a: 'a',
        b: { b1: 'b1', b2: 'b2', b3: 'b3' },
        c: 'c',
      });
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

  describe('joinArraysWithoutDuplicates()', () => {
    it('should return an array of unique objects from both input arrays', () => {
      const arr1 = [
        { id: 1, name: 'object1' },
        { id: 2, name: 'object2' },
      ];
      const arr2 = [
        { id: 2, name: 'object2' },
        { id: 3, name: 'object3' },
      ];
      const result = joinArraysWithoutDuplicates(arr1, arr2, 'id');
      expect(result).toEqual([
        { id: 1, name: 'object1' },
        { id: 2, name: 'object2' },
        { id: 3, name: 'object3' },
      ]);
    });
    it('should throw an error if either arr1 or arr2 is not an array', () => {
      const arr1 = [
        { id: 1, name: 'object1' },
        { id: 2, name: 'object2' },
      ];
      const arr2 = 'not an array';
      expect(() => joinArraysWithoutDuplicates(arr1, arr2, 'id')).toThrowError(TypeError);
    });
    it('should throw an error if filterProp is not a string', () => {
      const arr1 = [
        { id: 1, name: 'object1' },
        { id: 2, name: 'object2' },
      ];
      const arr2 = [
        { id: 2, name: 'object2' },
        { id: 3, name: 'object3' },
      ];
      expect(() => joinArraysWithoutDuplicates(arr1, arr2, 2)).toThrowError(TypeError);
    });
  });

  describe('findMaxBigInt', () => {
    it('should return the max value from an array of BigInt numbers', () => {
      const arr = [BigInt(123), BigInt(456), BigInt(789)];
      expect(findMaxBigInt(arr)).toBe(789n);
    });

    it('should throw an error if the array is empty', () => {
      const arr = [];
      expect(() => findMaxBigInt(arr)).toThrow('Values array is empty');
    });

    it('should return the only value in an array with a single element', () => {
      const arr = [BigInt(123)];
      expect(findMaxBigInt(arr)).toBe(123n);
    });
  });

  describe('spliceArray', () => {
    it('should return the original array if no arguments are provided', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 0, 0);
      expect(result).toEqual(arr);
    });

    it('should add items without deleting any', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 2, 0, 6, 7);
      expect(result).toEqual([1, 2, 6, 7, 3, 4, 5]);
    });

    it('should delete items without adding any', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 2, 2);
      expect(result).toEqual([1, 2, 5]);
    });

    it('should delete and add items at the same time', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 2, 2, 6, 7);
      expect(result).toEqual([1, 2, 6, 7, 5]);
    });

    it('should handle start greater than array length', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 10, 2, 6, 7);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should handle deleteCount greater than remaining elements from start', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = spliceArray(arr, 3, 5);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('countDecimals', () => {
    it('should return the correct number of decimals for a given number', () => {
      expect(countDecimals(0)).toEqual(0);
      expect(countDecimals(1)).toEqual(0);
      expect(countDecimals(1.0)).toEqual(0);
      expect(countDecimals(0.1)).toEqual(1);
      expect(countDecimals(1.23)).toEqual(2);
      expect(countDecimals(0.12345)).toEqual(5);
    });

    it('should return the correct number of decimals for a given string', () => {
      expect(countDecimals('0')).toEqual(0);
      expect(countDecimals('1')).toEqual(0);
      expect(countDecimals('1.0')).toEqual(1);
      expect(countDecimals('0.1')).toEqual(1);
      expect(countDecimals('1.23')).toEqual(2);
      expect(countDecimals('0.12345')).toEqual(5);
    });
  });

  describe('addUniqueStringToArray', () => {
    it('adds a unique string to an array', () => {
      const array = ['apple', 'banana', 'orange'];
      const string = 'grape';
      const expected = ['apple', 'banana', 'orange', 'grape'];

      expect(addUniqueStringToArray(array, string)).toEqual(expected);
    });

    it('does not add a duplicate string to an array', () => {
      const array = ['apple', 'banana', 'orange'];
      const string = 'banana';
      const expected = ['apple', 'banana', 'orange'];

      expect(addUniqueStringToArray(array, string)).toEqual(expected);
    });

    it('does not modify the original array', () => {
      const array = ['apple', 'banana', 'orange'];
      const string = 'grape';
      const originalArray = [...array];

      addUniqueStringToArray(array, string);
      expect(array).toEqual(originalArray);
    });
  });
});
