/**
 *
 * @param {string} str
 * @returns boolean
 */
export const passwordValidator = (str = '') =>
  new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/g).test(str);
