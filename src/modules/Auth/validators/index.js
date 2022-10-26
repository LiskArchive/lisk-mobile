export const passwordValidationRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/g
);

/**
 *
 * @param {string} str
 * @returns boolean
 */
export const passwordValidator = (str = '') => passwordValidationRegex.test(str);
