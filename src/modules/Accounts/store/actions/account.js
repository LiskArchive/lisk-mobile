/* eslint-disable max-lines */
import actionTypes from '../../actionTypes';

/**
 * Trigger this action to log out of the account
 * while already logged in
 *
 * @returns {Object} - Action object
 */
export const setCurrentAccount = (encryptedAccount) => ({
  type: actionTypes.setCurrentAccount,
  encryptedAccount,
});

export const addAccount = (encryptedAccount) => ({
  type: actionTypes.addAccount,
  encryptedAccount,
});

export const deleteAccount = (address) => ({
  type: actionTypes.deleteAccount,
  address,
});

export const setAccountSummary = accountSummary => ({
  type: actionTypes.setAccountSummary,
  accountSummary
});

export const resetAccountSummary = summary => ({
  type: actionTypes.resetAccountSummary,
  summary
});