import actionTypes from 'constants/actions'

/**
 * Returns a pure action object to store the Id of Api call which
 * required a loader spinner displayed
 *
 * @param {String} data - A random string ID
 *
 * @returns {Object} - Pure action function
 */
export const loadingStarted = (data) => ({
  data,
  type: actionTypes.loadingStarted,
})

/**
 * Returns a pure action object to remove the Id of Api call which
 * required a loader spinner displayed, and now it's completed and
 * required the spinner to hide
 *
 * @param {String} data - The with which we defined the Api call before
 *
 * @returns {Object} - Pure action function
 */
export const loadingFinished = (data) => ({
  data,
  type: actionTypes.loadingFinished,
})
