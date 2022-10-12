import i18next from 'i18next';

/**
 * Since react-navigation doesn't support i18n
 * I've created this dummy function to help i18n scanner
 * understand about these titles.
 * We can remove this as soon as react-navigation supports i18n or
 * we change the router to another lib with i18n support.
 *
 * @param {String} str
 * @returns {String} same as the input string
 */
const t = (str) => i18next.t(str);

export const PRIORITY_NAMES_MAP = {
  low: t('sendToken.tokenSelect.lowPriorityLabel'),
  medium: t('sendToken.tokenSelect.mediumPriorityLabel'),
  high: t('sendToken.tokenSelect.highPriorityLabel'),
};
