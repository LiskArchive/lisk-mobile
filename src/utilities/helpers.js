import { StyleSheet } from 'react-native';
import { themes } from '../constants/styleGuide';

/**
 * Helps to create themed stylesheet for components.
 * @param {Object} styles - style declerations for the component.
 * @param {String} theme - theme string.
 *
 * @returns {Object} - created stylesheet.
 */
export const createThemedStyles = (theme, styles, noTheme = false) => {
  if (!styles.common) {
    styles.common = {};
  }

  if (!styles[theme]) {
    styles[theme] = {};
  }

  return {
    ...StyleSheet.create(styles.common),
    theme: noTheme ? StyleSheet.create(styles[themes.light]) : StyleSheet.create(styles[theme]),
  };
};

/**
 * Helps to keep the code clean while trying to
 * merge multiple objects immutably.
 * There is no type checking, so it throws if passed
 * params in other types
 *
 * @param {Object} - Each items passed must be object
 * @returns {Object} - A new object, result of merging
 *  the object properties from right to left
 */
export const merge = (...rest) => Object.assign({}, ...rest);

/**
 * Shortens a given string by replacing a certain number of
 * characters with ellipsis (...).
 * if only one parameter passed, it'll add ellipsis to the end:
 * shortAddress("A very long stringified term") === "A very lon..."
 *
 * if rightPadd is passed it'll keep some trailing characters:
 * shortAddress("12345678901111L, 3) === "1234567890...11L"
 *
 * No change will be applied for already short strings
 *
 * @param {String} str - Any string to get shortened
 * @param {Number?} leftPadd - how many characters should be shown before ellipsis. default 10
 * @param {Number?} rightPadd - how many characters should be shown after ellipsis. default 0
 *
 * @returns {String} - the shortened string
 */
export const stringShortener = (str, leftPadd = 10, rightPadd = 0) => {
  if (str.length > 15) {
    return `${str.substr(0, leftPadd)}...${rightPadd ? str.substr(-1 * rightPadd) : ''}`;
  }
  return str;
};

/**
 * Removes undefined keys from an object.
 * @param {Object} obj - Source object
 * @returns {Object} - Simplified object
 */
export const removeUndefinedKeys = obj => Object.keys(obj).reduce((acc, key) => {
  const item = obj[key];

  if (typeof item !== 'undefined') {
    acc[key] = item;
  }

  return acc;
}, {});
